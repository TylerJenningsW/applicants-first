import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'

export async function POST(req: NextRequest) {
  try {
    const {
      fullname,
      emailaddress,
      alternateemailaddress,
      streetaddress,
      city,
      state,
      zipcode,
      country,
      linkedinurl,
      jobId,
    } = await req.json()

    const application = await prisma.applicant.create({
      data: {
        fullname,
        emailaddress,
        alternateemailaddress,
        streetaddress,
        city,
        state,
        zipcode,
        country,
        linkedinurl,
        job_id: parseInt(jobId as string, 10),
      },
    })

    return NextResponse.json({ data: application }, { status: 200 })
  } catch (err) {
    console.error('Error saving application:', err)
    return NextResponse.json(
      { error: 'Error saving application' },
      { status: 500 }
    )
  }
}
