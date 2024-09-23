-- CreateTable
CREATE TABLE "public"."ApplicationStatus" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "jobApplicationId" INTEGER NOT NULL,

    CONSTRAINT "ApplicationStatus_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."JobApplication" (
    "id" SERIAL NOT NULL,
    "applicantId" INTEGER NOT NULL,
    "jobId" INTEGER NOT NULL,
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "JobApplication_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Applicant" (
    "applicantid" SERIAL NOT NULL,
    "profileId" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "emailaddress" TEXT NOT NULL,
    "alternateemailaddress" TEXT,
    "streetaddress" TEXT,
    "city" TEXT,
    "state" TEXT,
    "zipcode" TEXT,
    "country" TEXT,
    "linkedinurl" TEXT,
    "uscitizen" BOOLEAN,
    "educationlevel" TEXT,
    "parsedResume" JSONB,
    "resumeUrl" TEXT,
    "specialty" TEXT,
    "dateaddedtodb" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Applicant_pkey" PRIMARY KEY ("applicantid")
);

-- CreateTable
CREATE TABLE "public"."Organization" (
    "OrganizationID" SERIAL NOT NULL,
    "OrganizationName" TEXT NOT NULL,
    "CreationDate" TIMESTAMP(3) NOT NULL,
    "SubscriptionType" TEXT,
    "AccountStatus" TEXT,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("OrganizationID")
);

-- CreateTable
CREATE TABLE "public"."Profile" (
    "id" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "organization_id" INTEGER,
    "is_locked_out" BOOLEAN,
    "creation_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_login_date" TIMESTAMP(3),

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Invitations" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "organizationId" INTEGER NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invitations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Job" (
    "JobID" SERIAL NOT NULL,
    "OrganizationID" INTEGER,
    "UserID" TEXT NOT NULL,
    "JobTitle" TEXT NOT NULL,
    "JobAddressLocation" TEXT NOT NULL,
    "PostedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "JobSalary" TEXT NOT NULL,
    "JobStatus" TEXT NOT NULL,
    "CandidateResponseCount" INTEGER NOT NULL,
    "TotalApplicantsCount" INTEGER NOT NULL,
    "JobDescription" TEXT NOT NULL,
    "ApplicationDeadline" TIMESTAMP(3) NOT NULL,
    "Slug" TEXT,

    CONSTRAINT "Job_pkey" PRIMARY KEY ("JobID")
);

-- CreateIndex
CREATE UNIQUE INDEX "ApplicationStatus_jobApplicationId_key" ON "public"."ApplicationStatus"("jobApplicationId");

-- CreateIndex
CREATE UNIQUE INDEX "JobApplication_applicantId_jobId_key" ON "public"."JobApplication"("applicantId", "jobId");

-- CreateIndex
CREATE UNIQUE INDEX "Applicant_profileId_key" ON "public"."Applicant"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Job_Slug_key" ON "public"."Job"("Slug");

-- AddForeignKey
ALTER TABLE "public"."ApplicationStatus" ADD CONSTRAINT "ApplicationStatus_jobApplicationId_fkey" FOREIGN KEY ("jobApplicationId") REFERENCES "public"."JobApplication"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobApplication" ADD CONSTRAINT "JobApplication_applicantId_fkey" FOREIGN KEY ("applicantId") REFERENCES "public"."Applicant"("applicantid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."JobApplication" ADD CONSTRAINT "JobApplication_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "public"."Job"("JobID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Applicant" ADD CONSTRAINT "Applicant_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Profile" ADD CONSTRAINT "Profile_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "public"."Organization"("OrganizationID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Invitations" ADD CONSTRAINT "Invitations_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "public"."Organization"("OrganizationID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_OrganizationID_fkey" FOREIGN KEY ("OrganizationID") REFERENCES "public"."Organization"("OrganizationID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Job" ADD CONSTRAINT "Job_UserID_fkey" FOREIGN KEY ("UserID") REFERENCES "public"."Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
