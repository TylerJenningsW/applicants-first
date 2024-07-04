import { getServerClient } from './supabaseClient'
import { NextResponse, type NextRequest } from 'next/server'
import type { User } from '@supabase/supabase-js' // Import the User type from Supabase client

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = getServerClient()

  // Using cookies from request object
  const { cookies } = request

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user && !request.nextUrl.pathname.startsWith('/login')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  // Always return the supabaseResponse to keep the cookies in sync
  return supabaseResponse
}
