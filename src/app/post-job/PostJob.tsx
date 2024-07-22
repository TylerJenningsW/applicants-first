'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getBrowserClient } from '../../../utils/supabase/supaBaseBrowserClient'


const PostJob: React.FC = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobAddressLocation, setJobAddressLocation] = useState('');
  const [jobSalary, setJobSalary] = useState('');
  const [applicationDeadline, setApplicationDeadline] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [organizationId, setOrganizationId] = useState<number | null>(null);
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const [jobUrl, setJobUrl] = useState('');
  const router = useRouter();
  const supabase = getBrowserClient();

  useEffect(() => {
    const getCurrentUser = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (error) {
        console.error('Error fetching user:', error);
      } else {
        setUserId(user?.id || '');
        // Fetch the user's profile and organization using an API call to your backend
        const profileResponse = await fetch(`/api/profile/${user?.id}`);
        const profileData = await profileResponse.json();
        setOrganizationId(profileData.organization_id);
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
        jobStatus: 'open',
        candidateResponseCount: 0,
        totalApplicantsCount: 0,
        applicationDeadline,
        organizationId: organizationId || undefined,
        companyName: companyName || undefined,
        userId,
      }),
    });

    setLoading(false);

    if (!response.ok) {
      console.error('Error posting job:', await response.text());
    } else {
      const { url } = await response.json();
      setJobUrl(url);
      console.log('Job posted successfully:', url);
      router.push('/recruiter-dashboard'); // Redirect to the dashboard after posting
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Post a New Job</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobTitle"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobDescription"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobAddressLocation"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="jobSalary"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="applicationDeadline"
          >
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
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Company Name (optional)
          </label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
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
      {jobUrl && (
        <div className="mt-4">
          <p className="text-green-600">Job posted successfully!</p>
          <p>
            View job:{' '}
            <a href={jobUrl} className="text-blue-600">
              {jobUrl}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default PostJob;