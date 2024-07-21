import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "../../../supabaseClient";

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  created_at: string;
}

const JobPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [job, setJob] = useState<Job | null>(null);

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

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Posted on: {new Date(job.created_at).toDateString()}</p>
      <button onClick={() => router.push(`/Jobs/${job.id}/apply`)}>
        Apply
      </button>
    </div>
  );
};

export default JobPage;
