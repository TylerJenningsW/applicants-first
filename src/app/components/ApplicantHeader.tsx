import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import LogOutButton from './LogOutButton'
function ApplicantHeader() {
  return (
    <div className="dashboard-container-applicant">
      <header className="admin-header">
        <div className="admin-logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="admin-app-name">Applicants First</h1>
        </div>
        <div className="user-info">
          <span>Hello, Applicant</span>
          <LogOutButton />
        </div>
      </header>
      <div className="nav-container">
        <nav className="nav-bar">
          <Link href="/applicant-dashboard" className="nav-link">
            Home
          </Link>
          <Link href="/applicant-dashboard/jobs" className="nav-link">
            Jobs
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default ApplicantHeader
