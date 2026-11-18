
import "./FeaturedTeachers.css";

const teachers = [
  {
    name: "PRIYANKA",
    subject: "Principal",
    experience: "5 Years",
    initial: "P",
    role: "PRINCIPAL",
  },
  {
    name: "MAMATHA",
    subject: "Science",
    experience: "3 Years",
    initial: "M",
    role: "FACULTY MEMBER",
  },
  {
    name: "SHIVA",
    subject: "Telugu",
    experience: "4 Years",
    initial: "S",
    role: "FACULTY MEMBER",
  },
  {
    name: "SANA",
    subject: "Maths",
    experience: "3 Years",
    initial: "S",
    role: "FACULTY MEMBER",
  },
  {
    name: "BHAVYASREE",
    subject: "English & General Knowledge",
    experience: "1 Year",
    qualification: "BCA, MCA",
    role: "FACULTY MEMBER",
    isBhavya: true,
  },
  {
    name: "MAHENDRA",
    subject: "Maths",
    experience: "3 Years",
    initial: "M",
    role: "FACULTY MEMBER",
  },
  {
    name: "SRAVANI",
    subject: "English",
    experience: "4 Years",
    initial: "S",
    role: "FACULTY MEMBER",
  },
];

function FeaturedTeachers() {
  return (
    <section className="teachers-section" id="teachers">
      <div className="teachers-heading">
        <span className="teachers-eyebrow">
          EXCELLENCE IN EDUCATION
        </span>

        <h2>Meet Our Faculty</h2>

        <p>
          Inspiring young minds through knowledge,
          dedication and a passion for teaching.
        </p>
      </div>

      <div className="teachers-grid">
        {teachers.map((teacher) => (
          <article
            className={
              teacher.isBhavya
                ? "teacher-card"
                : "teacher-card teacher-card-new"
            }
            key={teacher.name}
          >
            {teacher.isBhavya ? (
              <div className="teacher-photo">
                <img
                  src="/images/teacher-bhavyasree.jpg"
                  alt="Bhavyasree"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement.classList.add(
                      "photo-error"
                    );
                  }}
                />
              </div>
            ) : (
              <div className="teacher-photo teacher-initials">
                <span>{teacher.initial}</span>
              </div>
            )}

            <div className="teacher-info">
              <span className="teacher-role">
                {teacher.role}
              </span>

              <h3>{teacher.name}</h3>

              <p className="teacher-subject">
                {teacher.subject}
              </p>

              <div className="teacher-divider"></div>

              {teacher.qualification && (
                <div className="teacher-detail">
                  <span>Qualification</span>
                  <strong>{teacher.qualification}</strong>
                </div>
              )}

              <div className="teacher-detail">
                <span>Experience</span>
                <strong>{teacher.experience}</strong>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default FeaturedTeachers;
