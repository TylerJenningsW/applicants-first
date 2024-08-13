// 'use client'
// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import fetchJobs from './actions'

// const JobsPage = () => {
//   const [jobs, setJobs] = useState<any[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const getJobs = async () => {
//       const jobList = await fetchJobs()
//       setJobs(jobList)
//       setLoading(false)
//     }
//     getJobs()
//   }, [])

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Jobs</h1>
//       {loading ? (
//         <p>Loading jobs...</p>
//       ) : (
//         <div>
//           {jobs.map((job) => (
//             <div key={job.JobID} className="border p-4 mb-4 rounded">
//               <h2 className="text-xl font-bold">{job.JobTitle}</h2>
//               <p>{job.JobDescription}</p>
//               <p>Posted on: {new Date(job.PostedDate).toLocaleDateString()}</p>
//               <p>
//                 Company:{' '}
//                 {job.organization?.OrganizationName ||
//                   job.companyName ||
//                   'Unknown Company'}
//               </p>
//               <Link
//                 href={`/jobs/${job.Slug}`}
//                 className="text-blue-500 hover:underline"
//               >
//                 View Job
//               </Link>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default JobsPage
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import fetchJobs from './actions';

const JobsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const jobList = await fetchJobs(searchTerm);
      setJobs(jobList);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Fetch all jobs on initial load
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Jobs</h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search jobs"
          className="border p-2 w-full"
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div key={job.JobID} className="border p-4 mb-4 rounded">
                <h2 className="text-xl font-bold">{job.JobTitle}</h2>
                <p>{job.JobDescription}</p>
                <p>Posted on: {new Date(job.PostedDate).toLocaleDateString()}</p>
                <p>
                  Company:{' '}
                  {job.organization?.OrganizationName ||
                    job.CompanyName ||
                    'Unknown Company'}
                </p>
                <Link
                  href={`/jobs/${job.Slug}`}
                  className="text-blue-500 hover:underline"
                >
                  View Job
                </Link>
              </div>
            ))
          ) : (
            <p>No jobs found for "{searchTerm}"</p>
          )}
        </div>
      )}
    </div>
  );
};

export default JobsPage;
