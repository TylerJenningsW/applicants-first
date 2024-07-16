'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/ApplicantDashboard.css';

const jobs = [
  { title: 'Software Engineer', company: 'Example Corp', status: 'Pending' },
  { title: 'Product Manager', company: 'Tech Co', status: 'Interview' },
  { title: 'Data Scientist', company: 'Data Inc', status: 'Offered' }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Pending':
      return 'status-pending';
    case 'Interview':
      return 'status-interview';
    case 'Offered':
      return 'status-offered';
    default:
      return '';
  }
};

const ApplicantDashboard: React.FC = () => {
  return (
    <div className="dashboard-container-applicant">
      <header className="admin-header">
        <div className="admin-logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="admin-app-name">Applicants First</h1>
        </div>
        <div className="user-info">
          <span>Hello, Applicant</span>
          <Link href="/login"><button className="logout-button">Log Out</button></Link>
        </div>
      </header>
      <div className="nav-container">
        <nav className="nav-bar">
          <Link href="/applicant-dashboard" className="nav-link">Home</Link>
          <Link href="/#" className="nav-link">Jobs</Link>
          <Link href="/#" className="nav-link">My Info</Link>
        </nav>
      </div>
      <main className="main-content">
        <h2>Applicant Dashboard</h2>
        <p>Welcome to the Applicant Dashboard. Use the menu to navigate through the sections.</p>

        <div className="jobs-list">
          <h3 className="jobs-title">Jobs Applied For</h3>
          <div className="jobs-container">
            <ul>
              {jobs.map((job, index) => (
                <li key={index} className="job-card">
                  <div className="job-info">
                    <h4>{job.title}</h4>
                    <p>{job.company}</p>
                  </div>
                  <div className={`job-status ${getStatusColor(job.status)}`}>
                    {job.status}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApplicantDashboard;
