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
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

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
    // Create or update profile
    const profile = await prisma.profile.upsert({
      where: { id: user.id },
      update: {
        email: user.email!,
        last_login_date: new Date()
      },
      create: {
        id: user.id,
        email: user.email!,
        role: 'applicant',
        creation_date: new Date(),
        last_login_date: new Date()
      },
    })

    // Create or update applicant record
    const applicant = await prisma.applicant.upsert({
      where: { profileId: user.id },
      update: {
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
        parsedResume: parsedResume || Prisma.JsonNull,
      },
      create: {
        profileId: user.id,
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
        parsedResume: parsedResume || Prisma.JsonNull,
      }
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