"use client";

import React from 'react';
import '../styles/Register.css';
import Link from 'next/link';
import Image from 'next/image';

const RegisterForm: React.FC = () => {
  return (

    
    <div className="register-container">

    <header className="register-header">  
        
        <div className="logo1">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1>Applicants First</h1>
        </div>
      </header>

      <h2 className="register-title">Register</h2>
      <form className="register-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input type="text" id="firstName" name="firstName" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input type="text" id="lastName" name="lastName" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="tel" id="phoneNumber" name="phoneNumber" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" className="form-input" required />
        </div>
        <button type="submit" className="register-button">Register</button>
     
      </form>
    </div>
  );
};

export default RegisterForm;
