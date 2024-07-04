import { getServerClient } from './supabaseClient'

export function createClientDB() {
  return getServerClient()
}
