'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import prisma from "../../../../utils/prisma/prismaClient";

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  created_at: string;
}

const JobPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (slug) {
      const fetchJob = async () => {
        try {
          const job = await prisma.job.findUnique({
            where: { Slug: slug as string },
            select: {
              JobID: true,
              JobTitle: true,
              JobDescription: true,
              JobAddressLocation: true,
              PostedDate: true,
              organization: {
                select: {
                  OrganizationName: true,
                },
              },
            },
          });

          if (!job) {
            console.error("Job not found");
          } else {
            setJob({
              id: job.JobID,
              title: job.JobTitle,
              description: job.JobDescription,
              company: job.organization?.OrganizationName || "Unknown Company",
              location: job.JobAddressLocation,
              created_at: job.PostedDate.toISOString(),
            });
          }
        } catch (error) {
          console.error("Error fetching job:", error);
        }
      };
      fetchJob();
    }
  }, [slug]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Posted on: {new Date(job.created_at).toDateString()}</p>
      <button onClick={() => router.push(`/jobs/${job.id}/apply`)}>
        Apply
      </button>
    </div>
  );
};

export default JobPage;
