"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/AdminDashboard.css'; // Import the CSS file

const AdminDashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header className="admin-header">
        <div className="admin-logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="admin-app-name">Applicants First</h1>
        </div>
        
        <div className="user-info">
          <span>Hello, Admin</span>
          <Link href="/login-form"><button className="logout-button">Log Out</button></Link>
        </div>
      </header>
      <div className='nav-container'>
        <nav className="nav-bar">
            <Link href="/admin-dashboard" className="nav-link">Home</Link>
            <Link href="/teams" className="nav-link">Teams</Link>
          <  Link href="/hiring" className="nav-link">Hiring</Link>
          <Link href="/my-info" className="nav-link">My Info</Link>
        </nav>
      </div>
       
      <main className="main-content">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the Admin Dashboard. Use the menu to navigate through the sections.</p>
      </main>
    </div>
  );
};

export default AdminDashboard;
