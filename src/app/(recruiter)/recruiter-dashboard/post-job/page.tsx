import ProtectedRoute from '@/app/components/ProtectedRoute'
import PostJob from '@/app/post-job/PostJob'
import React from 'react'
import { useRouter } from 'next/navigation'; // For redirection after job posting

const router = useRouter();

  // Function to handle successful job posting
  const handleJobPosted = async () => {
    // Redirect or refresh logic after the job is posted
    router.push('/recruiter-dashboard'); // Redirect to recruiter dashboard or another page
  };

  // Function to close the modal
  const handleClose = () => {
    router.push('/recruiter-dashboard'); // Example of closing the modal or navigating
  };

export default function PostJobPage() {
  return (
    <ProtectedRoute>
     <PostJob onJobPosted={handleJobPosted} onClose={handleClose} />
    </ProtectedRoute>
  )
}
