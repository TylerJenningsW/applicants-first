import { NextResponse } from 'next/server';
import prisma from '../../../../../utils/prisma/prismaClient';

export async function GET() {
  try {
    // Get count of all active jobs
    const count = await prisma.job.count({
    });

    return NextResponse.json({ count });
  } catch (error) {
    console.error('Error fetching job count:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job count' },
      { status: 500 }
    );
  }
}