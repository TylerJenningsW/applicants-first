'use client'
import React, { useEffect, useState } from 'react'
import fetchJobs from './actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getBrowserClient } from '../../../utils/supabase/supaBaseBrowserClient'

interface Applicant {
  applicant: {
    fullname: string
    emailaddress: string
  }
}

interface Job {
  JobID: number
  UserID: string
  JobTitle: string
  JobDescription: string
  PostedDate: string
  Slug: string
  organization: {
    OrganizationName: string
  } | null
  applicants: {
    applicantid: number
    fullname: string
    emailaddress: string
  }[]
}

export default function RecruiterDashBoard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [user, setUser] = useState<any>(null)
  const router = useRouter()
  const supabase = getBrowserClient()

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
  }, [])

  const deleteJob = async (jobId: number, jobSlug: string) => {
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
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
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
        <p>You haven&apos;t posted any jobs yet.</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div key={job.JobID} className="border p-4 mb-4 rounded">
              <h2 className="text-xl font-bold">{job.JobTitle}</h2>
              <p>{job.JobDescription}</p>
              <p>Posted on: {new Date(job.PostedDate).toLocaleDateString()}</p>
              <p>
                Company:{' '}
                {job.organization?.OrganizationName || 'Unknown Company'}
              </p>
              <h3 className="font-bold mt-2">Applicants:</h3>
              {job.applicants && job.applicants.length > 0 ? (
                <ul>
                  {job.applicants.map((app, index) => (
                    <li key={index} className="mb-2">
                      {app.fullname} ({app.emailaddress})
                      <Link
                        href={`/applications/${app.applicantid}`}
                        className="ml-2 text-blue-500 hover:underline"
                      >
                        View Full Application
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No applicants yet</p>
              )}
              <div className="mt-4">
                <Link
                  href={`/jobs/${job.Slug}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  View Job
                </Link>
                {user &&
                  (user.id === job.UserID || user.role === 'Administrator') && (
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
  )
}
