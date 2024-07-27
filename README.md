![applicants-first-high-resolution-logo-transparent(1)](https://github.com/user-attachments/assets/31981b21-29ed-42d4-904d-a78d934ca038)
# Applicants First  
Applicants First is a human resource management web application.  
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
# Current Features:
- Authentication - Login, confirm email, register 
- RBAC - Roles include Admin, Recruiter, and Applicant
- Admin Dashboard - Manage an organization.
- Recruiter Dashboard - Manage jobs.
test

## Technologies
- **Frontend**: [Next.js](https://nextjs.org/)
- **Backend**: Node.js, Next.js
- **Database**: Supabase (PostgreSQL)
- **APIs**: Supabase, Resend  

## Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/tylerjenningsw/applicants-first.git
    cd applicants-first
    ```

2. Install dependencies:
    ```bash
    npm install
    ```
3. Setup environment variables:
    Create a `.env.local` file in the root directory and add the following variables:
    ```bash
    NEXT_PUBLIC_SUPABASE_URL=<YOUR_URL>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<YOUR_KEY>
    DATABASE_URL=<YOUR_DB_URL>
    RESEND_API_KEY=<YOUR_RESEND_API_KEY>
    ```
4. Run the development server:
    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.  

## Development Setup
To set up the development environment:

1. Ensure you have Node.js and npm installed.
2. Follow the installation steps above.
3. Use the following command to compile and create an initial build:
    ```bash
    npm run build
    ```  


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

## Resend Setup  
- Create a resend account and follow the next.js quickstart guide [here](https://resend.com/docs/send-with-nextjs).
- You will need to modify any email function using your own DNS.  
## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Learn Supabase](https://supabase.com/docs) - learn how to work with Supabase.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!


## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.  

## Project Status
This project is currently in the Alpha stage. Features are being developed and tested.  

## Contributors
- **Tyler Jennings** - [GitHub](https://github.com/tylerjennings)
- **Juan Fuente** - [GitHub](https://github.com/Juan-Fuente)
- **Yoendris Rodriguez** - [GitHub](https://github.com/Yoendris97)

## License
This project is licensed under the MIT License. See the LICENSE file for details.

### Roadmap
- **Version 1.0**: Initial Alpha Release
- **Version 2.0**: Beta Release

### Support
For support, please reach out to our [GitHub Issues](https://github.com/tylerjenningsw/applicants-first/issues) page.

