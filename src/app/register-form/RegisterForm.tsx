"use client";

import React from 'react';
import '../styles/Register.css';

const RegisterForm: React.FC = () => {
  return (

    
    <div className="register-container">

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
