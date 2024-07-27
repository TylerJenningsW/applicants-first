import React, { useState } from "react";
import { useRouter } from "next/router";
import prisma from "../../../../../utils/prisma/prismaClient";

const ApplyPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [fullname, setFullname] = useState("");
  const [emailaddress, setEmailaddress] = useState("");
  const [alternateemailaddress, setAlternateEmailaddress] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [linkedinurl, setLinkedinurl] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const job = await prisma.job.findUnique({
        where: { Slug: slug as string },
        select: { JobID: true },
      });

      if (!job) {
        throw new Error("Job not found");
      }

      const applicant = await prisma.applicant.create({
        data: {
          fullname,
          emailaddress,
          alternateemailaddress,
          streetaddress,
          city,
          state,
          zipcode,
          country,
          linkedinurl,
          job_id: job.JobID,
        },
      });

      console.log("Applicant inserted:", applicant);
      router.push(`/jobs/${slug}`);
    } catch (error) {
      console.error("Error inserting applicant:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Full Name</label>
        <input
          type="text"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email Address</label>
        <input
          type="email"
          value={emailaddress}
          onChange={(e) => setEmailaddress(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Alternate Email Address</label>
        <input
          type="email"
          value={alternateemailaddress}
          onChange={(e) => setAlternateEmailaddress(e.target.value)}
        />
      </div>
      <div>
        <label>Street Address</label>
        <input
          type="text"
          value={streetaddress}
          onChange={(e) => setStreetaddress(e.target.value)}
        />
      </div>
      <div>
        <label>City</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label>State</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div>
        <label>Zip Code</label>
        <input
          type="text"
          value={zipcode}
          onChange={(e) => setZipcode(e.target.value)}
        />
      </div>
      <div>
        <label>Country</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <label>LinkedIn URL</label>
        <input
          type="text"
          value={linkedinurl}
          onChange={(e) => setLinkedinurl(e.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ApplyPage;