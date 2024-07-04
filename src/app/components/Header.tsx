"use client";

import React from 'react';
import Image from 'next/image';
import '../styles/Header.css'; // Import the CSS file for the header

const Header: React.FC = () => {
  return (
    <header className="header1">
      <div className="logo1">
        <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
        <h1>Applicants First</h1>
      </div>
    </header>
  );
};

export default Header;
