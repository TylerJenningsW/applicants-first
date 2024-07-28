'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

export interface Applicant {
  applicantid: number
  fullname: string
  emailaddress: string
  alternateemailaddress?: string
  streetaddress?: string
  city?: string
  state?: string
  zipcode?: string
  country?: string
  linkedinurl?: string
  uscitizen?: boolean
  educationlevel?: string
  specialty?: string
  dateaddedtodb: string
}

export default function ApplicationPage() {
  const params = useParams()
  const [applicant, setApplicant] = useState<Applicant | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApplicant = async () => {
      if (!params.id) {
        setError('Applicant ID is missing')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/applications/${params.id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch applicant data')
        }
        const data = await response.json()
        setApplicant(data)
      } catch (error) {
        console.error('Error fetching applicant:', error)
        setError('Failed to load applicant data')
      } finally {
        setLoading(false)
      }
    }

    fetchApplicant()
  }, [params.id])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!applicant) {
    return <div>Application not found</div>
  }
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Application Details</h1>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Personal Information</h2>
          <p>
            <strong>Name:</strong> {applicant.fullname}
          </p>
          <p>
            <strong>Email:</strong> {applicant.emailaddress}
          </p>
          {applicant.alternateemailaddress && (
            <p>
              <strong>Alternate Email:</strong>{' '}
              {applicant.alternateemailaddress}
            </p>
          )}
          {applicant.streetaddress && (
            <p>
              <strong>Address:</strong> {applicant.streetaddress}
            </p>
          )}
          {applicant.city && (
            <p>
              <strong>City:</strong> {applicant.city}
            </p>
          )}
          {applicant.state && (
            <p>
              <strong>State:</strong> {applicant.state}
            </p>
          )}
          {applicant.zipcode && (
            <p>
              <strong>Zip Code:</strong> {applicant.zipcode}
            </p>
          )}
          {applicant.country && (
            <p>
              <strong>Country:</strong> {applicant.country}
            </p>
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Professional Information</h2>
          {applicant.linkedinurl && (
            <p>
              <strong>LinkedIn:</strong>{' '}
              <a
                href={applicant.linkedinurl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {applicant.linkedinurl}
              </a>
            </p>
          )}
          {applicant.educationlevel && (
            <p>
              <strong>Education Level:</strong> {applicant.educationlevel}
            </p>
          )}
          {applicant.specialty && (
            <p>
              <strong>Specialty:</strong> {applicant.specialty}
            </p>
          )}
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Additional Information</h2>
          <p>
            <strong>US Citizen:</strong> {applicant.uscitizen ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>Application Date:</strong>{' '}
            {new Date(applicant.dateaddedtodb).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  )
}
