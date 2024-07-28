'use server'
import prisma from '../../../utils/prisma/prismaClient'
import { getServerClient } from '../../../utils/supabase/supabaseClient'


export default async function fetchJobs(userId?: string) {
  try {
    const supabase = getServerClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      throw new Error('Not authenticated')
    }

    const jobs = await prisma.job.findMany({
      where: {
        UserID: user.id
      },
      include: {
        organization: {
          select: {
            OrganizationName: true,
          },
        },
        applicants: {
          select: {
            applicantid: true,
            fullname: true,
            emailaddress: true,
          },
        },
      },
    })
    return jobs
  } catch (error) {
    console.error('Error fetching jobs:', error)
    return []
  }
}