"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ApplyJobForm from '../apply-job-form/ApplyJobForm';
import '../styles/PostedJobs.css'; // Import the CSS file

const PostedJobs: React.FC = () => {
  const jobs = [
    {
      id: 1,
      title: "Software Engineer",
      company: "Tech Innovations Inc.",
      location: "San Francisco, CA",
      salary: "$120,000 - $140,000 per year",
      description: "Tech Innovations Inc. is looking for a passionate Software Engineer to join our dynamic team. You will be responsible for developing high-quality applications, collaborating with cross-functional teams, and continuously improving our software development processes.",
      requirements: [
        "Bachelor's degree in Computer Science or related field",
        "3+ years of experience in software development",
        "Proficiency in Java, Python, or C++",
        "Strong problem-solving skills"
      ]
    },
    // Add more jobs here
  ];

  return (
    <>
    <header className="hiring-header1">
        <div className="hiring-logo1">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="hiring-app-name1">Applicants First</h1>
        </div>
        <div className="hiring-user-info1">
          <span>Hello, Applicant</span>
          <Link href="/hiring" legacyBehavior>
            <button className="back-button1">Back</button>
          </Link>
        </div>
      </header>
      
      
<div className="jobs-container">
<h2>Available Jobs</h2>
<div className="jobs-list">
  {jobs.map(job => (
    <div key={job.id} className="job-card">
      <h3>{job.title}</h3>
      <p><strong>Company:</strong> {job.company}</p>
      <p><strong>Location:</strong> {job.location}</p>
      <p><strong>Salary:</strong> {job.salary}</p>
      <p>{job.description}</p>
      <Link href="/apply-job-form" legacyBehavior>
        <button className="apply-button">Apply Now</button>
      </Link>
    </div>
  ))}
</div>
</div>
    </>
  );
};

export default PostedJobs;
