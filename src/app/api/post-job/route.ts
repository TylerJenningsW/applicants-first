import { NextRequest, NextResponse } from 'next/server'
import prisma from '../../../../utils/prisma/prismaClient'
import slugify from 'slugify'
import { v4 as uuidv4 } from 'uuid' // You might need to install this package

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
    let baseSlug = slugify(jobTitle, { lower: true });
    let slug = baseSlug;
    let counter = 0;

    // Check if the slug already exists and generate a new one if it does
    while (true) {
      const existingJob = await prisma.job.findUnique({
        where: { Slug: slug },
      });

      if (!existingJob) break;

      // If the slug exists, append a unique identifier
      counter++;
      slug = `${baseSlug}-${counter}`;

      // If we've tried too many times, use a UUID to ensure uniqueness
      if (counter > 3) {
        slug = `${baseSlug}-${uuidv4().slice(0, 8)}`;
        break;
      }
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