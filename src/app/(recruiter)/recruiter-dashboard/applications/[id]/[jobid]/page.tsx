'use client'

import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link';

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
  resumeUrl?: string
  parsedResume?: {
    custom: { descriptions: string[] }
    skills: {
      descriptions: string[]
      featuredSkills: { skill: string; rating: number }[]
    }
    profile: {
      url: string
      name: string
      email: string
      phone: string
      summary: string
      location: string
    }
    projects: {
      date: string
      project: string
      descriptions: string[]
    }[]
    educations: {
      gpa: string
      date: string
      degree: string
      school: string
      descriptions: string[]
    }[]
    workExperiences: {
      date: string
      company: string
      jobTitle: string
      descriptions: string[]
    }[]
  }
}


interface Job {
  JobID: number;
  JobTitle: string;
}



export default function ApplicationPage() {
 
  const params = useParams()
  const [applicant, setApplicant] = useState<Applicant | null>(null)
  const [loading, setLoading] = useState(true)
  const [job, setJob] = useState<Job | null>(null)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    console.log('Job ID from params:', params.id);
    const fetchApplicant = async () => {
      if (!params.id) {
        setError('Applicant ID is missing')
        setLoading(false)
        return
      }

      try {
        // Fetch applicant data
        const applicantResponse = await fetch(`/api/applications/${params.id}`)
        if (!applicantResponse.ok) {
          throw new Error('Failed to fetch applicant data')
        }
        const applicantData = await applicantResponse.json()
        setApplicant(applicantData)

        // Fetch job data
        const jobResponse = await fetch(`/api/jobs/${params.jobid}`)
        if (!jobResponse.ok) {
          throw new Error('Failed to fetch job data')
        }
        const jobData = await jobResponse.json()
        setJob(jobData)

        console.log('Applicant Data:', applicantData)
        console.log('Job Data:', jobData)
      } catch (error) {
        console.error('Error fetching applicant:', error)
        setError('Failed to load applicant data')
      } finally {
        setLoading(false)
      }
    }

  
    fetchApplicant()
  }, [params.id, params.jobid])



  const updateApplicationStatus = async (applicantId: number, jobId: number, status: string) => {
    try {
      
      const response = await fetch('/api/update-application-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicantId: applicantId, jobId: job?.JobID, status }),
      });

      if (response.ok) {
        alert(`Application status updated to ${status}`);
        const data = await response.json();
        console.log(data)
      } else {
        alert('Failed to update application status');      
       
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('An error occurred while updating the application status');
    }
  };






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
      
     
       {/* Back Link */}
       <Link href="/recruiter-dashboard" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300 mb-4  inline-block w-16">
            Back 
        </Link>
        
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
        {applicant.parsedResume && (
          <>
            <div className="mb-4">
              <h2 className="text-xl font-semibold">
                Parsed Profile Information
              </h2>
              <p>
                <strong>Name:</strong> {applicant.parsedResume.profile.name}
              </p>
              <p>
                <strong>Email:</strong> {applicant.parsedResume.profile.email}
              </p>
              <p>
                <strong>Phone:</strong> {applicant.parsedResume.profile.phone}
              </p>
              <p>
                <strong>Location:</strong>{' '}
                {applicant.parsedResume.profile.location || 'Not provided'}
              </p>
              <p>
                <strong>URL:</strong>{' '}
                {applicant.parsedResume.profile.url || 'Not provided'}
              </p>
              {applicant.parsedResume.profile.summary && (
                <p>
                  <strong>Summary:</strong>{' '}
                  {applicant.parsedResume.profile.summary}
                </p>
              )}
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Skills</h2>
              {applicant.parsedResume.skills.descriptions.map((skill, index) => (
                <p key={index}>{skill}</p>
              ))}
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Education</h2>
              {applicant.parsedResume.educations.map((education, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>{education.school}</strong>
                  </p>
                  <p>{education.degree}</p>
                  <p>{education.date}</p>
                  {education.gpa && <p>GPA: {education.gpa}</p>}
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Work Experience</h2>
              {applicant.parsedResume.workExperiences.map((experience, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>{experience.company}</strong>
                  </p>
                  <p>{experience.jobTitle}</p>
                  <p>{experience.date}</p>
                  <ul>
                    {experience.descriptions.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <h2 className="text-xl font-semibold">Projects</h2>
              {applicant.parsedResume.projects.map((project, index) => (
                <div key={index} className="mb-2">
                  <p>
                    <strong>{project.project}</strong>
                  </p>
                  <p>{project.date}</p>
                  <ul>
                    {project.descriptions.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="mb-4">
          <h2 className="text-xl font-semibold">Additional Information</h2>
          <p>
            <strong>US Citizen:</strong> {applicant.uscitizen ? 'Yes' : 'Yes'}
          </p>
          <p>
            <strong>Application Date:</strong>{' '}
            {new Date(applicant.dateaddedtodb).toLocaleDateString()}
          </p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Resume</h2>
          {applicant.resumeUrl ? (
            <div className="mt-4">
              <iframe
                src={`${applicant.resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                className="w-full h-[600px] border border-gray-300"
                title="Applicant Resume"
              />
            </div>
          ) : (
            <p>No resume available</p>
          )}

            {/*Approve  and deny Buttons */ }

          <div className="recruiter-dashboard__buttons flex justify-end" style={{ marginTop: '20px' }} >
            <button
              onClick={() =>
                updateApplicationStatus(applicant.applicantid, parseInt(params.id as string), 'approved')
              }
              className="recruiter-dashboard__button recruiter-dashboard__button--approve"
            >
              Approve
            </button>
            <button
              onClick={() =>
                updateApplicationStatus(applicant.applicantid, parseInt(params.id as string), 'denied')
              }
              className="recruiter-dashboard__button recruiter-dashboard__button--deny"
            >
              Deny
            </button>
          </div>
          


        </div>
      </div>
    </div>
  )
}
