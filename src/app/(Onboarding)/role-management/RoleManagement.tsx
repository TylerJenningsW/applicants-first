'use client' // Add this directive

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

import '@/app/styles/RoleManagement.css' // Import the CSS file
import { useRouter } from 'next/navigation'

const RoleManagement: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState('')
  const router = useRouter()

  const handleContinue = () => {
    if (selectedRole) {
      router.push(`/register?role=${selectedRole}`)
    }
  }
  return (
    <div className="container1">
      <main className="main1">
        <Image
          src="/images/Logo.png"
          alt="Applicants First"
          width={80}
          height={80}
        />

        <h2>Select your Role</h2>

        <div className="dropdownGroup">
          <select
            className="dropdown"
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="" disabled>
              Select a Role
            </option>
            <option value="Administrator">Administrator</option>
            <option value="Recruiter">Recruiter</option>
            <option value="Client">Client</option>
          </select>
        </div>
        <button className="continue-button" onClick={handleContinue}>
          Continue
        </button>
      </main>
    </div>
  )
}

export default RoleManagement
