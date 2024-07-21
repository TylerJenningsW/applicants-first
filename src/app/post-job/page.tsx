import React from 'react'
import ProtectedRoute from '../components/ProtectedRoute'
import PostJob from './PostJob'

export default function PostJobPage() {
  return (
    <ProtectedRoute>
      <PostJob />
    </ProtectedRoute>
  )
}
