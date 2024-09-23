'use client'

import React, { useEffect, useState, useMemo } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table'
import '../../styles/ApplicantDashboard.css'
import Link from 'next/link'

interface Job {
  JobID: number
  JobTitle: string
  organization: {
    OrganizationName: string
  }
  applicationStatus?: string
}

interface JobApplication {
  JobID: number
  JobTitle: string
  organization: {
    OrganizationName: string
  }
  PostedDate: string
  applicationStatus: string
  appliedAt: string
  Slug?: string
}

const columnHelper = createColumnHelper<JobApplication>()

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
  const [jobs, setJobs] = useState<JobApplication[]>([])
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

  const columns = useMemo(
    () => [
      columnHelper.accessor('JobTitle', {
        header: 'Job Title',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor(
        (row) => row.organization?.OrganizationName || 'Unknown Company',
        {
          id: 'company',
          header: 'Company',
          cell: (info) => info.getValue(),
        }
      ),
      columnHelper.accessor('PostedDate', {
        header: 'Posted Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor('appliedAt', {
        header: 'Applied Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor('applicationStatus', {
        header: 'Status',
        cell: (info) => (
          <span className={`status-${info.getValue().toLowerCase()}`}>
            {info.getValue()}
          </span>
        ),
      }),
      columnHelper.accessor('Slug', {
        header: 'Actions',
        cell: (info) => (
          <Link
            href={`/jobs/${info.getValue()}`}
            className="applicant-dashboard__link"
          >
            View Job Details
          </Link>
        ),
      }),
    ],
    []
  )

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

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
              <div className="applicant-dashboard">
                <h2>My Job Applications</h2>
                <div className="overflow-x-auto">
                  <table className="applicant-dashboard__table w-full border-collapse bg-gray-50">
                    <thead>
                      {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                          {headerGroup.headers.map((header) => (
                            <th
                              key={header.id}
                              className="applicant-dashboard__table-header p-3 border border-gray-300 text-left bg-blue-500 text-white font-semibold"
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </th>
                          ))}
                        </tr>
                      ))}
                    </thead>
                    <tbody>
                      {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                          {row.getVisibleCells().map((cell) => (
                            <td
                              key={cell.id}
                              className="applicant-dashboard__table-cell p-3 border border-gray-300 text-left bg-white"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {jobs.length === 0 && (
                  <p>You haven't applied to any jobs yet.</p>
                )}
              </div>
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
