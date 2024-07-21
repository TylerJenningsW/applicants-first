import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../utils/prisma/prismaClient';
import { getServerClient } from '../../../../utils/supabase/supabaseClient';

export async function POST(req: NextRequest) {
  const supabase = getServerClient();
  const { data: { user } } = await supabase.auth.getUserByCookie(req);

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    jobTitle,
    jobDescription,
    jobAddressLocation,
    jobSalary,
    jobStatus,
    candidateResponseCount,
    totalApplicantsCount,
    applicationDeadline,
    organizationId,
  } = await req.json();

  try {
    const job = await prisma.job.create({
      data: {
        JobTitle: jobTitle,
        JobDescription: jobDescription,
        JobAddressLocation: jobAddressLocation,
        JobSalary: jobSalary,
        JobStatus: jobStatus,
        CandidateResponseCount: candidateResponseCount,
        TotalApplicantsCount: totalApplicantsCount,
        ApplicationDeadline: applicationDeadline,
        OrganizationID: organizationId,
        UserID: user.id,
        PostedDate: new Date(),
      },
    });
    return NextResponse.json({ data: job }, { status: 200 });
  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
