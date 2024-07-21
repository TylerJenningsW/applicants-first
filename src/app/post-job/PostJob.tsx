// /components/PostJob.tsx
"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getBrowserClient } from '../../../utils/supabase/supaBaseBrowserClient';

const PostJob: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobAddressLocation, setJobAddressLocation] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [jobStatus, setJobStatus] = useState('');
  const [candidateResponseCount, setCandidateResponseCount] = useState(0);
  const [totalApplicantsCount, setTotalApplicantsCount] = useState(0);
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [organizationId, setOrganizationId] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = getBrowserClient();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(user?.id || '');
      }
    };
    getCurrentUser();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/post-job', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jobTitle,
        jobDescription,
        jobAddressLocation,
        jobSalary,
        jobStatus,
        candidateResponseCount,
        totalApplicantsCount,
        applicationDeadline,
        organizationId,
        userId,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      console.error('Error posting job:', await response.text());
    } else {
      console.log('Job posted successfully:', await response.json());
      router.push('/recruiter-dashboard'); // Redirect to the dashboard after posting
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobTitle">
            Job Title
          </label>
          <input
            type="text"
            id="jobTitle"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobDescription">
            Job Description
          </label>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobAddressLocation">
            Job Address Location
          </label>
          <input
            type="text"
            id="jobAddressLocation"
            value={jobAddressLocation}
            onChange={(e) => setJobAddressLocation(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobSalary">
            Job Salary
          </label>
          <input
            type="text"
            id="jobSalary"
            value={jobSalary}
            onChange={(e) => setJobSalary(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="jobStatus">
            Job Status
          </label>
          <input
            type="text"
            id="jobStatus"
            value={jobStatus}
            onChange={(e) => setJobStatus(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="candidateResponseCount">
            Candidate Response Count
          </label>
          <input
            type="number"
            id="candidateResponseCount"
            value={candidateResponseCount}
            onChange={(e) => setCandidateResponseCount(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="totalApplicantsCount">
            Total Applicants Count
          </label>
          <input
            type="number"
            id="totalApplicantsCount"
            value={totalApplicantsCount}
            onChange={(e) => setTotalApplicantsCount(parseInt(e.target.value))}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="applicationDeadline">
            Application Deadline
          </label>
          <input
            type="datetime-local"
            id="applicationDeadline"
            value={applicationDeadline}
            onChange={(e) => setApplicationDeadline(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="organizationId">
            Organization ID
          </label>
          <input
            type="text"
            id="organizationId"
            value={organizationId}
            onChange={(e) => setOrganizationId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
};

export default PostJob;
