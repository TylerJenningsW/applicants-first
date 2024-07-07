"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './globals.css'; // Import global styles


export default function Home() {
  return (
    
    
    <div className="container">
      <header className="header">
        <div className="logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="app-name">Applicants First</h1>
        </div>
        <div className="top-buttons">
          <Link href="/login"><button className="button">Log In</button></Link>
          <Link href="/role-management"><button className="button">Join Now</button></Link>
        </div>
      </header>
      <main className="main">
        <div className="intro-box">
          <h2 className="welcome-heading">Welcome to Applicants First</h2>
          <p className="intro-text">The HR management app designed to streamline your hiring process. Manage applicants, track performance, and onboard new employees efficiently.</p>
          <div className="action-buttons">
            <Link href="/login"><button className="animated-button">Log In</button></Link>
            <Link href="/role-management"><button className="animated-button">Join Now</button></Link>
          </div>
        </div>
        <div className="welcome-sign">
          <h2 className="animated-welcome">Welcome!</h2>
        </div>
      </main>
    </div>


  );
}
