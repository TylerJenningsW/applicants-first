import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

let serverClient: ReturnType<typeof createServerClient> | null = null

export type SupabaseClient = ReturnType<typeof createBrowserClient> | ReturnType<typeof createServerClient>

export function getServerClient() {
  if (!serverClient) {
    const cookieStore = cookies()
    serverClient = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    })
  }
  return serverClient as ReturnType<typeof createServerClient>
}
