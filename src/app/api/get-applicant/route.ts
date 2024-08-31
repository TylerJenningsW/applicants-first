import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/prisma/prismaClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  try {
    const jobApplications = await prisma.jobApplication.findMany({
      where: { jobId: parseInt(jobId, 10) },
      include: {
        applicant: true,
        status: true,
        job: true,
      },
    });
    return NextResponse.json({ data: jobApplications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      { error: "Error fetching applicants" },
      { status: 500 }
    );
  }
}