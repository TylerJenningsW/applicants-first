'use client'
import React, { useEffect, useState } from 'react'
import fetchJobs from './actions'
import { useRouter } from 'next/navigation'
import { getBrowserClient } from '../../../../utils/supabase/supaBaseBrowserClient'

import Link from 'next/link'
import '../../styles/RecruiterDashboard.css'
interface Applicant {
  applicantid: number
  fullname: string
  emailaddress: string
  alternateemailaddress: string | null
  streetaddress: string | null
  city: string | null
  state: string | null
  zipcode: string | null
  linkedinurl: string | null
  uscitizen: boolean | null
  parsedResume: any
  resumeUrl: string | null
}

interface JobApplication {
  id: number
  applicant: Applicant
  status: {
    status: string
  } | null
}

interface Job {
  JobID: number
  UserID: string
  JobTitle: string
  JobDescription: string
  PostedDate: string | Date
  Slug: string | null
  OrganizationID: number | null
  organization: {
    OrganizationName: string
  } | null
  jobApplications: JobApplication[]
}

export default function RecruiterDashBoard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = getBrowserClient()
  const updateApplicationStatus = async (
    applicantId: number,
    jobId: number,
    status: string
  ) => {
    try {
      const response = await fetch('/api/update-application-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicantId, jobId, status }),
      })

      if (response.ok) {
        // Refresh the jobs list to show the updated status
        await getJobs()
      } else {
        const data = await response.json()
        alert(data.error || 'Failed to update application status')
      }
    } catch (error) {
      console.error('Error updating application status:', error)
      alert('An error occurred while updating the application status')
    }
  }
  const getJobs = async () => {
    setRefreshing(true)
    const jobList = await fetchJobs()
    setJobs(jobList)
    setLoading(false)
    setRefreshing(false)
  }

  useEffect(() => {
    const initializePage = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        await getJobs()
      } else {
        // Handle case where user is not logged in
        router.push('/login')
      }
    }

    initializePage()
    getJobs()
  }, [])

  const deleteJob = async (jobId: number, jobSlug: string | null) => {
    if (!user) {
      alert('You must be logged in to delete a job')
      return
    }

    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`/api/jobs/${jobSlug}`, {
          method: 'DELETE',
        })

        if (response.ok) {
          setJobs(jobs.filter((job) => job.JobID !== jobId))
        } else {
          const data = await response.json()
          alert(data.error || 'Failed to delete job')
        }
      } catch (error) {
        console.error('Error deleting job:', error)
        alert('An error occurred while deleting the job')
      }
    }
  }

  const handleRefresh = () => {
    getJobs()
  }

  if (loading) {
    return <div>Loading jobs...</div>
  }

  return (
    <>
      <div className="container mx-auto p-0 min-w-full max-w-fullm-0">
        <div className="flex justify-between items-center mb-4 p-4">
          <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
          <div>
            <button
              onClick={handleRefresh}
              className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
              disabled={refreshing}
            >
              {refreshing ? 'Refreshing...' : 'Refresh Jobs'}
            </button>
            <Link
              href="/post-job"
              className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600"
            >
              Post a New Job
            </Link>
          </div>
        </div>
        {jobs.length === 0 ? (
          <p className='p-4'>You haven&apos;t posted any jobs yet.</p>
        ) : (
          <div className="p-0 m-0 w-full border rounded">
            {jobs.map((job) => (
              <div key={job.JobID} className="p-4 mb-4 mx-auto">
                <h2 className="text-xl font-bold">{job.JobTitle}</h2>
                <p>{job.JobDescription}</p>
                <p>
                  Posted on: {new Date(job.PostedDate).toLocaleDateString()}
                </p>
                <p>
                  Company:{' '}
                  {job.organization?.OrganizationName || 'Unknown Company'}
                </p>
                <h3 className="font-bold mt-2">Applicants:</h3>
                {job.jobApplications && job.jobApplications.length > 0 ? (
                  <ul>
                    {job.jobApplications.map((app) => (
                      <li key={app.id} className="mb-2 flex items-center">
                        <span>
                          {app.applicant.fullname} ({app.applicant.emailaddress}
                          )
                        </span>
                        <Link
                          href={`/recruiter-dashboard/applications/${app.applicant.applicantid}`}
                          className="ml-2 text-blue-500 hover:underline"
                        >
                          View Full Application
                        </Link>
                        <span className="ml-2">
                          Status: {app.status?.status || 'Pending'}
                        </span>
                        <button
                          onClick={() =>
                            updateApplicationStatus(
                              app.applicant.applicantid,
                              job.JobID,
                              'approved'
                            )
                          }
                          className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() =>
                            updateApplicationStatus(
                              app.applicant.applicantid,
                              job.JobID,
                              'denied'
                            )
                          }
                          className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
                        >
                          Deny
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No applicants yet</p>
                )}
                <div className="mt-4">
                  <Link
                    href={`recruiter-dashboard/jobs/${job.Slug}`}
                    className="text-blue-500 hover:underline mr-4"
                  >
                    View Job
                  </Link>
                  {user &&
                    (user.id === job.UserID ||
                      user.role === 'Administrator') && (
                      <button
                        onClick={() => deleteJob(job.JobID, job.Slug)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                      >
                        Delete Job
                      </button>
                    )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
