import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'
import { getServerClient } from '../../../../utils/supabase/supabaseClient'


export async function POST(req: NextRequest) {
    const supabase = getServerClient();
    const { data: { user }, error } = await supabase.auth.getUser();
  
    if (error || !user) {
      console.error('Supabase auth error:', error);
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
      companyName
    } = await req.json();
  
    try {
      // Initialize variables
      let organizationIdToUse: number | undefined = undefined;
  
      if (organizationId) {
        organizationIdToUse = parseInt(organizationId);
      } else if (companyName) {
        const newOrg = await prisma.organization.create({
          data: {
            OrganizationName: companyName,
            CreationDate: new Date(),
          },
        });
        organizationIdToUse = newOrg.OrganizationID;
      }
  
      const job = await prisma.job.create({
        data: {
          JobTitle: jobTitle,
          JobDescription: jobDescription,
          JobAddressLocation: jobAddressLocation,
          JobSalary: jobSalary,
          JobStatus: jobStatus,
          CandidateResponseCount: candidateResponseCount,
          TotalApplicantsCount: totalApplicantsCount,
          ApplicationDeadline: new Date(applicationDeadline),
          OrganizationID: organizationIdToUse,
          UserID: user.id,
          PostedDate: new Date()
        },
      });
  
      return NextResponse.json({ data: job }, { status: 200 });
    } catch (error) {
      console.error('Error posting job:', error);
      return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
  }