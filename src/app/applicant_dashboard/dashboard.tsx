import { useEffect, useState } from "react";
import { getBrowserClient } from "../../../utils/supabase/supaBaseBrowserClient";
import prisma from "../../../utils/prisma/prismaClient";
import { useRouter } from "next/router";
interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  created_at: string;
}
interface Application {
  id: number;
  fullname: string;
  job_title: string;
  application_status: string;
  created_at: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { slug } = router.query as { slug: string };
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = getBrowserClient();

  useEffect(() => {
    const fetchApplications = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
        return;
      }

      if (user) {
        try {
          const applicants = await prisma.applicant.findMany({
            where: { emailaddress: user.email },
            select: {
              applicantid: true,
              fullname: true,
              dateaddedtodb: true,
              job: {
                select: {
                  JobTitle: true,
                },
              },
            },
          });

          const formattedData = applicants.map((applicant: any) => ({
            id: applicant.applicantid,
            fullname: applicant.fullname,
            job_title: applicant.job?.JobTitle || "Unknown Job",
            application_status: "Pending", // Replace with actual status if available
            created_at: applicant.dateaddedtodb.toISOString(),
          }));

          setApplications(formattedData);
        } catch (error) {
          console.error("Error fetching applications:", error);
        }
      }
      setLoading(false);
    };

    fetchApplications();
  }, [supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Applicant Dashboard</h1>

      {job && (
        <div>
          <h2>{job.title}</h2>
          <p>{job.description}</p>
          <p>Company: {job.company}</p>
          <p>Location: {job.location}</p>
          <p>Posted on: {new Date(job.created_at).toDateString()}</p>
          <button onClick={() => router.push(`/Jobs/${job.id}/apply`)}>
            Apply
          </button>
        </div>
      )}

      <h2>Your Applications</h2>
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Application Status</th>
            <th>Applied On</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((application) => (
            <tr key={application.id}>
              <td>{application.job_title}</td>
              <td>{application.application_status}</td>
              <td>{new Date(application.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;