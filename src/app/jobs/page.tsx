'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../../../utils/prisma/prismaClient';
import fetchJobs from './actions';

const JobsPage = () => {
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
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
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
export default JobsPage;