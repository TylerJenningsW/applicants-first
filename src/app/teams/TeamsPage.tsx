"use client"; // Add this directive if using Next.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import '../styles/TeamsFeature.css';

interface Employee {
  name: string;
  role: string;
  email: string;
  hireDate: string;
}

const TeamsPage: React.FC = () => {
  const employees: Employee[] = [
    // This will be filled with actual data later
    {
        name: "John Doe",
        role: "Software Engineer",
        email: "john.doe@example.com",
        hireDate: "2021-01-15",
      },
      {
        name: "Jane Smith",
        role: "Product Manager",
        email: "jane.smith@example.com",
        hireDate: "2019-07-22",
      },
  ];

  return (
    <div className="teams-container">
      <header className="header">
        <div className="logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="app-name">Applicants First</h1>
        </div>
        <div className="top-buttons">
          <Link href="/login-form"><button className="button">Log Out</button></Link>
        </div>
      </header>

      <h2 className="teams-title">Teams</h2>
      <div className="teams-table-wrapper">
        <table className="teams-table">
          <thead>
            <tr className="teams-table-header">
              <th className="teams-table-header-cell">Name</th>
              <th className="teams-table-header-cell">Role</th>
              <th className="teams-table-header-cell">Email</th>
              <th className="teams-table-header-cell">Hire Date</th>
            </tr>
          </thead>
          <tbody className="teams-table-body">
            {employees.map((employee, index) => (
              <tr key={index} className="teams-table-row">
                <td className="teams-table-cell">
                  <a href="#" className="teams-table-link">{employee.name}</a>
                </td>
                <td className="teams-table-cell">{employee.role}</td>
                <td className="teams-table-cell">{employee.email}</td>
                <td className="teams-table-cell">{employee.hireDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeamsPage;
