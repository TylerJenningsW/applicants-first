'use server'

import { getServerClient } from '../../../utils/supabase/supabaseClient'
import { Organization, Profile } from '../../../utils/types'

interface AdminData {
  profile: Profile | null
  organization: Organization | null
}

export async function getAdminData(adminId: string): Promise<AdminData> {
  const supabase = getServerClient()

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, organization_id')
    .eq('id', adminId)
    .single()

  if (profileError) {
    console.error(profileError)
    return { profile: null, organization: null }
  }

  const { data: organization, error: organizationError } = await supabase
    .from('organization') // Corrected table name
    .select('organizationid, organizationname') // Corrected column name
    .eq('organizationid', profile.organization_id)
    .single()

  if (organizationError) {
    console.error('Error fetching organization:', organizationError)
    return { profile, organization: null }
  }

  return { profile, organization }
}
