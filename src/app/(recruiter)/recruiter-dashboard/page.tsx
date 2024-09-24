// 'use client'
// import React, { useEffect, useState } from 'react'
// import { fetchJobs, initializePage } from './actions'
// import { useRouter } from 'next/navigation'
// import { getBrowserClient } from '../../../../utils/supabase/supaBaseBrowserClient'

// import Link from 'next/link'
// import '../../styles/RecruiterDashboard.css'
// interface Applicant {
//   applicantid: number
//   fullname: string
//   emailaddress: string
//   alternateemailaddress: string | null
//   streetaddress: string | null
//   city: string | null
//   state: string | null
//   zipcode: string | null
//   linkedinurl: string | null
//   uscitizen: boolean | null
//   parsedResume: any
//   resumeUrl: string | null
// }

// interface JobApplication {
//   id: number
//   applicant: Applicant
//   status: {
//     status: string
//   } | null
// }

// interface Job {
//   JobID: number
//   UserID: string
//   JobTitle: string
//   JobDescription: string
//   PostedDate: string | Date
//   Slug: string | null
//   OrganizationID: number | null
//   organization: {
//     OrganizationName: string
//   } | null
//   jobApplications: JobApplication[]
// }

// export default function RecruiterDashBoard() {
//   const [jobs, setJobs] = useState<Job[]>([])
//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(false)
//   const [user, setUser] = useState<any>(null)
//   const router = useRouter()
//   const updateApplicationStatus = async (
//     applicantId: number,
//     jobId: number,
//     status: string
//   ) => {
//     try {
//       const response = await fetch('/api/update-application-status', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ applicantId, jobId, status }),
//       })

//       if (response.ok) {
//         // Refresh the jobs list to show the updated status
//         await getJobs()
//       } else {
//         const data = await response.json()
//         alert(data.error || 'Failed to update application status')
//       }
//     } catch (error) {
//       console.error('Error updating application status:', error)
//       alert('An error occurred while updating the application status')
//     }
//   }
//   const getJobs = async () => {
//     setRefreshing(true)
//     const jobList = await fetchJobs()
//     setJobs(jobList)
//     setLoading(false)
//     setRefreshing(false)
//   }

//   useEffect(() => {
//     const init = async () => {
//       const [bool, user] = await initializePage()
//       if (bool) {
//         setUser(user)
//       } else {
//         router.push('/login')
//       }
//     }

//     init()
//     getJobs()
//   }, [])

//   const deleteJob = async (jobId: number, jobSlug: string | null) => {
//     if (!user) {
//       alert('You must be logged in to delete a job')
//       return
//     }

//     if (confirm('Are you sure you want to delete this job?')) {
//       try {
//         const response = await fetch(`/api/jobs/${jobSlug}`, {
//           method: 'DELETE',
//         })

//         if (response.ok) {
//           setJobs(jobs.filter((job) => job.JobID !== jobId))
//         } else {
//           const data = await response.json()
//           alert(data.error || 'Failed to delete job')
//         }
//       } catch (error) {
//         console.error('Error deleting job:', error)
//         alert('An error occurred while deleting the job')
//       }
//     }
//   }

//   const handleRefresh = () => {
//     getJobs()
//   }

//   if (loading) {
//     return <div>Loading jobs...</div>
//   }

//   return (
//     <>
//       <div className="container mx-auto p-0 min-w-full max-w-fullm-0">
//         <div className="flex justify-between items-center mb-4 p-4">
//           <h1 className="text-2xl font-bold">Recruiter Dashboard</h1>
//           <div>
//             <button
//               onClick={handleRefresh}
//               className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600"
//               disabled={refreshing}
//             >
//               {refreshing ? 'Refreshing...' : 'Refresh Jobs'}
//             </button>
//             <Link
//               href="/post-job"
//               className="bg-blue-500 text-white px-4 py-2 rounded inline-block hover:bg-blue-600"
//             >
//               Post a New Job
//             </Link>
//           </div>
//         </div>
//         {jobs.length === 0 ? (
//           <p className="p-4">You haven&apos;t posted any jobs yet.</p>
//         ) : (
//           <div className="p-0 m-0 w-full border rounded">
//             {jobs.map((job) => (
//               <div key={job.JobID} className="p-4 mb-4 mx-auto">
//                 <h2 className="text-xl font-bold">{job.JobTitle}</h2>
//                 <p>{job.JobDescription}</p>
//                 <p>
//                   Posted on: {new Date(job.PostedDate).toLocaleDateString()}
//                 </p>
//                 <p>
//                   Company:{' '}
//                   {job.organization?.OrganizationName || 'Unknown Company'}
//                 </p>
//                 <h3 className="font-bold mt-2">Applicants:</h3>
//                 {job.jobApplications && job.jobApplications.length > 0 ? (
//                   <ul>
//                     {job.jobApplications.map((app) => (
//                       <li key={app.id} className="mb-2 flex items-center">
//                         <span>
//                           {app.applicant.fullname} ({app.applicant.emailaddress}
//                           )
//                         </span>
//                         <Link
//                           href={`/recruiter-dashboard/applications/${app.applicant.applicantid}`}
//                           className="ml-2 text-blue-500 hover:underline"
//                         >
//                           View Full Application
//                         </Link>
//                         <span className="ml-2">
//                           Status: {app.status?.status || 'Pending'}
//                         </span>
//                         <button
//                           onClick={() =>
//                             updateApplicationStatus(
//                               app.applicant.applicantid,
//                               job.JobID,
//                               'approved'
//                             )
//                           }
//                           className="ml-2 bg-green-500 text-white px-2 py-1 rounded text-sm"
//                         >
//                           Approve
//                         </button>
//                         <button
//                           onClick={() =>
//                             updateApplicationStatus(
//                               app.applicant.applicantid,
//                               job.JobID,
//                               'denied'
//                             )
//                           }
//                           className="ml-2 bg-red-500 text-white px-2 py-1 rounded text-sm"
//                         >
//                           Deny
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p>No applicants yet</p>
//                 )}
//                 <div className="mt-4">
//                   <Link
//                     href={`recruiter-dashboard/jobs/${job.Slug}`}
//                     className="text-blue-500 hover:underline mr-4"
//                   >
//                     View Job
//                   </Link>
//                   {user &&
//                     (user.id === job.UserID ||
//                       user.role === 'Administrator') && (
//                       <button
//                         onClick={() => deleteJob(job.JobID, job.Slug)}
//                         className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                       >
//                         Delete Job
//                       </button>
//                     )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </>
//   )
// }



//Updated Code  with Table
// 'use client';

// import React, { useEffect, useState, useMemo } from 'react';
// import { fetchJobs, initializePage } from './actions';
// import { useRouter } from 'next/navigation';
// import { getBrowserClient } from '../../../../utils/supabase/supaBaseBrowserClient';

// import Link from 'next/link';
// import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
// import '../../styles/RecruiterDashboard.css'; // Import your new CSS file

// interface Applicant {
//   applicantid: number;
//   fullname: string;
//   emailaddress: string;
//   resumeUrl: string | null;
// }

// interface JobApplication {
//   id: number;
//   applicant: Applicant;
//   status: {
//     status: string;
//   } | null;
// }

// interface Job {
//   JobID: number;
//   UserID: string;
//   JobTitle: string;
//   JobDescription: string;
//   PostedDate: string | Date;
//   Slug: string | null;
//   organization: {
//     OrganizationName: string;
//   } | null;
//   jobApplications: JobApplication[];
// }

// export default function RecruiterDashBoard() {
//   const [jobs, setJobs] = useState<Job[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [user, setUser] = useState<any>(null);
//   const router = useRouter();

//   const getJobs = async () => {
//     setRefreshing(true);
//     const jobList = await fetchJobs();
//     setJobs(jobList);
//     setLoading(false);
//     setRefreshing(false);
//   };

//   useEffect(() => {
//     const init = async () => {
//       const [bool, user] = await initializePage();
//       if (bool) {
//         setUser(user);
//       } else {
//         router.push('/login');
//       }
//     };

//     init();
//     getJobs();
//   }, []);

//   const updateApplicationStatus = async (
//     applicantId: number,
//     jobId: number,
//     status: string
//   ) => {
//     try {
//       const response = await fetch('/api/update-application-status', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ applicantId, jobId, status }),
//       });

//       if (response.ok) {
//         await getJobs();
//       } else {
//         const data = await response.json();
//         alert(data.error || 'Failed to update application status');
//       }
//     } catch (error) {
//       console.error('Error updating application status:', error);
//       alert('An error occurred while updating the application status');
//     }
//   };

//   const deleteJob = async (jobId: number, jobSlug: string | null) => {
//     if (!user) {
//       alert('You must be logged in to delete a job');
//       return;
//     }

//     if (confirm('Are you sure you want to delete this job?')) {
//       try {
//         const response = await fetch(`/api/jobs/${jobSlug}`, {
//           method: 'DELETE',
//         });

//         if (response.ok) {
//           setJobs(jobs.filter((job) => job.JobID !== jobId));
//         } else {
//           const data = await response.json();
//           alert(data.error || 'Failed to delete job');
//         }
//       } catch (error) {
//         console.error('Error deleting job:', error);
//         alert('An error occurred while deleting the job');
//       }
//     }
//   };

//   const columns = useMemo<ColumnDef<Job>[]>(() => [
//     {
//       header: 'Job Title',
//       accessorKey: 'JobTitle',
//       className: 'recruiter-dashboard__table-header',
//     },
//     {
//       header: 'Company',
//       accessorFn: (row) => row.organization?.OrganizationName || 'Unknown Company',
//       className: 'recruiter-dashboard__table-header',
//     },
//     {
//       header: 'Posted Date',
//       accessorFn: (row) => new Date(row.PostedDate).toLocaleDateString(),
//       className: 'recruiter-dashboard__table-header',
//     },
//     {
//       header: 'Applicants',
//       cell: ({ row }) =>
//         row.original.jobApplications.length > 0 ? (
//           row.original.jobApplications.map((app) => (
//             <div key={app.applicant.applicantid} className="recruiter-dashboard__applicant">
//               <span>
//                 {app.applicant.fullname} ({app.applicant.emailaddress})
//               </span>
//               <Link
//                 href={`/recruiter-dashboard/applications/${app.applicant.applicantid}`}
//                 className="recruiter-dashboard__link"
//               >
//                 View Full Application
//               </Link>
//               <span className="recruiter-dashboard__status">
//                 Status: {app.status?.status || 'Pending'}
//               </span>
//               <div className="recruiter-dashboard__buttons">
//               <button
//                 onClick={() =>
//                   updateApplicationStatus(app.applicant.applicantid, row.original.JobID, 'approved')
//                 }
//                 className="recruiter-dashboard__button recruiter-dashboard__button--approve"
//               >
//                 Approve
//               </button>
//               <button
//                 onClick={() =>
//                   updateApplicationStatus(app.applicant.applicantid, row.original.JobID, 'denied')
//                 }
//                 className="recruiter-dashboard__button recruiter-dashboard__button--deny"
//               >
//                 Deny
//               </button>
//               </div>
              
//             </div>
//           ))
//         ) : (
//           'No Applicants'
//         ),
//     },
//     {
//       header: 'Actions',
//       cell: ({ row }) => (
//         <div className="recruiter-dashboard__actions">
//           <Link
//             href={`recruiter-dashboard/jobs/${row.original.Slug}`}
//             className="recruiter-dashboard__link"
//           >
//             View Job
//           </Link>
//           {user && (user.id === row.original.UserID || user.role === 'Administrator') && (
//             <button
//               onClick={() => deleteJob(row.original.JobID, row.original.Slug)}
//               className="recruiter-dashboard__button recruiter-dashboard__button--delete"
//             >
//               Delete Job
//             </button>
//           )}
//         </div>
//       ),
//     },
//   ], [user]);

//   const table = useReactTable({
//     data: jobs,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//   });

//   if (loading) {
//     return <div>Loading jobs...</div>;
//   }

//   return (
//     <div className="recruiter-dashboard__container">
//       <div className="recruiter-dashboard__header">
//         <h1 className="recruiter-dashboard__title">Recruiter Dashboard</h1>
//         <div>
//           <button
//             onClick={getJobs}
//             className="recruiter-dashboard__button recruiter-dashboard__button--refresh"
//             disabled={refreshing}
//           >
//             {refreshing ? 'Refreshing...' : 'Refresh Jobs'}
//           </button>
//           <Link
//             href="/post-job"
//             className="recruiter-dashboard__button recruiter-dashboard__button--post-job"
//           >
//             Post a New Job
//           </Link>
//         </div>
//       </div>

//       {jobs.length === 0 ? (
//         <p className="recruiter-dashboard__message">You haven&apos;t posted any jobs yet.</p>
//       ) : (
//         <table className="recruiter-dashboard__table">
//           <thead>
//             {table.getHeaderGroups().map((headerGroup) => (
//               <tr key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => (
//                   <th key={header.id} className="recruiter-dashboard__table-header">
//                     {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
//                   </th>
//                 ))}
//               </tr>
//             ))}
//           </thead>
//           <tbody>
//             {table.getRowModel().rows.map((row) => (
//               <tr key={row.id}>
//                 {row.getVisibleCells().map((cell) => (
//                   <td key={cell.id} className="recruiter-dashboard__table-cell">
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </td>
//                 ))}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }


//Updated code with Modal
'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { fetchJobs, initializePage } from './actions';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '../../../../utils/supabase/supaBaseBrowserClient';
import Modal from 'react-modal';
import Link from 'next/link';
import { useReactTable, getCoreRowModel, flexRender, ColumnDef } from '@tanstack/react-table';
import '../../styles/RecruiterDashboard.css'; 
import PostJob from '../../post-job/PostJob'; // Import the PostJob component

interface Applicant {
  applicantid: number;
  fullname: string;
  emailaddress: string;
  resumeUrl: string | null;
}

interface JobApplication {
  id: number;
  applicant: Applicant;
  status: {
    status: string;
  } | null;
}

interface Job {
  JobID: number;
  UserID: string;
  JobTitle: string;
  JobDescription: string;
  PostedDate: string | Date;
  Slug: string | null;
  organization: {
    OrganizationName: string;
  } | null;
  jobApplications: JobApplication[];
}

export default function RecruiterDashBoard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const router = useRouter();

  const getJobs = async () => {
    setRefreshing(true);
    const jobList = await fetchJobs();
    setJobs(jobList);
    setLoading(false);
    setRefreshing(false);
  };

  useEffect(() => {
    const init = async () => {
      const [bool, user] = await initializePage();
      if (bool) {
        setUser(user);
      } else {
        router.push('/login');
      }
    };

    init();
    getJobs();
  }, []);

  const updateApplicationStatus = async (applicantId: number, jobId: number, status: string) => {
    try {
      const response = await fetch('/api/update-application-status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ applicantId, jobId, status }),
      });

      if (response.ok) {
        await getJobs();
      } else {
        const data = await response.json();
        alert(data.error || 'Failed to update application status');
      }
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('An error occurred while updating the application status');
    }
  };

  const deleteJob = async (jobId: number, jobSlug: string | null) => {
    if (!user) {
      alert('You must be logged in to delete a job');
      return;
    }

    if (confirm('Are you sure you want to delete this job?')) {
      try {
        const response = await fetch(`/api/jobs/${jobSlug}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setJobs(jobs.filter((job) => job.JobID !== jobId));
        } else {
          const data = await response.json();
          alert(data.error || 'Failed to delete job');
        }
      } catch (error) {
        console.error('Error deleting job:', error);
        alert('An error occurred while deleting the job');
      }
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleJobPosted = async () => {
    await getJobs();
    closeModal(); // Close the modal after posting the job
  };

  const columns = useMemo<ColumnDef<Job>[]>(() => [
    {
      header: 'Job Title',
      accessorKey: 'JobTitle',
      className: 'recruiter-dashboard__table-header',
    },
    {
      header: 'Company',
      accessorFn: (row) => row.organization?.OrganizationName || 'Unknown Company',
      className: 'recruiter-dashboard__table-header',
    },
    {
      header: 'Posted Date',
      accessorFn: (row) => new Date(row.PostedDate).toLocaleDateString(),
      className: 'recruiter-dashboard__table-header',
    },
    {
      header: 'Applicants',
      cell: ({ row }) =>
        row.original.jobApplications.length > 0 ? (
          row.original.jobApplications.map((app) => (
            <div key={app.applicant.applicantid} className="recruiter-dashboard__applicant">
              <span>
                {app.applicant.fullname} ({app.applicant.emailaddress})
              </span>
              <Link
                href={`/recruiter-dashboard/applications/${app.applicant.applicantid}`}
                className="recruiter-dashboard__link"
              >
                View Full Application
              </Link>
              <span className="recruiter-dashboard__status">
                Status: {app.status?.status || 'Pending'}
              </span>
              <div className="recruiter-dashboard__buttons">
                <button
                  onClick={() =>
                    updateApplicationStatus(app.applicant.applicantid, row.original.JobID, 'approved')
                  }
                  className="recruiter-dashboard__button recruiter-dashboard__button--approve"
                >
                  Approve
                </button>
                <button
                  onClick={() =>
                    updateApplicationStatus(app.applicant.applicantid, row.original.JobID, 'denied')
                  }
                  className="recruiter-dashboard__button recruiter-dashboard__button--deny"
                >
                  Deny
                </button>
              </div>
            </div>
          ))
        ) : (
          'No Applicants'
        ),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="recruiter-dashboard__actions flex justify-end space-x-4" >
          <Link
      href={`recruiter-dashboard/jobs/${row.original.Slug}`}
      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300"
    >
      View Job
    </Link>
          {user && (user.id === row.original.UserID || user.role === 'Administrator') && (
           <button
           onClick={() => deleteJob(row.original.JobID, row.original.Slug)}
           className="text-red-500 hover:underline bg-transparent"
         >
           Delete Job
         </button>
          )}
        </div>
      ),
    },
  ], [user]);

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  return (
    <div className="recruiter-dashboard__container">
      <div className="recruiter-dashboard__header">
        <h1 className="recruiter-dashboard__title">Recruiter Dashboard</h1>
        <div>
          <button
            onClick={getJobs}
            className="recruiter-dashboard__button recruiter-dashboard__button--refresh"
            disabled={refreshing}
          >
            {refreshing ? 'Refreshing...' : 'Refresh Jobs'}
          </button>
          <button
            onClick={openModal} // Open modal on click
            className="recruiter-dashboard__button recruiter-dashboard__button--post-job"
          >
            Post a New Job
          </button>
        </div>
      </div>

      {jobs.length === 0 ? (
        <p className="recruiter-dashboard__message">You haven&apos;t posted any jobs yet.</p>
      ) : (
        <table className="recruiter-dashboard__table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="recruiter-dashboard__table-header">
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="recruiter-dashboard__table-cell">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        {/* <h2 className="modal-header">Post a New Job</h2> */}
        <PostJob onJobPosted={handleJobPosted} onClose={closeModal} /> {/* Pass the required props */}
        {/* <button onClick={closeModal} className="modal-close-button">Close</button> */}
      </Modal>
    </div>
  );
}
