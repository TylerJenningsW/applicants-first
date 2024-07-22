import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../supabaseClient";

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
  const { slug } = router.query;
  const [job, setJob] = useState<Job | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch job details
  useEffect(() => {
    if (slug) {
      const fetchJob = async () => {
        const { data: job, error } = await supabase
          .from("jobs")
          .select("*")
          .eq("id", slug)
          .single();
        if (error) {
          console.error("Error fetching job:", error);
        } else {
          setJob(job);
        }
      };
      fetchJob();
    }
  }, [slug]);

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      const user = supabase.auth.user(); //    user authentication set up

      if (user) {
        const { data, error } = await supabase
          .from("applicant")
          .select("id, fullname, created_at, application_status, jobs(title)")
          .eq("emailaddress", user.email); //  email is used to link applicants to users

        if (error) {
          console.error("Error fetching applications:", error);
        } else {
          const formattedData = data.map((app: any) => ({
            ...app,
            job_title: app.jobs.title,
          }));
          setApplications(formattedData);
        }
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
