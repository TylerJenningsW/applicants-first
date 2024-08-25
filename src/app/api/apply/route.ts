import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'
import { createClient } from '../../../../utils/supabase/server'
import { parseResumeFromPdf } from '../../../../utils/parser';
import { Prisma } from '@prisma/client';

// Only allow PDF and DOCX files
const allowedMimeTypes = [
  'application/pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

export async function POST(req: NextRequest) {
  const supabase = createClient()

  try {
    const formData = await req.formData()
    const file = formData.get('resume') as File
    const jobId = formData.get('jobId') as string

    // Check file type
    if (!allowedMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload a PDF or DOCX file.' },
        { status: 400 }
      )
    }

    // Upload file to Supabase Storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(`${Date.now()}_${file.name}`, file, {
        contentType: file.type
      })

    if (error) throw error

    const resumeUrl = supabase.storage.from('resumes').getPublicUrl(data.path).data.publicUrl

    // Parse the resume
    let parsedResume: Prisma.JsonValue | undefined;
    if (file.type === 'application/pdf') {
      parsedResume = await parseResumeFromPdf(resumeUrl)
    } else {
      // For DOCX files, you might need a different parsing function
      // parsedResume = await parseResumeFromDocx(resumeUrl)
      console.log('DOCX parsing not implemented yet')
    }

    // Create applicant record
    const applicant = await prisma.applicant.create({
      data: {
        fullname: formData.get('fullname') as string,
        emailaddress: formData.get('emailaddress') as string,
        alternateemailaddress: formData.get('alternateemailaddress') as string || null,
        streetaddress: formData.get('streetaddress') as string || null,
        city: formData.get('city') as string || null,
        state: formData.get('state') as string || null,
        zipcode: formData.get('zipcode') as string || null,
        country: formData.get('country') as string || null,
        linkedinurl: formData.get('linkedinurl') as string || null,
        resumeUrl: resumeUrl,
        parsedResume: parsedResume || Prisma.JsonNull, // hack to avoid null error
        job_id: parseInt(jobId, 10),
      },
    })

    return NextResponse.json({ data: applicant }, { status: 200 })
  } catch (err) {
    console.error('Error saving application:', err)
    return NextResponse.json(
      { error: 'Error saving application' },
      { status: 500 }
    )
  }
}