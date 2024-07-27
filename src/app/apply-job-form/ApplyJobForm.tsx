"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import "../styles/ApplyJobForm.css"; // Import the CSS file

const ApplyJobForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const nextStep = () => setStep((prevStep) => prevStep + 1);
  const prevStep = () => setStep((prevStep) => prevStep - 1);
  const goToHome = () => router.push("/applicant-dashboard");

  return (
    <>
      <header className="hiring-header1">
        <div className="hiring-logo1">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="hiring-app-name1">Applicants First</h1>
        </div>
        <div className="hiring-user-info1">
          <span>Hello, Applicant</span>
          <Link href="/hiring" legacyBehavior>
            <button className="back-button1">Back</button>
          </Link>
        </div>
      </header>

      <div className="apply-job-container">
        <header className="job-header">
          <h2>Software Engineer</h2>
          <div className="job-progress">
            <p>Step {step} of 4</p>
            <div
              className="progress-bar"
              style={{ width: `${(step - 1) * 33}%` }}
            ></div>
          </div>
        </header>
        <div className="form-content">
          {step === 1 && (
            <form>
              <label>Full Name</label>
              <input type="text" />
              <label>Email Address</label>
              <input type="email" />
              <label>Phone Number</label>
              <input type="text" />
              <label>Gender</label>
              <select>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <label>Employment Status</label>
              <div className="radio-group">
                <label className="radio-label">
                  Employed
                  <input
                    type="radio"
                    id="employed"
                    name="employment"
                    value="Employed"
                  />
                  <span className="checkmark"></span>
                </label>
                <label className="radio-label">
                  Unemployed
                  <input
                    type="radio"
                    id="unemployed"
                    name="employment"
                    value="Unemployed"
                  />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="form-buttons">
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 2 && (
            <form>
              <label>Resume</label>
              <input type="file" />
              <div className="form-buttons">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 3 && (
            <form>
              <label>Preferred Programming Language</label>
              <input type="text" />
              <label>Proficiency in English</label>
              <select>
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
                <option>Fluent</option>
              </select>
              <label>Do you have a Bachelor&apos;s Degree?</label>
              <div className="radio-group">
                <label className="radio-label">
                  Yes
                  <input type="radio" id="yes" name="degree" value="Yes" />
                  <span className="checkmark"></span>
                </label>
                <label className="radio-label">
                  No
                  <input type="radio" id="no" name="degree" value="No" />
                  <span className="checkmark"></span>
                </label>
              </div>
              <div className="form-buttons">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={nextStep}>
                  Next
                </button>
              </div>
            </form>
          )}
          {step === 4 && (
            <div>
              <div className="completed-application">
                <h3>Application Complete!</h3>
                <p>
                  Thank you for applying. We will review your application and
                  get back to you soon.
                </p>
              </div>

              <div className="form-buttons">
                <button type="button" onClick={prevStep}>
                  Back
                </button>
                <button type="button" onClick={goToHome}>
                  Finish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApplyJobForm;
