'use client'
import React, { useEffect, useState } from 'react'
import fetchJobs from './actions'
import Link from 'next/link'

interface Applicant {
  applicant: {
    fullname: string
    emailaddress: string
  }
}

interface Job {
  JobID: number
  JobTitle: string
  JobDescription: string
  PostedDate: string
  Slug: string
  organization: {
    OrganizationName: string
  } | null
  applicants: {
    fullname: string
    emailaddress: string
  }[]
}

export default function RecruiterDashBoard() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getJobs = async () => {
      const jobList = await fetchJobs()
      console.log(JSON.stringify(jobList))
      setJobs(jobList)
      setLoading(false)
    }
    getJobs()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Recruiter Dashboard</h1>
      <Link
        href="/post-job"
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Post a New Job
      </Link>
      {loading ? (
        <p>Loading jobs...</p>
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
                    <li key={index}>
                      {app.fullname} ({app.emailaddress})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No applicants yet</p>
              )}
              <Link
                href={`/jobs/${job.Slug}`}
                className="text-blue-500 hover:underline"
              >
                View Job
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
