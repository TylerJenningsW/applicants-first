"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import "./globals.css"; // Ensure your CSS is imported

export default function Home() {
  return (
    <html lang="en">
      <head>
        <title>Applicants First - Streamlining Your Hiring Process</title>
        <meta
          name="description"
          content="Applicants First is the HR management app designed to streamline your hiring process."
        />
      </head>
      <body>
        <div className="container">
          {/* Header Section */}
          <header className="header">
            <div className="logo">
              <Image
                src="/images/Logo.png"
                alt="App Logo"
                width={40}
                height={40}
              />
              <h1 className="app-name">Applicants First</h1>
            </div>
            <div className="top-buttons">
              <Link href="/login">
                <button className="button">Log In</button>
              </Link>
              <Link href="/role-management">
                <button className="button">Join Now</button>
              </Link>
            </div>
          </header>

          {/* Hero Section */}
          <section className="hero-section">
            <h1 className="hero-heading">Welcome to Applicants First</h1>
            <p className="hero-subtext">
              Streamline your hiring process with ease.
            </p>
            <div className="cta-buttons">
              <Link href="/login">
                <button className="cta-button">Log In</button>
              </Link>
              <Link href="/register">
                <button className="cta-button">Join Now</button>
              </Link>
            </div>
          </section>

          {/* Social Proof Section */}
          <section className="social-proof">
            <h3>Trusted by leading companies</h3>
            <div className="company-logos">
              <Image
                src="/images/company1.png"
                alt="Company 1"
                width={200}
                height={40}
              />
              <Image
                src="/images/company2.png"
                alt="Company 2"
                width={200}
                height={40}
              />
              <Image
                src="/images/company3.png"
                alt="Company 3"
                width={200}
                height={40}
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="benefits-section">
            <h2 className="section-heading">Features</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h4>Streamlined Application Process</h4>
                <p>
                  Make it easy for applicants to apply and for you to manage
                  applications.
                </p>
              </div>
              <div className="benefit-item">
                <h4>Track Applicant Progress</h4>
                <p>Monitor and track applicant progress with ease.</p>
              </div>
              <div className="benefit-item">
                <h4>Effortless Interview Scheduling</h4>
                <p>Easily manage and schedule interviews with an intuitive interface.</p>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials">
            <h2 className="section-heading">Testimonials</h2>
            <div className="testimonial-item">
              <p>"Applicants First transformed our hiring process!"</p>
              <h4>John Doe, CEO of Tech Corp</h4>
            </div>
            <div className="testimonial-item">
              <p>"We’ve reduced our time-to-hire by 30%!"</p>
              <h4>Jane Smith, HR Manager at StartUp</h4>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="faq">
            <h2 className="section-heading">Frequently Asked Questions</h2>
            <div className="faq-item">
              <h4>How does Applicants First help me?</h4>
              <p>
                It streamlines the hiring process, making it easier to manage
                applications.
              </p>
            </div>
            <div className="faq-item">
              <h4>How do I get started?</h4>
              <p>
                Click on "Join Now" to create an account and start managing your
                applicants.
              </p>
            </div>
          </section>

          {/* Footer */}
          <footer className="footer">
            <p>&copy; 2024 Applicants First. All rights reserved.</p>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms-of-service">Terms of Service</Link>
          </footer>
        </div>
      </body>
    </html>
  );
}
