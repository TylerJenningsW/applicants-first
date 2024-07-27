"use client";
import React, { useEffect, useState } from 'react'
import fetchJobs from './actions'
import Link from 'next/link';

export default function RecruiterDashBoard() {
  const [jobs, setJobs] = useState<any[]>([])
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
        <Link href="/post-job" className="bg-blue-500 text-white px-4 py-2 rounded mb-4 inline-block">Post a New Job</Link>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div>
          {jobs.map((job) => (
            <div key={job.JobID} className="border p-4 mb-4 rounded">
              <h2 className="text-xl font-bold">{job.JobTitle}</h2>
              <p>{job.JobDescription}</p>
              <p>{new Date(job.PostedDate).toLocaleDateString()}</p>
              <p>{job.organization?.OrganizationName || "Unknown Company"}</p>
              <Link href={`/jobs/${job.Slug}`}> View Job</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
