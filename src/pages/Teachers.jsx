
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Teachers.css";

const API = "http://localhost:5000/api/teachers";
const SERVER = "http://localhost:5000";

function Teachers() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const emptyForm = {
    name: "",
    employeeId: "",
    subject: "",
    qualification: "",
    phone: "",
    email: "",
  };

  const [form, setForm] = useState(emptyForm);
  const [teachers, setTeachers] = useState([]);
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  const fetchTeachers = async () => {
    try {
      const response = await axios.get(API, { headers });
      setTeachers(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load teachers.");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchTeachers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowed = ["image/jpeg", "image/png", "image/webp"];

    if (!allowed.includes(file.type)) {
      setError("Please select a JPG, PNG or WEBP image.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setError("Photo size must be less than 2 MB.");
      e.target.value = "";
      return;
    }

    setError("");
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setPhotoFile(null);
    setPhotoPreview("");
    setEditingId(null);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        data.append(key, value);
      });

      if (photoFile) {
        data.append("photo", photoFile);
      }

      if (editingId) {
        await axios.put(`${API}/${editingId}`, data, { headers });
      } else {
        await axios.post(API, data, { headers });
      }

      resetForm();
      await fetchTeachers();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (teacher) => {
    setEditingId(teacher._id);
    setForm({
      name: teacher.name || "",
      employeeId: teacher.employeeId || "",
      subject: teacher.subject || "",
      qualification: teacher.qualification || "",
      phone: teacher.phone || "",
      email: teacher.email || "",
    });

    setPhotoFile(null);
    setPhotoPreview(
      teacher.photo ? `${SERVER}${teacher.photo}` : ""
    );

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teacher?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`${API}/${id}`, { headers });
      await fetchTeachers();

      if (editingId === id) resetForm();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete teacher.");
    }
  };

  const filteredTeachers = teachers.filter((teacher) =>
    [
      teacher.name,
      teacher.employeeId,
      teacher.subject,
      teacher.email,
    ]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="teachers-page">
      <header className="teachers-header">
        <div>
          <p className="teachers-eyebrow">SRI VENKATESWARA HIGH SCHOOL</p>
          <h1>Teacher Management</h1>
          <p className="teachers-subtitle">
            Manage your school's teaching staff and profiles.
          </p>
        </div>

        <button
          className="back-dashboard-btn"
          onClick={() => navigate("/admin")}
        >
          ← Dashboard
        </button>
      </header>

      <section className="teacher-stats">
        <div className="teacher-stat-card">
          <span>Total Teachers</span>
          <strong>{teachers.length}</strong>
          <small>Registered teaching staff</small>
        </div>

        <div className="teacher-stat-card">
          <span>Subjects</span>
          <strong>
            {new Set(teachers.map((teacher) => teacher.subject)).size}
          </strong>
          <small>Unique subjects</small>
        </div>
      </section>

      <section className="teacher-form-card">
        <div className="teacher-section-heading">
          <div>
            <span className="section-kicker">
              {editingId ? "UPDATE PROFILE" : "STAFF DETAILS"}
            </span>
            <h2>{editingId ? "Edit Teacher" : "Add New Teacher"}</h2>
          </div>
          <span className="form-icon">✦</span>
        </div>

        {error && <div className="teacher-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="teacher-photo-upload">
            <div className="teacher-photo-preview">
              {photoPreview ? (
                <img src={photoPreview} alt="Teacher preview" />
              ) : (
                <span>Photo</span>
              )}
            </div>

            <div className="photo-upload-info">
              <label htmlFor="teacher-photo">Teacher Photo</label>
              <input
                id="teacher-photo"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhoto}
              />
              <small>JPG, PNG or WEBP · Maximum 2 MB</small>
            </div>
          </div>

          <div className="teacher-form-grid">
            <div className="teacher-field">
              <label>Teacher Name *</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter teacher name"
                required
              />
            </div>

            <div className="teacher-field">
              <label>Employee ID *</label>
              <input
                name="employeeId"
                value={form.employeeId}
                onChange={handleChange}
                placeholder="Example: TCH001"
                required
              />
            </div>

            <div className="teacher-field">
              <label>Subject *</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                placeholder="Example: Mathematics"
                required
              />
            </div>

            <div className="teacher-field">
              <label>Qualification *</label>
              <input
                name="qualification"
                value={form.qualification}
                onChange={handleChange}
                placeholder="Example: B.Ed, M.Sc"
                required
              />
            </div>

            <div className="teacher-field">
              <label>Phone Number *</label>
              <input
                name="phone"
                type="tel"
                value={form.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                pattern="[0-9]{10}"
                title="Enter a 10-digit phone number"
                required
              />
            </div>

            <div className="teacher-field">
              <label>Email Address *</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="teacher@example.com"
                required
              />
            </div>
          </div>

          <div className="teacher-form-actions">
            <button
              type="submit"
              className="save-teacher-btn"
              disabled={loading}
            >
              {loading
                ? "Please wait..."
                : editingId
                ? "Update Teacher"
                : "＋ Add Teacher"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-teacher-btn"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="teacher-list-section">
        <div className="teacher-list-heading">
          <div>
            <span className="section-kicker">SCHOOL STAFF</span>
            <h2>Our Teachers</h2>
          </div>

          <input
            className="teacher-search"
            type="search"
            placeholder="Search teachers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {filteredTeachers.length === 0 ? (
          <div className="teacher-empty">
            <div>♧</div>
            <h3>No teachers found</h3>
            <p>Add a teacher using the form above.</p>
          </div>
        ) : (
          <div className="teacher-table-wrapper">
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Employee ID</th>
                  <th>Subject</th>
                  <th>Qualification</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filteredTeachers.map((teacher) => (
                  <tr key={teacher._id}>
                    <td>
                      <div className="teacher-name-cell">
                        {teacher.photo ? (
                          <img
                            src={`${SERVER}${teacher.photo}`}
                            alt={teacher.name}
                          />
                        ) : (
                          <div className="teacher-initial">
                            {teacher.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <strong>{teacher.name}</strong>
                      </div>
                    </td>
                    <td>{teacher.employeeId}</td>
                    <td>{teacher.subject}</td>
                    <td>{teacher.qualification}</td>
                    <td>{teacher.phone}</td>
                    <td>{teacher.email}</td>
                    <td>
                      <div className="teacher-actions">
                        <button
                          className="edit-teacher-btn"
                          onClick={() => handleEdit(teacher)}
                        >
                          Edit
                        </button>
                        <button
                          className="delete-teacher-btn"
                          onClick={() => handleDelete(teacher._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default Teachers;


