import { GetServerSideProps } from "next";
import { supabase } from "supabaseClient";
import { useRouter } from "next/router";

interface Applicant {
  id: number;
  fullname: string;
  emailaddress: string;
  alternateemailaddress: string;
  streetaddress: string;
  city: string;
  state: string;
  zipcode: string;
  country: string;
  linkedinurl: string;
}

interface ApplicantPageProps {
  applicant: Applicant;
}

const ApplicantPage: React.FC<ApplicantPageProps> = ({ applicant }) => {
  if (!applicant) {
    return <div>Applicant not found</div>;
  }

  return (
    <div>
      <h1>{applicant.fullname}</h1>
      <p>Email: {applicant.emailaddress}</p>
      <p>Alternate Email: {applicant.alternateemailaddress}</p>
      <p>
        Address: {applicant.streetaddress}, {applicant.city}, {applicant.state},{" "}
        {applicant.zipcode}, {applicant.country}
      </p>
      <p>LinkedIn: {applicant.linkedinurl}</p>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.params as { slug: string };

  const { data: applicant, error } = await supabase
    .from("applicant")
    .select("*")
    .eq("id", slug)
    .single();

  if (error) {
    return { notFound: true };
  }

  return {
    props: {
      applicant,
    },
  };
};

export default ApplicantPage;
