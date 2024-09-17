import React from 'react'

import Image from 'next/image'
import Link from 'next/link'
import '../styles/RecruiterDashboard.css'
import LogOutButton from './LogOutButton'
function RecruiterHeader() {
  return (
    <div className="dashboard-container-recruiter">
      <header className="admin-header">
        <div className="admin-logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="admin-app-name">Applicants First</h1>
        </div>

        <div className="user-info-recruiter">
          <span>Hello, Recruiter</span>
          <LogOutButton />
        </div>
      </header>
      <div className="nav-container-recruiter">
        <nav className="nav-bar">
          <Link href="/recruiter-dashboard" className="nav-link">
            Home
          </Link>
          <Link href="/recruiter-dashboard/hiring" className="nav-link">
            Hiring
          </Link>
          <Link href="/my-info" className="nav-link">
            My Info
          </Link>
        </nav>
      </div>
    </div>
  )
}

export default RecruiterHeader
