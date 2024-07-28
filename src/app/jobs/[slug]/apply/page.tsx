'use client'

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

const ApplyPage = () => {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
  const [fullname, setFullname] = useState("");
  const [emailaddress, setEmailaddress] = useState("");
  const [alternateemailaddress, setAlternateEmailaddress] = useState("");
  const [streetaddress, setStreetaddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [country, setCountry] = useState("");
  const [linkedinurl, setLinkedinurl] = useState("");
  const [jobId, setJobId] = useState<number | null>(null);

  useEffect(() => {
    const fetchJobId = async () => {
      const response = await fetch(`/api/jobs/${slug}`);
      if (response.ok) {
        const job = await response.json();
        setJobId(job.JobID);
      } else {
        console.error('Failed to fetch job');
      }
    };

    fetchJobId();
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobId) {
      console.error("Job ID not found");
      return;
    }

    try {
      const response = await fetch('/api/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname,
          emailaddress,
          alternateemailaddress,
          streetaddress,
          city,
          state,
          zipcode,
          country,
          linkedinurl,
          jobId,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Application submitted:", result);
        router.push(`/jobs/${slug}`);
      } else {
        throw new Error("Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
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
