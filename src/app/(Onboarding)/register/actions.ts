import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerClient } from '../../../../utils/supabase/supabaseClient'

export async function signup(formData: FormData) {
  const supabase = getServerClient()

  // Extract form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  // Sign up the user
  const { error, user } = await supabase.auth.signUp(data)
  console.log(error)
  if (error) {
    redirect('/error')
  }

  // Extract additional information
  const role = formData.get('role') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  // Create organization if the user is an Administrator
  const organizationId =
    role === 'Administrator'
      ? await createOrganization(firstName, lastName)
      : null

  // Insert user profile
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

  // Revalidate and redirect
  revalidatePath('/')
  redirect('/')
}

async function createOrganization(firstName: string, lastName: string) {
  const supabase = getServerClient()

  // Insert new organization and retrieve the generated organizationid
  const { data: orgData, error: orgError } = await supabase
    .from('organization')
    .insert({
      organizationname: `${firstName} ${lastName}'s Organization`,
    })
    .select('organizationid')
    .single()

  if (orgError) {
    console.error(orgError)
    throw new Error('Failed to create organization')
  }

  // Return the generated organizationid
  return orgData?.organizationid
}
