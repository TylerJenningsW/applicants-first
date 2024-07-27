'use client';

import { useRouter } from "next/navigation";
import prisma from '../../../../utils/prisma/prismaClient'

async function getJob(slug: string) {
  const job = await prisma.job.findUnique({
    where: { Slug: slug },
  });

  if (!job) {
    throw new Error("Job not found");
  }

  return job;
}

const JobPage = async ({ params }) => {
  const { slug } = params;
  const job = await getJob(slug);
  const router = useRouter();

  const handleApplyClick = () => {
    router.push(`/jobs/${slug}/apply`);
  };

  return (
    <div>
      <header>
        <h1>{job.title}</h1>
        <p>{job.description}</p>
        <p>{job.company}</p>
        <p>{job.location}</p>
      </header>
      <section>
        <button onClick={handleApplyClick}>Apply Now</button>
      </section>
    </div>
  );
};

export default JobPage;
