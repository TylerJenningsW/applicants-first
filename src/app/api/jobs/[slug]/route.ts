// import { NextRequest, NextResponse } from 'next/server'
// import prisma from '../../../../../utils/prisma/prismaClient'
// import { getServerClient } from '../../../../../utils/supabase/supabaseClient'

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   console.log('API route called with params:', params)
//   const slug = params.slug
//   console.log('Extracted slug:', slug)

//   try {
//     console.log('Attempting to fetch job from database')
//     const job = await prisma.job.findUnique({
//       where: { Slug: slug },
//       include: {
//         organization: {
//           select: {
//             OrganizationName: true,
//           },
//         },
        
//       },
//     })
//     console.log('Database query result:', job)
//     if (!job) {
//       console.log('Job not found in database')
//       return NextResponse.json({ error: 'Job not found' }, { status: 404 })
//     }

//     const jobData = {
//       ...job,
//       CompanyName: job.organization?.OrganizationName || 'Unknown Company',
//     }
//     console.log('Prepared job data:', jobData)

//     console.log('Sending successful response')
//     return NextResponse.json(jobData)
//   } catch (error) {
//     console.error('Error fetching job:', error)
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     )
//   }
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   const supabase = getServerClient()
//   const {
//     data: { user },
//     error: authError,
//   } = await supabase.auth.getUser()

//   if (authError || !user) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   const userId = user.id
//   const slug = params.slug

//   try {
//     // First, fetch the job
//     const job = await prisma.job.findUnique({
//       where: { Slug: slug },
//       include: { organization: true },
//     })

//     if (!job) {
//       return NextResponse.json({ error: 'Job not found' }, { status: 404 })
//     }

//     // Check if the user has permission to delete this job
//     const userProfile = await prisma.profile.findUnique({
//       where: { id: userId },
//       include: { organization: true },
//     })

//     if (!userProfile) {
//       return NextResponse.json(
//         { error: 'User profile not found' },
//         { status: 404 }
//       )
//     }

//     const hasPermission =
//       job.UserID === userId || // User created the job
//       job.OrganizationID === userProfile.organization_id || // User belongs to the organization
//       userProfile.role === 'Administrator' // User is an admin

//     if (!hasPermission) {
//       return NextResponse.json({ error: 'Permission denied' }, { status: 403 })
//     }

//     // If we've made it here, the user has permission. Delete the job.
//     await prisma.job.delete({
//       where: { JobID: job.JobID },
//     })

//     return NextResponse.json(
//       { message: 'Job deleted successfully' },
//       { status: 200 }
//     )
//   } catch (error) {
//     console.error('Error deleting job:', error)
//     return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 })
//   }
// }





import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../../utils/prisma/prismaClient';
import { getServerClient } from '../../../../../utils/supabase/supabaseClient';


export async function GET(request: NextRequest, { params }: { params: { slug: string } }) {
  const slug = params.slug;

  try {
    const job = await prisma.job.findUnique({
      where: { Slug: slug }, // Find job by slug
      include: {
        organization: {
          select: {
            OrganizationName: true,
          },
        },
      },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const jobData = {
      ...job,
      CompanyName: job.organization?.OrganizationName || 'Unknown Company',
    };

    return NextResponse.json(jobData); // Return a single job object
  } catch (error) {
    console.error('Error fetching job:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const supabase = getServerClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const userId = user.id;
  const slug = params.slug;

  try {
    const job = await prisma.job.findUnique({
      where: { Slug: slug },
      include: { organization: true },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    const userProfile = await prisma.profile.findUnique({
      where: { id: userId },
      include: { organization: true },
    });

    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    const hasPermission =
      job.UserID === userId ||
      job.OrganizationID === userProfile.organization_id ||
      userProfile.role === 'Administrator';

    if (!hasPermission) {
      return NextResponse.json({ error: 'Permission denied' }, { status: 403 });
    }

    await prisma.job.delete({
      where: { JobID: job.JobID },
    });

    return NextResponse.json(
      { message: 'Job deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting job:', error);
    return NextResponse.json({ error: 'Failed to delete job' }, { status: 500 });
  }
}
