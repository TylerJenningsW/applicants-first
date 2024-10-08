import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../utils/prisma/prismaClient'
import { createClient } from '../../../../../utils/supabase/server'

export async function GET(req: NextRequest) {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const applicant = await prisma.applicant.findUnique({
      where: { profileId: user.id },
    })
    console.log(applicant)    

    if (!applicant) {
      return NextResponse.json(
        { error: 'Applicant not found' },
        { status: 404 }
      )
    }

    const appliedJobs = await prisma.jobApplication.findMany({
      where: {
        applicantId: applicant.applicantid,
      },
      include: {
        job: {
          include: {
            organization: {
              select: {
                OrganizationName: true,
              },
            },
          },
        },
        status: true,
      },
    })
    console.log(appliedJobs, 'appliedJobs')    

    const formattedJobs = appliedJobs.map((application) => ({
      ...application.job,
      applicationStatus: application.status?.status || 'pending',
      appliedAt: application.appliedAt,
    }))
    
    return NextResponse.json({ jobs: formattedJobs }, { status: 200 })
  } catch (error) {
    console.error('Error fetching applied jobs:', error)
    return NextResponse.json(
      { error: 'Error fetching applied jobs' },
      { status: 500 }
    )
  }
}
