
import { useState } from "react";
import "./App.css";
import "./Contact.css";
import FeaturedTeachers from "./components/FeaturedTeachers";
import Gallery from "./components/Gallery";
import { Link } from "react-router-dom";

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="school-website">
      {/* HEADER */}
      <header className="site-header">
        <a href="#home" className="school-brand" onClick={closeMenu}>
          <div className="school-logo">
            <img
              src="/images/school-logo.jpeg"
              alt="Sri Venkateswara High School Logo"
              className="school-logo-image"
            />
          </div>

          <div className="school-brand-text">
            <h2>SRI VENKATESWARA</h2>
            <span>HIGH SCHOOL · KODUMUR</span>
          </div>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`main-navigation ${menuOpen ? "menu-open" : ""}`}>
          <a href="#home" onClick={closeMenu}>Home</a>
          <a href="#about" onClick={closeMenu}>About Us</a>
          <a href="#teachers" onClick={closeMenu}>Teachers</a>
          <a href="#gallery" onClick={closeMenu}>Gallery</a>
          <a href="#facilities" onClick={closeMenu}>Facilities</a>
          <a href="#bus-facility" onClick={closeMenu}>Bus Facility</a>
          <a href="#admissions" onClick={closeMenu}>Admissions</a>
          <a href="#contact" onClick={closeMenu}>Contact</a>
          <Link to="/login" className="admin-link" onClick={closeMenu}>
            Admin Login
          </Link>
        </nav>
      </header>

      <main>
        {/* HERO */}
        <section className="hero-section" id="home">
          <div className="hero-content">
            <span className="hero-tag">WELCOME TO OUR SCHOOL</span>
            <h1>
              Knowledge Today.
              <br />
              <span>Success Tomorrow.</span>
            </h1>
            <p>
              Building knowledge, confidence and character
              for a brighter future.
            </p>
            <div className="hero-buttons">
              <a href="#about" className="primary-button">
                Discover Our School
              </a>
              <a href="#contact" className="secondary-button">
                Contact Us
              </a>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="highlights-section">
          <div className="highlight-item">
            <span>01</span>
            <div>
              <h3>Academic Excellence</h3>
              <p>Building strong knowledge and a foundation for success.</p>
            </div>
          </div>
          <div className="highlight-item">
            <span>02</span>
            <div>
              <h3>Holistic Development</h3>
              <p>Encouraging creativity, discipline and confidence.</p>
            </div>
          </div>
          <div className="highlight-item">
            <span>03</span>
            <div>
              <h3>Future Ready Students</h3>
              <p>Preparing young minds for tomorrow's opportunities.</p>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="about-section section-space" id="about">
          <div className="about-image">
            <img
              src="https://santhomepublication.com/assets/img/ak/about-2.png"
              alt="Students reading and learning at school"
            />
          </div>
          <div className="about-content">
            <span className="section-label">ABOUT OUR SCHOOL</span>
            <h2>A Place to Learn, Grow and Succeed</h2>
            <p>
              Welcome to Sri Venkateswara High School, Kodumur.
              We believe that every student deserves an opportunity
              to learn, develop confidence and achieve their goals.
            </p>
            <p>
              Our aim is to support students through education,
              discipline, creativity and positive values.
            </p>
            <a href="#contact" className="text-link">Get in Touch →</a>
          </div>
        </section>

        {/* TEACHERS */}
        <FeaturedTeachers />

        {/* GALLERY */}
        <Gallery />

        {/* FACILITIES */}
        <section className="facilities-section section-space" id="facilities">
          <div className="section-heading">
            <span className="section-label">OUR COMMITMENT</span>
            <h2>Learning Beyond Classrooms</h2>
            <p>
              Creating a positive learning environment that
              encourages knowledge, creativity and confidence.
            </p>
          </div>
          <div className="facility-grid">
            <article className="facility-card">
              <div className="facility-icon">01</div>
              <span className="facility-tag">ACADEMICS</span>
              <h3>Quality Education</h3>
              <p>
                Building strong academic foundations through
                dedicated teaching and meaningful learning.
              </p>
            </article>
            <article className="facility-card">
              <div className="facility-icon">02</div>
              <span className="facility-tag">CREATIVITY</span>
              <h3>Practical Learning</h3>
              <p>
                Encouraging curiosity, creative thinking and
                active participation in learning activities.
              </p>
            </article>
            <article className="facility-card">
              <div className="facility-icon">03</div>
              <span className="facility-tag">EXTRACURRICULAR</span>
              <h3>Sports & Activities</h3>
              <p>
                Developing teamwork, discipline and confidence
                through sports and student activities.
              </p>
            </article>
            <article className="facility-card">
              <div className="facility-icon">04</div>
              <span className="facility-tag">PERSONAL GROWTH</span>
              <h3>Student Development</h3>
              <p>
                Encouraging good values, communication skills
                and responsibility for a brighter future.
              </p>
            </article>
          </div>
        </section>

        {/* BUS FACILITY */}
        <section className="bus-section section-space" id="bus-facility">
          <div className="bus-image">
            <img
              src="/images/school-bus.png"
              alt="Sri Venkateswara High School bus"
            />
          </div>
          <div className="bus-content">
            <span className="section-label">STUDENT TRANSPORT</span>
            <h2>Safe and Convenient Bus Facility</h2>
            <p>
              Sri Venkateswara High School provides bus facility
              for students, helping make their daily journey to
              and from school convenient.
            </p>
            <p>
              For bus facility details and transportation enquiries,
              please contact our school.
            </p>
            <a href="tel:+919182909039" className="bus-call-button">
              Call for Bus Enquiry
            </a>
          </div>
        </section>

        {/* ADMISSIONS */}
        <section className="admissions-section" id="admissions">
          <div className="admissions-image">
            <img
              src="/images/admissions.gif"
              alt="Admissions Are Now Open - Join Our School"
            />
          </div>
          <div className="admissions-content">
            <span className="admissions-label">JOIN OUR SCHOOL</span>
            <h2 className="admissions-blink">
              ADMISSIONS ARE NOW OPEN!
            </h2>
            <h3>Give Your Child a Bright Future</h3>
            <p>
              Looking for the right school for your child?
              Contact Sri Venkateswara High School for admission
              details and enquiries.
            </p>
            <div className="admissions-phone">
              <span>ADMISSIONS ENQUIRY</span>
              <strong>+91 91829 09039</strong>
            </div>
            <div className="admissions-buttons">
              <a href="tel:+919182909039" className="admissions-call-button">
                ☎ Call Now
              </a>
              <Link to="/admission-process" className="admission-process-button">
                View Admission Process →
              </Link>
            </div>
          </div>
        </section>

        {/* CONTACT BANNER */}
        <section className="contact-banner">
          <div>
            <span>YOUR CHILD'S FUTURE MATTERS</span>
            <h2>Let's Build a Brighter Future Together.</h2>
          </div>
          <a href="#contact" className="contact-banner-button">
            Contact Our School
          </a>
        </section>

        {/* CONTACT */}
        <section className="contact-section section-space" id="contact">
          <div className="contact-heading">
            <span className="section-label">CONTACT US</span>
            <h2>We Would Love to Hear From You</h2>
            <p>
              For school-related enquiries, please contact or visit us.
            </p>
          </div>
          <div className="contact-cards">
            <article className="contact-detail-card">
              <span className="contact-symbol">⌖</span>
              <h3>Our Location</h3>
              <p>Sri Venkateswara High School</p>
              <p>Kodumur, Kurnool, Andhra Pradesh</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=Sri+Venkateswara+High+School+Kodumur+Kurnool+Andhra+Pradesh"
                target="_blank"
                rel="noreferrer"
              >
                View on Google Maps →
              </a>
            </article>
            <article className="contact-detail-card">
              <span className="contact-symbol">☎</span>
              <h3>Phone Number</h3>
              <p>School Enquiries</p>
              <a href="tel:+919182909039">+91 91829 09039</a>
            </article>
            <article className="contact-detail-card">
              <span className="contact-symbol">✉</span>
              <h3>Email Address</h3>
              <p>Send us your enquiries</p>
              <a href="mailto:svhs@gmail.com">svhs@gmail.com</a>
            </article>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="site-footer">
        <div className="footer-brand">
          <div className="school-logo footer-logo">
            <img
              src="/images/school-logo.jpeg"
              alt="Sri Venkateswara High School Logo"
              className="school-logo-image"
            />
          </div>
          <div>
            <h3>SRI VENKATESWARA HIGH SCHOOL</h3>
            <p>Kodumur, Kurnool, Andhra Pradesh</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Sri Venkateswara High School.
            All rights reserved.
          </p>
          <p className="developer-credit">
            Designed & Developed by Gowthami Nimmagalla | Nandyal
            <span>Smart School Website</span>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

