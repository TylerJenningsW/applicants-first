'use server'

import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
export async function logout() {
    const supabase = createClient()
  
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      console.error('Logout error:', error.message)
      return redirect(`/error?message=${encodeURIComponent(error.message)}`)
    }
  
    return redirect('/login')
  }