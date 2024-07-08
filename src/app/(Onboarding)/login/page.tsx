import { GetServerSideProps } from "next";
import { supabase } from "../../../supabaseClient";
import { useRouter } from "next/router";

interface Job {
  id: number;
  title: string;
  description: string;
  company: string;
  location: string;
  created_at: string;
}

interface JobPageProps {
  job: Job;
}

const JobPage: React.FC<JobPageProps> = ({ job }) => {
  const router = useRouter();

  const handleApplyClick = () => {
    router.push(`/jobs/${job.id}/apply`);
  };

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.description}</p>
      <p>Company: {job.company}</p>
      <p>Location: {job.location}</p>
      <p>Posted on: {new Date(job.created_at).toDateString()}</p>
      <button onClick={handleApplyClick}>Apply</button>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const { data: job, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", slug)
    .single();

  if (error) {
    return { notFound: true };
  }

  return {
    props: {
      job,
    },
  };
};

export default JobPage;
