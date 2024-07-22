import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'
import slugify from 'slugify'

export async function POST(req: NextRequest) {
  const { jobTitle, jobDescription, jobAddressLocation, jobSalary, jobStatus, candidateResponseCount, totalApplicantsCount, applicationDeadline, organizationId, companyName, userId } = await req.json();

  try {
    let organizationIdToUse: number | undefined = undefined;

    if (organizationId) {
      organizationIdToUse = organizationId;
    } else if (companyName) {
      const newOrg = await prisma.organization.create({
        data: {
          OrganizationName: companyName,
          CreationDate: new Date(),
        },
      });
      organizationIdToUse = newOrg.OrganizationID;
    }

    // Generate a slug for the job title
    const slug = slugify(jobTitle, { lower: true });

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
        UserID: userId,
        PostedDate: new Date(),
        Slug: slug,
      },
    });

    const jobUrl = `${process.env.NEXT_PUBLIC_URL}/job/${slug}`;

    return NextResponse.json({ data: job, url: jobUrl }, { status: 200 });
  } catch (error) {
    console.error('Error posting job:', error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}