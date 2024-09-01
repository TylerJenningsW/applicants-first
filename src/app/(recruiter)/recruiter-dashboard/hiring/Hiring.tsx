"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/Hiring.css';

const Hiring: React.FC = () => {
  return (
    <>
      <header className="hiring-header">
        <div className="hiring-logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="hiring-app-name">Applicants First</h1>
        </div>
        <div className="hiring-user-info">
          <span>Hello, Recruiter</span>
          <Link href="/recruiter-dashboard" legacyBehavior>
            <button className="back-button">Back</button>
          </Link>
        </div>
      </header>
      <div className="hiring-container">
        <div className="hiring-content">
          <h2>Hiring</h2>
          <div className="hiring-buttons">
            <Link href="/add-job-form" legacyBehavior>
              <button className="hiring-button">Add New Job</button>
            </Link>
            <Link href="/submitted-applications" legacyBehavior>
              <button className="hiring-button">Submitted Applications</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hiring;
