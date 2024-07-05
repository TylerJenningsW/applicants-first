'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation'
import '@/app/styles/Register.css'

const RegisterForm: React.FC = () => {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') as string

  return (
    <div className="register-container">
      <h2 className="register-title">Register</h2>
      <form className="register-form" method="POST" action="/api/signup">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="form-input"
            required
          />
        </div>
        <input id="role" name="role" type="hidden" value={role} />
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
    </div>
  )
}

export default RegisterForm
