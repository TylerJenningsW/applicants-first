import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'
import { createClient } from '../../../../utils/supabase/server'
import { CookieOptions, createServerClient } from '@supabase/ssr';
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

    // Create applicant record
    const applicant = await prisma.applicant.create({
      data: {
        fullname: formData.get('fullname') as string,
        emailaddress: formData.get('emailaddress') as string,
        alternateemailaddress: formData.get('alternateemailaddress') as string,
        streetaddress: formData.get('streetaddress') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zipcode: formData.get('zipcode') as string,
        country: formData.get('country') as string,
        linkedinurl: formData.get('linkedinurl') as string,
        resumeUrl: resumeUrl,
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