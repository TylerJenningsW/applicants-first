"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/AdminDashboard.css'; // Import the CSS file
import { Profile, Organization } from '../../../utils/types';
import AdminInfo from './admin-info'; // Import AdminInfo component

interface AdminDashboardProps {
  profile: Profile;
  organization: Organization;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ profile, organization }) => {
  return (
    <div className="dashboard-container">
      <header className="admin-header">
        <div className="admin-logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="admin-app-name">Applicants First</h1>
        </div>

        <div className="user-info">
          <span>Hello, {profile.first_name}</span>
          <Link href="/login"><button className="logout-button">Log Out</button></Link>
        </div>
      </header>
      <div className='nav-container'>
        <nav className="nav-bar">
          <Link href="/admin-dashboard" className="nav-link">Home</Link>
          <Link href="/teams" className="nav-link">Teams</Link>
          <Link href="/hiring" className="nav-link">Hiring</Link>
          <Link href="/#" className="nav-link">My Info</Link>
        </nav>
      </div>

      <main className="main-content">
        <h2>Admin Dashboard</h2>
        <p>Welcome to the Admin Dashboard. Use the menu to navigate through the sections.</p>
        <AdminInfo profile={profile} organization={organization} />
      </main>
    </div>
  );
};

export default AdminDashboard;
