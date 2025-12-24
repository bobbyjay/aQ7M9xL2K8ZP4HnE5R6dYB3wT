
import React from "react";
import backIcon from "../assets/back.svg";
import { useNavigate } from "react-router-dom";
import "../styles/termsOfService.css";

const TermsOfService = () => {
  const navigate = useNavigate();

  return (
    <div className="tos-page">

      {/* HEADER */}
      <header className="tos-header">
        <button className="back-icon-btn" onClick={() => navigate(-1)}>
          <img src={backIcon} alt="Go back" className="back-icon-for-cutmsppt" />
        </button>
        <h1 className="tos-title">Terms of Service</h1>
      </header>

      {/* MAIN CONTENT */}
      <main className="tos-main">

        {/* INTRODUCTION */}
        <section className="tos-section">
          <h3 className="tos-effective">Effective Date: 2 September 2025</h3>

          <p>
            Welcome to <strong>Clutchden</strong> ("we", "our", or "us"). These Terms of Service govern your access to
            and use of our platform, products, services, and related content. By accessing or using Clutchden, you
            acknowledge that you have read, understood, and agree to be bound by these Terms.
          </p>

          <p>
            Clutchden is designed for sports enthusiasts who seek a reliable, data-driven environment for predictions,
            insights, and competitive engagement. Our platform emphasizes transparency, fairness, and responsible use.
          </p>

          <ol className="tos-outline">
            <li>Who We Are</li>
            <li>Age Requirements and Legal Guardianship</li>
            <li>User Accounts and Responsibilities</li>
            <li>Intellectual Property and Copyright</li>
            <li>Permitted Use of the Platform</li>
            <li>Terms, Suspension, and Termination</li>
            <li>Appeals and Dispute Resolution</li>
          </ol>
        </section>

        {/* WHO WE ARE */}
        <section className="tos-section">
          <h3>1. Who We Are</h3>
          <p>
            Clutchden is a digital sports prediction and analytics platform that provides users with tools, insights,
            and interactive features designed to enhance engagement with sporting events. We do not guarantee outcomes
            and do not promote irresponsible gaming behavior.
          </p>
        </section>

        {/* AGE REQUIREMENTS */}
        <section className="tos-section">
          <h3>2. Age Requirements and Legal Guardians</h3>
          <p>
            <strong>Last Updated:</strong> 2 September 2025
          </p>
          <p>
            You must be at least <strong>18 years of age</strong>, or the legal age of majority in your jurisdiction
            (whichever is higher), to access or use Clutchden. By creating an account, you represent and warrant that
            you meet this requirement.
          </p>
          <p>
            Users under the legal age are strictly prohibited from registering, submitting predictions, or engaging
            with any interactive features. Legal guardians are responsible for preventing unauthorized access.
          </p>
        </section>

        {/* USER ACCOUNTS */}
        <section className="tos-section">
          <h3>3. User Accounts and Responsibilities</h3>
          <p>
            When creating an account, you agree to provide accurate, current, and complete information. You are
            responsible for maintaining the confidentiality of your login credentials and for all activities
            conducted under your account.
          </p>
          <ul className="tos-list">
            <li>Maintain accurate and up-to-date account information</li>
            <li>Protect your account credentials</li>
            <li>Notify us immediately of unauthorized access</li>
            <li>Use the platform in compliance with applicable laws</li>
          </ul>
        </section>

        {/* COPYRIGHT */}
        <section className="tos-section">
          <h3>4. Intellectual Property and Copyright</h3>
          <p>
            All content available on Clutchden, including text, graphics, logos, software, analytics, predictions,
            and design elements, is the exclusive property of Clutchden or its licensors and is protected by
            international intellectual property laws.
          </p>
          <p>
            Unauthorized reproduction, distribution, modification, or public display of our content is strictly
            prohibited and may result in legal action.
          </p>
        </section>

        {/* PERMITTED USE */}
        <section className="tos-section">
          <h3>5. Permitted Use of the Platform</h3>
          <p>
            You may access and use Clutchden solely for personal, non-commercial purposes. You agree not to:
          </p>
          <ul className="tos-list">
            <li>Copy, resell, or redistribute platform content</li>
            <li>Use automated systems such as bots or scrapers</li>
            <li>Exploit data for commercial gain without authorization</li>
            <li>Interfere with platform security or integrity</li>
          </ul>
        </section>

        {/* TERMINATION */}
        <section className="tos-section">
          <h3>6. Terms, Suspension, and Termination</h3>
          <p>
            We reserve the right to suspend or terminate accounts that violate these Terms, applicable laws, or
            community standards. Termination may occur without prior notice in cases of serious misconduct.
          </p>
        </section>

        {/* APPEALS */}
        <section className="tos-section">
          <h3>7. Appeals and Dispute Resolution</h3>
          <p>
            If you believe a decision affecting your account was made in error, you may submit a written appeal
            within <strong>7–14 days</strong> of notification. Appeals must include relevant evidence and clear
            justification.
          </p>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="tos-footer">
        <p>© 2019 – 2025 Clutchden. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default TermsOfService;

