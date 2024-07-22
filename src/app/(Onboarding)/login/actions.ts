'use server'

import { redirect } from 'next/navigation'
import { getServerClient } from '../../../../utils/supabase/supabaseClient'
import prisma from '../../../../utils/prisma/prismaClient'

export async function login(formData: FormData) {
  const supabase = getServerClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  console.log('Login attempt:', data)

  const { error, data: session } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Supabase login error:', error.message, error)
    return redirect(`/error?message=${encodeURIComponent(error.message)}`)
  }

  if (!session?.user) {
    const noUserError = 'No user in session'
    console.error(noUserError, session)
    return redirect(`/error?message=${encodeURIComponent(noUserError)}`)
  }

  console.log('User signed in:', session.user.id)
  let profile = null
  try {
    profile = await prisma.profile.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    })

    if (!profile) {
      const profileError = 'Profile not found'
      throw new Error(profileError)
    }

    console.log('Profile found:', profile)
  } catch (profileError) {
    console.error(
      'Profile fetch error:',
      (profileError as Error).message,
      profileError
    )
    return redirect(
      `/error?message=${encodeURIComponent((profileError as Error).message)}`
    )
  } finally {
    console.log('Login complete')
    const role = profile?.role
    if (role === 'Administrator') {
      return redirect('/admin-dashboard')
    } else if (role === 'Recruiter') {
      return redirect('/recruiter-dashboard')
    } else {
      return redirect('/applicant-dashboard')
    }
  }
}
