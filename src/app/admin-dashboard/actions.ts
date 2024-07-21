'use server'

import prisma from '../../../utils/prisma/prismaClient'
import { Organization, Profile } from '../../../utils/types'

interface AdminData {
  profile: Profile | null
  organization: Organization | null
}

export async function getAdminData(adminId: string): Promise<AdminData> {
  try {
    const profile = await prisma.profile.findUnique({
      where: { id: adminId },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        organization_id: true,
      },
    });

    if (!profile) {
      console.error('Profile not found');
      return { profile: null, organization: null };
    }

    const organization = profile.organization_id
      ? await prisma.organization.findUnique({
          where: { OrganizationID: profile.organization_id },
          select: {
            OrganizationID: true,
            OrganizationName: true,
          },
        })
      : null;

    return { profile, organization };
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return { profile: null, organization: null };
  }
}
