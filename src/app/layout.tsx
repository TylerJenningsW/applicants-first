import React from "react";
import Image from "next/image";
import "./globals.css";

export const metadata = {
  title: "Applicants First",
  description: "Streamline your hiring process with Applicants First",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Global Header */}
        <header className="header">
          <div className="logo">
            <Image
              src="/images/Applicant.png"
              alt="Applicant Logo"
              width={280}
              height={90}
              style={{ width: "280px", height: "90px" }} // Image size set to 280x90
              priority
            />
          </div>
          <div className="top-buttons">
            <a href="/login" className="button">
              Log In
            </a>
            <a href="/role-management" className="button">
              Join Now
            </a>
          </div>
        </header>

        {/* Main content */}
        <main>{children}</main>

        {/* Global Footer */}
        <footer className="footer">
          <p>&copy; 2024 Applicants First. All rights reserved.</p>
          <a href="/privacy-policy" className="footer-link">
            Privacy Policy
          </a>
          <a href="/terms-of-service" className="footer-link">
            Terms of Service
          </a>
        </footer>
      </body>
    </html>
  );
}
