'use client'

import React, { useEffect, useState } from 'react'
import '../../styles/ApplicantDashboard.css'


interface Job {
  JobID: number
  JobTitle: string
  organization: {
    OrganizationName: string
  }
  applicationStatuses?: {
    status: string
  }[]
}


const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'status-pending'
    case 'approved':
      return 'status-interview'
    case 'denied':
      return 'status-denied'
    default:
      return ''
  }
}

const ApplicantDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        const response = await fetch('/api/applicant/applied-jobs')
        if (!response.ok) {
          throw new Error('Failed to fetch applied jobs')
        }
        const data = await response.json()
        setJobs(data.jobs)
      } catch (error) {
        console.error('Error fetching applied jobs:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppliedJobs()
    console.log(jobs)
  }, [])
  return (
    <>
      <main className="main-content">
        <h2>Applicant Dashboard</h2>
        <p>
          Welcome to the Applicant Dashboard. Use the menu to navigate through
          the sections.
        </p>

        <div className="jobs-list">
          <h3 className="jobs-title">Jobs Applied For</h3>
          <div className="jobs-container">
          {loading ? (
              <p>Loading applied jobs...</p>
            ) : jobs.length > 0 ? (
              <ul>
                {jobs.map((job) => (
                  <li key={job.JobID} className="job-card">
                    <div className="job-info">
                      <h4>{job.JobTitle}</h4>
                      <p>{job.organization?.OrganizationName || 'Unknown Company'}</p>
                    </div>
                    <div
                      className={`job-status ${getStatusColor(
                        job.applicationStatuses?.[0]?.status || 'pending'
                      )}`}
                    >
                      {job.applicationStatuses?.[0]?.status || 'Pending'}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't applied to any jobs yet.</p>
            )}
          </div>
        </div>
      </main>
    </>
  )
}

export default ApplicantDashboard
