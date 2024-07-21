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
            <div key={job.id} className="border p-4 mb-4 rounded">
              <h2 className="text-xl font-bold">{job.job_title}</h2>
              <p>{job.job_description}</p>
              <p>{new Date(job.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
