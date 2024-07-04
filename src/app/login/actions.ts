'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { getServerClient } from '../../../utils/supabase/supabaseClient'

export async function login(formData: FormData) {
  const supabase = getServerClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)
  console.log(error)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData: FormData) {
  const supabase = getServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, user } = await supabase.auth.signUp(data)
  console.log(error)
  if (error) {
    redirect('/error')
  }

  // Insert into profiles table
  const role = formData.get('role') as string
  const firstName = formData.get('first_name') as string
  const lastName = formData.get('last_name') as string
  const organizationId =
    role === 'Recruiter'
      ? parseInt(formData.get('organization_id') as string, 10)
      : null

  const { error: profileError } = await supabase.from('profiles').insert({
    id: user?.id,
    role,
    first_name: firstName,
    last_name: lastName,
    organization_id: organizationId,
    creation_date: new Date(),
    last_login_date: new Date(),
  })

  if (profileError) {
    console.error(profileError)
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
