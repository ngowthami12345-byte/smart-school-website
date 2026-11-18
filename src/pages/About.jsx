
import "../App.css";
import "./About.css";

function About() {
  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span>GET TO KNOW US</span>
          <h1>About Our School</h1>
          <p>
            Inspiring young minds through knowledge,
            discipline and values.
          </p>
        </div>
      </section>

      <section className="about-main">
        <div className="about-main-image">
          <img
            src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=85"
            alt="School building"
          />
        </div>

        <div className="about-main-content">
          <span className="section-label">SRI VENKATESWARA HIGH SCHOOL</span>
          <h2>Education That Builds a Better Tomorrow</h2>

          <p>
            Welcome to Sri Venkateswara High School, Kodumur,
            Kurnool, Andhra Pradesh.
          </p>

          <p>
            We believe education is the foundation of a successful
            future. Our aim is to encourage students to learn,
            explore their talents and develop confidence.
          </p>

          <p>
            We focus on academic learning, discipline, good values
            and the overall development of every student.
          </p>
        </div>
      </section>

      <section className="about-mission">
        <div className="mission-card">
          <span>01</span>
          <h2>Our Vision</h2>
          <p>
            To inspire students to become confident, responsible
            and knowledgeable individuals.
          </p>
        </div>

        <div className="mission-card">
          <span>02</span>
          <h2>Our Mission</h2>
          <p>
            To provide a positive learning environment that
            supports knowledge, discipline and creativity.
          </p>
        </div>

        <div className="mission-card">
          <span>03</span>
          <h2>Our Values</h2>
          <p>
            To encourage respect, honesty, responsibility,
            teamwork and lifelong learning.
          </p>
        </div>
      </section>

      <section className="about-quote">
        <h2>Learning Today, Leading Tomorrow.</h2>
        <p>
          Every student has the potential to achieve something great.
        </p>
      </section>

      <section className="about-location">
        <span className="section-label">FIND OUR SCHOOL</span>
        <h2>Visit Us</h2>
        <p>
          Sri Venkateswara High School
          <br />
          Kodumur, Kurnool, Andhra Pradesh.
        </p>
      </section>
    </div>
  );
}

export default About;

