'use server'
import prisma from '../../../utils/prisma/prismaClient'

export default async function fetchJobs() {
  try {
    const jobs = await prisma.job.findMany({
      include: {
        organization: {
          select: {
            OrganizationName: true,
          },
        },
        applicants: {
          select: {
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
