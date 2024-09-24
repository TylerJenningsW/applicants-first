'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import RecruiterHeader from '@/app/components/RecruiterHeader'
import ApplicantHeader from '@/app/components/ApplicantHeader'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import ApplyPage from './apply/page'

interface Job {
  JobID: number
  JobTitle: string
  JobDescription: string
  JobAddressLocation: string
  PostedDate: string
  JobSalary: string
  ApplicationDeadline: string
  CompanyName: string
}

export default function Page() {
  const params = useParams()
  const { slug } = params
  const [job, setJob] = useState<Job | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  useEffect(() => {
    console.log(slug)

    const fetchJob = async () => {
      if (!slug) return

      console.log('Fetching job with slug:', slug)
      try {
        const response = await fetch(`/api/jobs/${slug}`)
        console.log('API response status:', response.status)

        if (!response.ok) {
          const errorText = await response.text()
          console.error('API error response:', errorText)
          throw new Error('Failed to fetch job')
        }

        const jobData = await response.json()
        console.log('Received job data:', jobData)
        setJob(jobData)
      } catch (error) {
        console.error('Error fetching job:', error)
        setError('Failed to load job details')
      } finally {
        setLoading(false)
      }
    }

    fetchJob()
  }, [slug])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!job) {
    return <div>Job not found</div>
  }

  return (
    <div className="w-full p-4 m-0">
      <h1 className="text-3xl font-bold mb-4">{job.JobTitle}</h1>
      <div className="bg-white shadow-md rounded-lg p-6 w-full">
        <p className="text-xl mb-2">{job.CompanyName}</p>
        <p className="text-gray-600 mb-2">{job.JobAddressLocation}</p>
        <p className="text-gray-600 mb-4">Salary: {job.JobSalary}</p>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold mb-2">Job Description</h2>
          <p className="whitespace-pre-wrap">{job.JobDescription}</p>
        </div>
        <div className="mb-4">
          <p className="text-sm text-gray-500">
            Posted on: {new Date(job.PostedDate).toLocaleDateString()}
          </p>
          <p className="text-sm text-gray-500">
            Application Deadline:{' '}
            {new Date(job.ApplicationDeadline).toLocaleDateString()}
          </p>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              {' '}
              <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                Apply Now
              </span>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Apply</DialogTitle>
                <DialogDescription>
                  <ApplyPage />
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}
