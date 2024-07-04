"use client";

import React from 'react';
import '../styles/Login.css';
import Image from 'next/image';
import Link from 'next/link';
import { login, signup } from '../login/actions'; // Import the actions

const LoginForm: React.FC = () => {
  return (

    
    <div className="login-container">
        
      <h2 className="login-title">Login</h2>
      <form className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" className="form-input" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" className="form-input" required />
        </div>
        
        <div className="link-group">
        <Link href="/forgot-password" legacyBehavior>
          <a className="forgot-password-link">Forgot Password?</a>
        </Link>
        <Link href="/register-form" legacyBehavior>
          <a className="register-link">Register</a>
        </Link>
      </div>

        <div className="button-group">
          <button type="submit" formAction={login} className="login-button">Log in</button>
        </div>
        
      </form>
    </div>
  );
};

export default LoginForm;


