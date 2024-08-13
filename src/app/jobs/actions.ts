// 'use server'
// import prisma from '../../../utils/prisma/prismaClient'

// export default async function fetchJobs() {
//   try {
//     const jobs = await prisma.job.findMany({
//       include: {
//         organization: true,
//       },
//     })
//     return jobs
//   } catch (error) {
//     console.error('Error fetching jobs:', error)
//     return []
//   }
// }

'use server';
import prisma from '../../../utils/prisma/prismaClient';

export default async function fetchJobs(searchTerm = '') {
  try {
    const jobs = await prisma.job.findMany({
      where: searchTerm
        ? {
            JobTitle: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          }
        : {},
      include: {
        organization: true,
      },
    });
    return jobs;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}
