'use server'
import prisma from '../../../utils/prisma/prismaClient';
import { getServerClient } from '../../../utils/supabase/supabaseClient'

export default async function fetchJobs() {
  try {
    const jobs = await prisma.job.findMany({
    });
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}