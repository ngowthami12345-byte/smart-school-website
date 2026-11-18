
import React from "react";
import { Link } from "react-router-dom";
import "./AdmissionProcess.css";

function AdmissionProcess() {
  return (
    <div className="admission-page">
      {/* HEADER */}
      <header className="admission-header">
        <div className="admission-brand">
          <h2>SRI VENKATESWARA</h2>
          <span>HIGH SCHOOL · KODUMUR</span>
        </div>

        <Link to="/" className="admission-home-link">
          ← Back to Home
        </Link>
      </header>

      {/* ADMISSION BANNER */}
      <section className="admission-hero">
        <div className="admission-hero-image">
          <img
            src="/images/admissions.png"
            alt="Admissions Are Now Open - Join Our School"
          />
        </div>

        <div className="admission-hero-content">
          <span className="admission-label">JOIN OUR SCHOOL</span>
          <h1>Admissions Are Now Open!</h1>
          <p>
            Give your child the opportunity to learn, grow
            and build a bright future with us.
          </p>
          <a href="tel:+919182909039" className="admission-call-button">
            Call for Admission Enquiry
          </a>
        </div>
      </section>

      {/* ADMISSION PROCESS */}
      <section className="admission-process-section">
        <div className="admission-section-heading">
          <span>HOW TO JOIN US</span>
          <h2>Admission Process</h2>
          <p>
            Take the first step towards your child's bright future.
          </p>
        </div>

        <div className="admission-steps">
          <article className="admission-step">
            <span>01</span>
            <h3>Contact Our School</h3>
            <p>
              Contact us by phone or visit our school to
              enquire about admissions.
            </p>
          </article>

          <article className="admission-step">
            <span>02</span>
            <h3>Visit the School</h3>
            <p>
              Visit the school and discuss class availability
              and admission details with our staff.
            </p>
          </article>

          <article className="admission-step">
            <span>03</span>
            <h3>Complete Admission</h3>
            <p>
              Follow the instructions provided by the school
              to complete the admission process.
            </p>
          </article>
        </div>
      </section>

      {/* DOCUMENTS */}
      <section className="admission-documents">
        <div>
          <span className="admission-label">BE PREPARED</span>
          <h2>Required Documents</h2>
          <p>
            Please contact the school to confirm the documents
            required for your child's admission.
          </p>
        </div>

        <a href="tel:+919182909039" className="admission-outline-button">
          Enquire About Documents
        </a>
      </section>

      {/* CONTACT */}
      <section className="admission-contact-section">
        <span>HAVE QUESTIONS?</span>
        <h2>We Are Here to Help!</h2>
        <p>
          Contact Sri Venkateswara High School for admission
          details and enquiries.
        </p>

        <a href="tel:+919182909039" className="admission-phone">
          +91 91829 09039
        </a>

        <p className="admission-address">
          Sri Venkateswara High School, Kodumur,
          Kurnool, Andhra Pradesh
        </p>

        <Link to="/" className="admission-back-button">
          Back to Home
        </Link>
      </section>

      {/* FOOTER */}
      <footer className="admission-footer">
        © {new Date().getFullYear()} Sri Venkateswara High School, Kodumur.
        All Rights Reserved.
      </footer>
    </div>
  );
}

export default AdmissionProcess;
