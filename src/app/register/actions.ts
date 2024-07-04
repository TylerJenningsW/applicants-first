import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { getServerClient } from "../../../utils/supabase/supabaseClient"

export async function login(formData: FormData) {
  const supabase = getServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error, data: session } = await supabase.auth.signInWithPassword(data)
  console.log(error)

  if (error) {
    redirect('/error')
  }

  // Get the user's profile to determine their role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', session.user.id)
    .single()

  if (profileError) {
    console.error(profileError)
    redirect('/error')
  }

  // Redirect based on user role
  const role = profile.role
  if (role === 'Administrator') {
    redirect('/admin-dashboard')
  } else if (role === 'Recruiter') {
    redirect('/recruiter-dashboard')
  } else {
    redirect('/')
  }

  revalidatePath('/', 'layout')
}
