'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import prisma from '../../../../utils/prisma/prismaClient';
import { createClient } from '../../../../utils/supabase/server';
export async function signup(formData: FormData) {
  const supabase = createClient();

  // Extract form data
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    phoneNumber: formData.get('phoneNumber') as string,
    firstName: formData.get('firstName') as string,
    lastName: formData.get('lastName') as string,
    role: formData.get('role') as string,
  };

  // Sign up the user with Supabase Auth
  const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        phone: data.phoneNumber,
      },
    },
  });

  if (signUpError || !signUpData?.user) {
    console.error(signUpError || 'User object is null');
    return redirect('/error');
  }
  
  const user = signUpData.user;

  // Create organization if the user is an Administrator
  let organizationId = null;
  if (data.role === 'Administrator') {
    try {
      organizationId = await createOrganization(data.firstName, data.lastName);
    } catch (orgError) {
      console.error('Failed to create organization:', orgError);
      return redirect('/error');
    }
  }

  // Insert user profile using Prisma
  try {
    await prisma.profile.create({
      data: {
        id: user.id,
        email: user.email!,
        role: data.role,
        first_name: data.firstName,
        last_name: data.lastName,
        organization_id: organizationId,
        creation_date: new Date(),
        last_login_date: new Date(),
      },
    });
  } catch (profileError) {
    console.error(profileError);
    return redirect('/error');
  }

  // Revalidate and redirect
  revalidatePath('/');
  return redirect('/login');
}

export async function createOrganization(firstName: string, lastName: string) {
  // Insert new organization and retrieve the generated organizationId using Prisma
  try {
    const org = await prisma.organization.create({
      data: {
        OrganizationName: `${firstName} ${lastName}'s Organization`,
        CreationDate: new Date(),
      },
    });

    return org.OrganizationID;
  } catch (orgError) {
    console.error(orgError);
    throw new Error('Failed to create organization');
  }
}
