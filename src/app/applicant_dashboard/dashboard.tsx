import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  createdAt: string;
}

interface Application {
  id: number;
  fullname: string;
  jobTitle: string;
  applicationStatus: string;
  createdAt: string;
}

const Dashboard = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch job details
  useEffect(() => {
    if (slug) {
      const fetchJob = async () => {
        try {
          const job = await prisma.job.findUnique({
            where: { id: Number(slug) },
          });
          setJob(job);
        } catch (error) {
          console.error("Error fetching job:", error);
        }
      };
      fetchJob();
    }
  }, [slug]);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const user = supabase.auth.user(); // Assuming you have user authentication set up

        if (user) {
          const applications = await prisma.application.findMany({
            where: { emailaddress: user.email },
            include: { job: true },
          });

          const formattedData = applications.map((app) => ({
            ...app,
            jobTitle: app.job.title,
          }));
          setApplications(formattedData);
        }
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
      setLoading(false);
    };

    fetchApplications();
  }, []);

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
          <p>Posted on: {new Date(job.createdAt).toDateString()}</p>
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
              <td>{application.jobTitle}</td>
              <td>{application.applicationStatus}</td>
              <td>{new Date(application.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
