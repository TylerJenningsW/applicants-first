'use server'

import { redirect } from 'next/navigation'
import { getServerClient } from '../../utils/supabase/supabaseClient'
export async function logout() {
    const supabase = getServerClient()
  
    const { error } = await supabase.auth.signOut()
  
    if (error) {
      console.error('Logout error:', error.message)
      return redirect(`/error?message=${encodeURIComponent(error.message)}`)
    }
  
    return redirect('/login')
  }