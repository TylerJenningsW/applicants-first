![applicants-first-high-resolution-logo-transparent(1)](https://github.com/user-attachments/assets/31981b21-29ed-42d4-904d-a78d934ca038)
# Applicants First  
Applicants First is a human resource management web application.  
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# Current Features:
- Authentication - Login, confirm email, register 
- RBAC - Roles include Admin, Recruiter, and Applicant
- Admin Dashboard - Manage an organization.
- Recruiter Dashboard - Manage jobs.


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Supabase Setup
- Create a Supabase Project: Visit https://supabase.com/ and follow their instructions to create a new project.
- Database Setup: Use the Supabase dashboard to create the necessary tables and relationships for your application's data model.
- Environment Variables: Create a .env.local file in your project's root directory and add your Supabase connection details (URL and API key).
### Current Schemas:
```bash
CREATE TABLE applicant (
    applicantid serial,
    fullname text not null,
    emailaddress text not null,
    alternateemailaddress text null,
    streetaddress text null,
    city text null,
    state text null,
    zipcode text null,
    country text null,
    linkedinurl text null,
    uscitizen boolean null,
    educationlevel text null,
    specialty text null,
    dateaddedtodb date not null,
    constraint applicant_pkey primary key (applicantid)
  ) tablespace pg_default;
  
CREATE TABLE organization (
    OrganizationID SERIAL PRIMARY KEY,
    OrganizationName TEXT NOT NULL,
    CreationDate DATE NOT NULL,
    SubscriptionType TEXT,
    AccountStatus TEXT
);

CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  role TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  organization_id INTEGER REFERENCES organization(OrganizationID),
  is_locked_out BOOLEAN,
  creation_date DATE DEFAULT CURRENT_DATE,
  last_login_date DATE
);

CREATE TABLE invitations (
  id SERIAL PRIMARY KEY,
  email VARCHAR NOT NULL,
  token VARCHAR NOT NULL,
  organizationId INTEGER NOT NULL,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE Job (
  JobID SERIAL PRIMARY KEY,
  OrganizationID INTEGER REFERENCES Organization(OrganizationID),
  UserID INTEGER REFERENCES Profile(UserID),
  JobTitle VARCHAR(255) NOT NULL,
  JobAddressLocation VARCHAR(255) NOT NULL,
  PostedDate TIMESTAMP NOT NULL,
  JobSalary VARCHAR(255) NOT NULL,
  JobStatus VARCHAR(255) NOT NULL,
  CandidateResponseCount INTEGER NOT NULL,
  TotalApplicantsCount INTEGER NOT NULL,
  JobDescription TEXT NOT NULL,
  ApplicationDeadline TIMESTAMP NOT NULL
);
```
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn Supabase](https://supabase.com/docs) - learn how to work with Supabase.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
