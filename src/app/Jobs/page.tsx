'use client'
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import prisma from '../../../utils/prisma/prismaClient';
interface Job {
    JobID: number;
    JobTitle: string;
    JobDescription: string;
    Slug: string | null;
  }
  
const JobsPage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobs = await prisma.job.findMany({
          select: {
            JobID: true,
            JobTitle: true,
            JobDescription: true,
            Slug: true,
          },
        });
        setJobs(jobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.JobID} className="mb-4">
              <Link href={`/jobs/${job.Slug}`}>
                <a className="text-blue-600 hover:underline">
                  <h2 className="text-xl font-bold">{job.JobTitle}</h2>
                  <p>{job.JobDescription}</p>
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobsPage;
