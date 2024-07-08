'use client'

import React, { Suspense } from 'react'
import RegisterForm from './RegisterForm'
const RegisterPage: React.FC = () => {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RegisterForm />
      </Suspense>
    </>
  )
}

export default RegisterPage
