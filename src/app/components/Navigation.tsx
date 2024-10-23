'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { BriefcaseIcon } from 'lucide-react'

const Navbar = () => {
  const [jobCount, setJobCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchJobCount = async () => {
      try {
        const response = await fetch('/api/jobs/count')
        const data = await response.json()
        setJobCount(data.count)
      } catch (error) {
        console.error('Error fetching job count:', error)
      }
    }

    fetchJobCount()

    // Refresh job count every 5 minutes
    const interval = setInterval(fetchJobCount, 300000)

    return () => clearInterval(interval)
  }, [])

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex space-x-3 items-center">
              <Image
                src="/images/Logo.png"
                alt="App Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-blue-600">
                Applicants First
              </span>
            </Link>
          </div>

          <div className="flex items-center space-x-6">
            {/* Job Count Badge */}
            <div className="flex items-center space-x-2">
              <BriefcaseIcon className="w-5 h-5 text-blue-600" />
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-sm font-medium">
                {jobCount !== null ? `${jobCount} Jobs` : 'Loading...'}
              </span>
            </div>

            <Link href="/login">
              <button className="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">
                Log In
              </button>
            </Link>
            <Link href="/role-management">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
