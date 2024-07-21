import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { getServerClient } from '../../../utils/supabase/supabaseClient'

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = async ({
  children,
}) => {
  const supabase = getServerClient()
  const router = useRouter()
    const user = await supabase.auth.user()
  useEffect(() => {
    if (!user) {
      router.push('/login') // Redirect to login page if not authenticated
    }
  }, [user, router])

  if (!user) {
    return null // Prevent rendering the protected content before redirect
  }

  return <>{children}</>
}

export default ProtectedRoute
