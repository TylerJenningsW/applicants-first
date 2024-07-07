import React from 'react'
import { redirect } from 'next/navigation'
import AdminInfo from './admin-info'
import { getAdminData } from './actions'
import { createClient } from '../../../utils/supabase/server'

export default async function AdminDashboard() {
  const supabase = createClient()

  const { data: sessionData, error: sessionError } =
    await supabase.auth.getUser()
  if (sessionError || !sessionData?.user) {
    redirect('/login')
  }

  const adminId = sessionData.user.id
  const { profile, organization } = await getAdminData(adminId)

  if (!profile || !organization) {
    return <div>Error loading data</div>
  }

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <section>
        <h2>Admin Info</h2>
        <AdminInfo profile={profile} organization={organization} />
      </section>
    </div>
  )
}
