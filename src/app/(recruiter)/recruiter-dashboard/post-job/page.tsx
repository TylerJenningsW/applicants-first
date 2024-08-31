import ProtectedRoute from '@/app/components/ProtectedRoute'
import PostJob from '@/app/post-job/PostJob'
import React from 'react'

export default function PostJobPage() {
  return (
    <ProtectedRoute>
      <PostJob />
    </ProtectedRoute>
  )
}
