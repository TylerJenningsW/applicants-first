import { NextRequest, NextResponse } from "next/server";
import prisma from "../../../../utils/prisma/prismaClient";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  if (!jobId) {
    return NextResponse.json({ error: "Job ID is required" }, { status: 400 });
  }

  try {
    const applications = await prisma.applicant.findMany({
      where: { job_id: parseInt(jobId, 10) },
      include: { job: true },
    });
    return NextResponse.json({ data: applications }, { status: 200 });
  } catch (error) {
    console.error("Error fetching applicants:", error);
    return NextResponse.json(
      { error: "Error fetching applicants" },
      { status: 500 }
    );
  }
}
