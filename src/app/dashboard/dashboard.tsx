import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

interface Application {
  id: number;
  fullname: string;
  job_title: string;
  application_status: string;
  created_at: string;
}

const Dashboard = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApplications = async () => {
      const user = supabase.auth.user(); // Assuming you have user authentication set up

      if (user) {
        const { data, error } = await supabase
          .from("applicant")
          .select("id, fullname, created_at, application_status, jobs(title)")
          .eq("emailaddress", user.email); // assuming email is used to link applicants to users

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
