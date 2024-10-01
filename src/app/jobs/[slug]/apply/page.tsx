'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import styles from './apply.module.css'
import ResumeUpload from './resumeUpload'
import ApplicantHeader from '@/app/components/ApplicantHeader'
import { DialogClose } from '@/components/ui/dialog'
import { useApplication } from '@/app/components/ApplicationContext'

const ApplyPage = () => {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string
  const [fullname, setFullname] = useState('')
  const [emailaddress, setEmailaddress] = useState('')
  const [alternateemailaddress, setAlternateEmailaddress] = useState('')
  const [streetaddress, setStreetaddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipcode, setZipcode] = useState('')
  const [country, setCountry] = useState('')
  const [linkedinurl, setLinkedinurl] = useState('')
  const [jobId, setJobId] = useState<number | null>(null)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const dialogCloseRef = useRef<HTMLButtonElement>(null)

  const { setApplicationSuccess } = useApplication()
  useEffect(() => {
    const fetchJobId = async () => {
      const response = await fetch(`/api/jobs/${slug}`)
      if (response.ok) {
        const job = await response.json()
        setJobId(job.JobID)
      } else {
        console.error('Failed to fetch job')
      }
    }

    fetchJobId()
  }, [slug])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!jobId || !resumeFile) {
      console.error('Job ID or resume not found')
      return
    }

    const formData = new FormData()
    formData.append('fullname', fullname)
    formData.append('emailaddress', emailaddress)
    formData.append('alternateemailaddress', alternateemailaddress)
    formData.append('streetaddress', streetaddress)
    formData.append('city', city)
    formData.append('state', state)
    formData.append('zipcode', zipcode)
    formData.append('country', country)
    formData.append('linkedinurl', linkedinurl)
    formData.append('jobId', jobId.toString())
    formData.append('resume', resumeFile)

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        console.log('Application submitted:', result)
        setApplicationSuccess(true)
      } else {
        throw new Error('Failed to submit application')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
    }
  }
  return (
    <>
      <div className={styles.container}>
        <h1 className={styles.title}>Apply for Position</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="fullname">Full Name</label>
            <input
              id="fullname"
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              required
            />
          </div>

          <DialogClose ref={dialogCloseRef} className="hidden" />
          <div className={styles.formGroup}>
            <label htmlFor="emailaddress">Email Address</label>
            <input
              id="emailaddress"
              type="email"
              value={emailaddress}
              onChange={(e) => setEmailaddress(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="alternateemailaddress">
              Alternate Email Address
            </label>
            <input
              id="alternateemailaddress"
              type="email"
              value={alternateemailaddress}
              onChange={(e) => setAlternateEmailaddress(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="streetaddress">Street Address</label>
            <input
              id="streetaddress"
              type="text"
              value={streetaddress}
              onChange={(e) => setStreetaddress(e.target.value)}
            />
          </div>
          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label htmlFor="city">City</label>
              <input
                id="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="state">State</label>
              <input
                id="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="zipcode">Zip Code</label>
              <input
                id="zipcode"
                type="text"
                value={zipcode}
                onChange={(e) => setZipcode(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="country">Country</label>
            <input
              id="country"
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="linkedinurl">LinkedIn URL</label>
            <input
              id="linkedinurl"
              type="text"
              value={linkedinurl}
              onChange={(e) => setLinkedinurl(e.target.value)}
            />
          </div>
          <ResumeUpload setResumeFile={setResumeFile} />
          <button type="submit" className={styles.submitButton}>
            Submit Application
          </button>
        </form>
      </div>
      )
    </>
  )
}

export default ApplyPage
