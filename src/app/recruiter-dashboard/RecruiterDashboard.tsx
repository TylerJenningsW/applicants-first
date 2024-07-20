"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/RecruiterDashboard.css'; // Import the CSS file

const RecruiterDashboard: React.FC = () => {
  return (
    <div className="dashboard-container-recruiter">
      <header className="admin-header">
        <div className="admin-logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="admin-app-name">Applicants First</h1>
        </div>
        
        <div className="user-info-recruiter">
          <span>Hello, Recruiter</span>
          <Link href="/login"><button className="logout-button">Log Out</button></Link>
        </div>
      </header>
      <div className="nav-container-recruiter">
        <nav className="nav-bar">
            <Link href="/recruiter-dashboard" className="nav-link">Home</Link>
          <  Link href="/hiring" className="nav-link">Hiring</Link>
          <Link href="/my-info" className="nav-link">My Info</Link>
        </nav>
      </div>
       
      <main className="main-content-recruiter">
        <h2>Recruiter Dashboard</h2>
        <p>Welcome to the Recruiter Dashboard. Use the menu to navigate through the sections.</p>
      </main>
    </div>
  );
};

export default RecruiterDashboard;
