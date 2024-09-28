'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type ApplicationContextType = {
  applicationSuccess: boolean
  setApplicationSuccess: (success: boolean) => void
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined)

export const ApplicationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [applicationSuccess, setApplicationSuccess] = useState(false)

  useEffect(() => {
    // Check localStorage on mount
    const storedSuccess = localStorage.getItem('applicationSuccess')
    if (storedSuccess === 'true') {
      setApplicationSuccess(true)
      // Clear the localStorage after reading
      localStorage.removeItem('applicationSuccess')
    }
  }, [])

  useEffect(() => {
    // Update localStorage when applicationSuccess changes
    if (applicationSuccess) {
      localStorage.setItem('applicationSuccess', 'true')
    }
  }, [applicationSuccess])

  return (
    <ApplicationContext.Provider value={{ applicationSuccess, setApplicationSuccess }}>
      {children}
    </ApplicationContext.Provider>
  )
}

export const useApplication = () => {
  const context = useContext(ApplicationContext)
  if (context === undefined) {
    throw new Error('useApplication must be used within an ApplicationProvider')
  }
  return context
}