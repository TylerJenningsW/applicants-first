"use client"; // Add this directive

import React, {useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';

import '../styles/RoleManagement.css'; // Import the CSS file

const RoleManagement: React.FC = () => {

  return (
    <div className="container1">
      
      
      <header className="header1">
        <div className="logo1">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1>Applicants First</h1>
        </div>
      </header>
      
      <main className="main1">
        
        <Image src="/images/Logo.png" alt="Applicants First" width={80} height={80} />
        
        <h2>Select your Role</h2>

        <div className="dropdownGroup">
          <select className="dropdown">
            <option value="" disabled>Select a Role</option>
            <option value="Administrator">Administrator</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Client">Client</option>
          </select>
        </div>
        
        <Link href="./register-form" type='continue'><button className="continue-button">Continue</button></Link>
       
      
      </main>
      
    </div>
  );
};

export default RoleManagement;