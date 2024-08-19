// Code with filter and sort features

'use server';
import prisma from '../../../utils/prisma/prismaClient';

export default async function fetchJobs(searchTerm = '', sortBy = 'newest') {
  let orderBy = {};

  // Determine sort order based on sortBy parameter
  switch (sortBy) {
    case 'newest':
      orderBy = { PostedDate: 'desc' };
      break;
    case 'oldest':
      orderBy = { PostedDate: 'asc' };
      break;
    case 'highestSalary':
      orderBy = { JobSalary: 'desc' };
      break;
    case 'lowestSalary':
      orderBy = { JobSalary: 'asc' };
      break;
    default:
      orderBy = { PostedDate: 'desc' };
  }

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
      orderBy: orderBy,
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








//Original Code

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



// //Code with filter feature 


// 'use server';
// import prisma from '../../../utils/prisma/prismaClient';

// export default async function fetchJobs(searchTerm = '') {
//   try {
//     const jobs = await prisma.job.findMany({
//       where: searchTerm
//         ? {
//             JobTitle: {
//               contains: searchTerm,
//               mode: 'insensitive',
//             },
//           }
//         : {},
//       include: {
//         organization: true,
//       },
//     });
//     return jobs;
//   } catch (error) {
//     console.error('Error fetching jobs:', error);
//     return [];
//   }
// }



