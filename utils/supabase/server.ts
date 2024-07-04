import { getServerClient } from './supabaseClient'

export function createServerDB() {
  return getServerClient()
}
