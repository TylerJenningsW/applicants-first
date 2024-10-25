'use server'
import prisma from '../../../../utils/prisma/prismaClient'
import { createClient } from '../../../../utils/supabase/server'


export async function fetchJobs(userId?: string) {
  try {
    const supabase = createClient()
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
        jobApplications: {
          include: {
            applicant: {
              select: {
                applicantid: true,
                fullname: true,
                emailaddress: true,
                alternateemailaddress: true,
                streetaddress: true,
                city: true,
                state: true,
                zipcode: true,
                linkedinurl: true,
                uscitizen: true,
                parsedResume: true,
                resumeUrl: true,
              },
            },
            status: true,
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

export async function initializePage(): Promise<[boolean, any]> {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
      return [false, null];
    }

    return [true, user];
  } catch (error) {
    console.error('Error initializing page:', error)
    return [false, null];
  }
}