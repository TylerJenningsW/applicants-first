import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'
import { createClient } from '../../../../utils/supabase/server'

export async function POST(req: NextRequest) {
  const supabase = createClient()
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { applicantId, jobId, status } = await req.json()

    // Validate input
    if (!applicantId || !jobId || !status) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if the job application exists
    const jobApplication = await prisma.jobApplication.findUnique({
      where: {
        applicantId_jobId: {
          applicantId: applicantId,
          jobId: jobId,
        },
      },
      include: {
        status: true,
      },
    })

    if (!jobApplication) {
      return NextResponse.json(
        { error: 'Job application not found' },
        { status: 404 }
      )
    }

    // Update or create the application status
    const updatedStatus = await prisma.applicationStatus.upsert({
      where: {
        jobApplicationId: jobApplication.id,
      },
      update: {
        status: status,
      },
      create: {
        jobApplicationId: jobApplication.id,
        status: status,
      },
    })

    return NextResponse.json({ data: updatedStatus }, { status: 200 })
  } catch (error) {
    console.error('Error updating application status:', error)
    return NextResponse.json(
      { error: 'Error updating application status' },
      { status: 500 }
    )
  }
}
