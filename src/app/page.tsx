"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css"; // Import global styles

export default function Home() {
  return (
    <div className="container">
      {/* Navbar */}
      <header className="header">
        <div className="logo">
          <Image src="/images/Logo.png" alt="App Logo" width={40} height={40} />
          <h1 className="app-name">Applicants First</h1>
        </div>
        <nav className="nav-links">
          <Link href="/features">Features</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/faq">FAQ</Link>
          <Link href="/login">
            <button className="button">Log In</button>
          </Link>
          <Link href="/role-management">
            <button className="button">Join Now</button>
          </Link>
        </nav>
      </header>

      {/* Hero/Main Section */}
      <main className="main">
        <div className="hero-section">
          <h2 className="hero-heading">
            Streamline Your Hiring Process with Applicants First
          </h2>
          <p className="hero-subtext">
            Manage applicants, track performance, and onboard new employees with
            ease.
          </p>
          <div className="cta-buttons">
            <Link href="/login">
              <button className="cta-button">Log In</button>
            </Link>
            <Link href="/role-management">
              <button className="cta-button">Join Now</button>
            </Link>
          </div>
        </div>

        {/* Social Proof */}
        <div className="social-proof">
          <p>Trusted by top companies</p>
          <div className="company-logos">
            {/* Example Logos */}
            <Image
              src="/images/company1.png"
              alt="Company 1"
              width={100}
              height={50}
            />
            <Image
              src="/images/company2.png"
              alt="Company 2"
              width={100}
              height={50}
            />
            <Image
              src="/images/company3.png"
              alt="Company 3"
              width={100}
              height={50}
            />
          </div>
        </div>

        {/* Benefits Section */}
        <section className="benefits-section">
          <h3 className="section-heading">Why Choose Us?</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <h4>Fast & Easy</h4>
              <p>Post jobs, manage applicants, and hire in minutes.</p>
            </div>
            <div className="benefit-item">
              <h4>Automated Tracking</h4>
              <p>
                Track the status of each applicant through our intuitive
                dashboard.
              </p>
            </div>
            <div className="benefit-item">
              <h4>Customizable Workflow</h4>
              <p>
                Tailor the hiring process to fit your needs with powerful tools.
              </p>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="how-it-works">
          <h3 className="section-heading">How It Works</h3>
          <ul>
            <li>Sign up or log in to your account.</li>
            <li>Post a job and start receiving applications.</li>
            <li>
              Track and manage applicants efficiently through the dashboard.
            </li>
          </ul>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials">
          <h3 className="section-heading">What Our Clients Say</h3>
          <div className="testimonial-item">
            <p>
              "Applicants First helped us streamline our hiring process. It's a
              game-changer!"
            </p>
            <h4>- John Doe, CEO of Example Corp</h4>
          </div>
          <div className="testimonial-item">
            <p>"We reduced our time to hire by 40%. Highly recommended!"</p>
            <h4>- Jane Smith, HR Manager at Tech Co</h4>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="faq">
          <h3 className="section-heading">Frequently Asked Questions</h3>
          <div className="faq-item">
            <h4>How does Applicants First work?</h4>
            <p>
              Simply sign up, post jobs, and manage applicants through our
              easy-to-use dashboard.
            </p>
          </div>
          <div className="faq-item">
            <h4>What industries do you support?</h4>
            <p>
              Applicants First can be used by businesses of all sizes across a
              wide range of industries.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <p>&copy; 2024 Applicants First. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
