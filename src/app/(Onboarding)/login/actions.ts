'use server';

import { redirect } from 'next/navigation';
import { getServerClient } from '../../../../utils/supabase/supabaseClient';
import prisma from '../../../../utils/prisma/prismaClient';
export async function login(formData: FormData) {
  const supabase = getServerClient();

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  };
  
  const { error, data: session } = await supabase.auth.signInWithPassword(data);

  if (error || !session?.user) {
    console.error('Login error', error);
    return redirect('/error');
  }

  // Get the user's profile to determine their role
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (!profile) {
      throw new Error('Profile not found');
    }

    const role = profile.role;
    if (role === 'Administrator') {
      return redirect('/admin-dashboard');
    } else if (role === 'Recruiter') {
      return redirect('/recruiter-dashboard');
    } else {
      return redirect('/applicant-dashboard');
    }
  } catch (profileError) {
    console.error('Profile fetch error', profileError);
    return redirect('/error');
  }
}
