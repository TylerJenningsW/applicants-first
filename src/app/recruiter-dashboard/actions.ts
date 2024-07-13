'use server'
import { getServerClient } from '../../../utils/supabase/supabaseClient'

export default async function fetchJobs() {
  const supabase = getServerClient()

  const { data, error } = await supabase
    .from('jobs')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('Error fetching jobs:', error)
    return []
  } else {
    return data ?? []
  }
}
