'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getServerClient } from '../../../../utils/supabase/supabaseClient'

export async function signup(formData: FormData) {
  const supabase = getServerClient()

  // Extract form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phoneNumber: formData.get('phoneNumber') as string,
  }

  // Sign up the user with user_metadata
  
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        phone: data.phoneNumber,
      },
    },
  })
  
  // Log the response for debugging
  console.log('Sign Up Data:', signUpData)
  console.log('Sign Up Error:', signUpError)
  
  if (signUpError || !signUpData?.user) {
    console.error(signUpError || 'User object is null')
    return redirect('/error')
  }
  
  const user = signUpData.user
  
  // Extract additional information
  const role = formData.get('role') as string // 'Administrator', 'Recruiter', or 'Client'
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string

  // Create organization if the user is an Administrator
  let organizationId = null
  if (role === 'Administrator') {
    try {
      organizationId = await createOrganization(firstName, lastName)
    } catch (orgError) {
      console.error('Failed to create organization:', orgError)
      return redirect('/error')
    }
  }

  // Insert user profile
  const { error: profileError } = await supabase.from('profiles').insert({
    id: user.id,
    role,
    first_name: firstName,
    last_name: lastName,
    organization_id: organizationId,
    creation_date: new Date().toISOString(),
    last_login_date: new Date().toISOString(),
  })

  if (profileError) {
    console.error(profileError)
    return redirect('/error')
  }
  

  // Revalidate and redirect
  revalidatePath('/')
  return redirect('/login')
}

export async function createOrganization(firstName: string, lastName: string) {
  const supabase = getServerClient()

  // Insert new organization and retrieve the generated organizationid
  const { data: orgData, error: orgError } = await supabase
    .from('organization')
    .insert({
      organizationname: `${firstName} ${lastName}'s Organization`,
      creationdate: new Date().toISOString(), // Add the current date for creationdate
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
