'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import RecruiterHeader from '@/app/components/RecruiterHeader'
import ApplicantHeader from '@/app/components/ApplicantHeader'

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
  const [isEditing, setIsEditing] = useState(false)
  const [editedJob, setEditedJob] = useState<Job | null>(null)
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const fetchJobAndUserRole = async () => {
      if (!slug) return

      try {
        const [jobResponse, userResponse] = await Promise.all([
          fetch(`/api/jobs/${slug}`),
          fetch('/api/user/role')
        ])

        if (!jobResponse.ok || !userResponse.ok) {
          throw new Error('Failed to fetch data')
        }

        const jobData = await jobResponse.json()
        const userData = await userResponse.json()

        setJob(jobData)
        setEditedJob(jobData)
        setUserRole(userData.role)
      } catch (error) {
        console.error('Error fetching data:', error)
        setError('Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchJobAndUserRole()
  }, [slug])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedJob(job)
  }

  const handleSave = async () => {
    if (!editedJob) return

    try {
      const response = await fetch(`/api/jobs/${slug}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedJob),
      })

      if (!response.ok) {
        throw new Error('Failed to update job')
      }

      const updatedJob = await response.json()
      setJob(updatedJob)
      setIsEditing(false)
    } catch (error) {
      console.error('Error updating job:', error)
      setError('Failed to update job')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!editedJob) return

    setEditedJob({
      ...editedJob,
      [e.target.name]: e.target.value,
    })
  }
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
        {isEditing ? (
          <form onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="JobTitle">
                Job Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="JobTitle"
                type="text"
                name="JobTitle"
                value={editedJob?.JobTitle}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="CompanyName">
                Company Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="CompanyName"
                type="text"
                name="CompanyName"
                value={editedJob?.CompanyName}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="JobAddressLocation">
                Location
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="JobAddressLocation"
                type="text"
                name="JobAddressLocation"
                value={editedJob?.JobAddressLocation}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="JobSalary">
                Salary
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="JobSalary"
                type="text"
                name="JobSalary"
                value={editedJob?.JobSalary}
                onChange={handleInputChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="JobDescription">
                Job Description
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="JobDescription"
                name="JobDescription"
                value={editedJob?.JobDescription}
                onChange={handleInputChange}
                rows={6}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ApplicationDeadline">
                Application Deadline
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="ApplicationDeadline"
                type="date"
                name="ApplicationDeadline"
                value={editedJob?.ApplicationDeadline.split('T')[0]}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save Changes
              </button>
              <button
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
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
            
              <button
                onClick={handleEdit}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 cursor-pointer mr-4"
              >
                Edit Job Post
              </button>
            
            <Link href={`/jobs/${slug}/apply`}>
              <span className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer">
                Apply Now
              </span>
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
