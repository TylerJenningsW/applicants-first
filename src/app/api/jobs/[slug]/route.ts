import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../utils/prisma/prismaClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  console.log('API route called with params:', params)
  const slug = params.slug
  console.log('Extracted slug:', slug)

  try {
    console.log('Attempting to fetch job from database')
    const job = await prisma.job.findUnique({
      where: { Slug: slug },
      include: {
        organization: {
          select: {
            OrganizationName: true,
          },
        },
      },
    })
    console.log('Database query result:', job)
    if (!job) {
      console.log('Job not found in database')
      return NextResponse.json({ error: 'Job not found' }, { status: 404 })
    }

    const jobData = {
      ...job,
      CompanyName: job.organization?.OrganizationName || 'Unknown Company',
    }
    console.log('Prepared job data:', jobData)

    console.log('Sending successful response')
    return NextResponse.json(jobData)
  } catch (error) {
    console.error('Error fetching job:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
