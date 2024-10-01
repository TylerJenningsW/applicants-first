"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../../../styles/Hiring.css';

const Hiring: React.FC = () => {
  return (
    <>

      
      <div className="hiring-container">
        <div className="hiring-content">
          <h2>Hiring</h2>
          <div className="hiring-buttons">
            <Link href="/recruiter-dashboard/post-job" legacyBehavior>
              <button className="hiring-button">Add New Job</button>
            </Link>
            <Link href="/recruiter-dashboard/applications/" legacyBehavior>
              <button className="hiring-button">Submitted Applications</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hiring;
