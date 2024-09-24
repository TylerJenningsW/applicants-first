


//Code with Filter and Sort Features 
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import fetchJobs from './actions';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';

interface Job {
  JobID: number;
  JobTitle: string;
  JobDescription: string;
  PostedDate: string;
  organization: {
    OrganizationName: string;
  };
  CompanyName?: string;
  Slug: string;
}

const columnHelper = createColumnHelper<Job>();
const JobsPage = () => {
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const handleSearch = async () => {
    setLoading(true);
    try {
      const jobList = await fetchJobs(searchTerm, sortBy);
      setJobs(jobList);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleSearch(); // Fetch all jobs on initial load
  }, [sortBy]);
  const columns = useMemo(
    () => [
      columnHelper.accessor('JobTitle', {
        header: 'Job Title',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor((row) => row.organization?.OrganizationName || row.CompanyName || 'Unknown Company', {
        id: 'company',
        header: 'Company',
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor('PostedDate', {
        header: 'Posted Date',
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      }),
      columnHelper.accessor('JobDescription', {
        header: 'Description',
        cell: (info) => info.getValue().substring(0, 100) + '...',
      }),
      columnHelper.accessor('Slug', {
        header: 'Actions',
        cell: (info) => (
          <Link href={`/jobs/${info.getValue()}`} className="text-blue-500 hover:text-blue-600 hover:underline transition-all duration-300">
            View Job
          </Link>
        ),
      }),
    ],
    []
  );

  const table = useReactTable({
    data: jobs,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="ml-4 border p-2 rounded"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="highestSalary">Highest Salary</option>
          <option value="lowestSalary">Lowest Salary</option>
        </select>
      </div>
      {loading ? (
        <p>Loading jobs...</p>
      ) : (
        <div className="overflow-x-auto">
        <table className="applicant-dashboard__table w-full border-collapse bg-gray-50">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="applicant-dashboard__table-header p-3 border border-gray-300 text-left bg-blue-500 text-white font-semibold">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="applicant-dashboard__table-cell p-3 border border-gray-300 text-left bg-white">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      )}
    </div>
  );
};

export default JobsPage;

