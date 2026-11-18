
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToSchoolInfo = () => {
    navigate("/admin/school-information");
  };

  return (
    <div className="dashboard-layout">

      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-brand">
          <div className="dashboard-logo">SV</div>
          <div>
            <h2>SV SCHOOL</h2>
            <span>ADMIN PORTAL</span>
          </div>
        </div>

        <div className="sidebar-menu-title">MAIN MENU</div>

        <nav className="dashboard-nav">
          <a href="#overview" className="active">
            <span>▦</span> Dashboard
          </a>

          <a href="/admin/school-information" onClick={(e) => {
            e.preventDefault();
            goToSchoolInfo();
          }}>
            <span>▣</span> School Information
          </a>

          <a href="/admin/students" onClick={(e) => {
            e.preventDefault();
            navigate("/admin/students");
          }}>
            <span>♙</span> Students
          </a>

          <a href="/admin/teachers" onClick={(e) => {
            e.preventDefault();
            navigate("/admin/teachers");
          }}>
            <span>♧</span> Teachers
          </a>

          <a href="/admin/announcements" onClick={(e) => {
            e.preventDefault();
            navigate("/admin/announcements");
          }}>
            <span>☷</span> Announcements
          </a>
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-school-note">
            <span>SV</span>
            <p>
              SRI VENKATESWARA
              <small>HIGH SCHOOL</small>
            </p>
          </div>

          <button className="dashboard-logout" onClick={handleLogout}>
            <span>↪</span> Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-main">

        {/* HEADER */}
        <header className="dashboard-header">
          <div>
            <p>ADMINISTRATION / OVERVIEW</p>
            <h1>Dashboard</h1>
          </div>

          <div className="admin-profile">
            <div className="admin-avatar">A</div>
            <div>
              <strong>Administrator</strong>
              <span>School Admin</span>
            </div>
          </div>
        </header>

        {/* WELCOME */}
        <section className="dashboard-welcome" id="overview">
          <div className="welcome-content">
            <span>WELCOME TO THE ADMINISTRATION PORTAL</span>

            <h2>
              Empowering School
              <br />
              Management.
            </h2>

            <p>
              Access school information, manage student and
              faculty records, and stay connected with
              important school updates.
            </p>

            <button onClick={goToSchoolInfo}>
              Explore School Profile →
            </button>
          </div>

          <div className="welcome-decoration">SV</div>
        </section>

        {/* MANAGEMENT CARDS */}
        <section className="dashboard-section">
          <div className="section-heading">
            <div>
              <span>MANAGEMENT</span>
              <h2>School Overview</h2>
            </div>

          </div>

          <div className="dashboard-cards">

            {/* SCHOOL INFORMATION */}
            <article
              className="dashboard-card"
              onClick={goToSchoolInfo}
            >
              <div className="card-icon gold">▣</div>
              <h3>School Information</h3>
              <p>
                Maintain your school's profile, contact details
                and essential institutional information.
              </p>
              <span>Explore School Profile →</span>
            </article>

            {/* STUDENTS */}
            <article
              className="dashboard-card"
              onClick={() => navigate("/admin/students")}
            >
              <div className="card-icon blue">♙</div>
              <h3>Students</h3>
              <p>
                Organize student profiles, class-wise records
                and important academic information.
              </p>
              <span>Explore Student Records →</span>
            </article>

            {/* TEACHERS */}
            <article
              className="dashboard-card"
              onClick={() => navigate("/admin/teachers")}
            >
              <div className="card-icon green">♧</div>
              <h3>Teachers</h3>
              <p>
                Maintain faculty profiles, subject assignments
                and professional staff details.
              </p>
              <span>Explore Faculty Details →</span>
            </article>

            {/* ANNOUNCEMENTS */}
            <article
              className="dashboard-card"
              onClick={() => navigate("/admin/announcements")}
            >
              <div className="card-icon purple">☷</div>
              <h3>Announcements</h3>
              <p>
                Publish school notices, upcoming events
                and important announcements.
              </p>
              <span>Explore Announcements →</span>
            </article>

          </div>
        </section>

        {/* SCHOOL PROFILE */}
        <section className="dashboard-note" id="school-profile">
          <div>
            <span className="profile-label">SCHOOL DETAILS</span>
            <h3>School Profile</h3>
            <p>SRI VENKATESWARA HIGH SCHOOL</p>
            <span className="profile-address">
              Kodumur, Kurnool, Andhra Pradesh
            </span>
          </div>

          <div className="profile-status">
            <span>✓</span> School Information
          </div>
        </section>

        {/* FOOTER */}
        <footer className="dashboard-footer">
          © {new Date().getFullYear()} Sri Venkateswara High School.
          Admin Dashboard.
        </footer>

      </main>
    </div>
  );
}

export default AdminDashboard;




