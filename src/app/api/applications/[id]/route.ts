import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../../utils/prisma/prismaClient'
import { getServerClient } from '../../../../../utils/supabase/supabaseClient'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = getServerClient()
  const { data: { user }, error: authError } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const id = params.id

  if (!id) {
    return NextResponse.json({ error: 'Applicant ID is required' }, { status: 400 })
  }

  try {
    const applicant = await prisma.applicant.findUnique({
      where: { applicantid: parseInt(id, 10) },
    })

    if (!applicant) {
      return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    }

    // Here you might want to add a permission check to ensure the user has rights to view this application

    return NextResponse.json(applicant)
  } catch (error) {
    console.error('Error fetching applicant:', error)
    return NextResponse.json({ error: 'Failed to fetch applicant' }, { status: 500 })
  }
}