
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SchoolInformation.css";

const emptyForm = {
  schoolName: "",
  address: "",
  phone: "",
  email: "",
  principal: "",
  establishedYear: "",
};

function SchoolInformation() {
  const navigate = useNavigate();

  const [schools, setSchools] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("schoolInformation")) || [];
    } catch {
      return [];
    }
  });

  const [formData, setFormData] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const saveSchools = (updatedSchools) => {
    setSchools(updatedSchools);
    localStorage.setItem(
      "schoolInformation",
      JSON.stringify(updatedSchools)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      const updatedSchools = schools.map((school) =>
        school.id === editingId
          ? { ...formData, id: editingId }
          : school
      );

      saveSchools(updatedSchools);
      alert("School information updated successfully!");
    } else {
      const newSchool = {
        ...formData,
        id: Date.now(),
      };

      saveSchools([...schools, newSchool]);
      alert("School information added successfully!");
    }

    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (school) => {
    setFormData({
      schoolName: school.schoolName,
      address: school.address,
      phone: school.phone,
      email: school.email,
      principal: school.principal,
      establishedYear: school.establishedYear,
    });

    setEditingId(school.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this school information?"
    );

    if (confirmDelete) {
      saveSchools(schools.filter((school) => school.id !== id));

      if (editingId === id) {
        setFormData(emptyForm);
        setEditingId(null);
      }
    }
  };

  const handleCancel = () => {
    setFormData(emptyForm);
    setEditingId(null);
  };

  return (
    <div className="school-info-page">

      <header className="school-info-header">
        <div>
          <span className="school-info-tag">SV SCHOOL / ADMIN PORTAL</span>
          <h1>School Information</h1>
          <p>Add and manage your school profile details.</p>
        </div>

        <button
          className="school-back-button"
          onClick={() => navigate("/admin")}
        >
          ← Back to Dashboard
        </button>
      </header>

      <main className="school-info-container">

        {/* ADD / EDIT FORM */}
        <section className="school-info-form-card">
          <span className="school-info-label">SCHOOL PROFILE MANAGEMENT</span>

          <h2>
            {editingId !== null
              ? "Edit School Details"
              : "Add School Details"}
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="school-form-grid">

              <div className="school-form-group">
                <label>School Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  placeholder="Enter school name"
                  value={formData.schoolName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="school-form-group">
                <label>Principal Name</label>
                <input
                  type="text"
                  name="principal"
                  placeholder="Enter principal name"
                  value={formData.principal}
                  onChange={handleChange}
                />
              </div>

              <div className="school-form-group full-width">
                <label>School Address *</label>
                <textarea
                  name="address"
                  placeholder="Enter complete school address"
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  required
                />
              </div>

              <div className="school-form-group">
                <label>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>

              <div className="school-form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="school-form-group">
                <label>Established Year</label>
                <input
                  type="number"
                  name="establishedYear"
                  placeholder="Example: 2000"
                  value={formData.establishedYear}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="school-form-actions">
              <button type="submit" className="school-save-button">
                {editingId !== null ? "Update Details" : "Add School Details"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="school-cancel-button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {/* SAVED SCHOOL DETAILS */}
        <section className="saved-school-section">
          <div className="saved-school-heading">
            <div>
              <span className="school-info-label">SCHOOL RECORDS</span>
              <h2>Saved School Information</h2>
            </div>

            <span className="school-record-count">
              {schools.length} Records
            </span>
          </div>

          {schools.length === 0 ? (
            <div className="school-info-empty">
              <div>▣</div>
              <h3>No School Details Added</h3>
              <p>
                Enter your school details using the form above.
              </p>
            </div>
          ) : (
            <div className="saved-school-list">
              {schools.map((school) => (
                <article className="saved-school-card" key={school.id}>
                  <div className="saved-school-title">
                    <div className="saved-school-icon">SV</div>
                    <div>
                      <h3>{school.schoolName}</h3>
                      <span>School Profile</span>
                    </div>
                  </div>

                  <div className="saved-school-details">
                    <p><strong>Principal:</strong> {school.principal || "Not added"}</p>
                    <p><strong>Address:</strong> {school.address}</p>
                    <p><strong>Phone:</strong> {school.phone || "Not added"}</p>
                    <p><strong>Email:</strong> {school.email || "Not added"}</p>
                    <p><strong>Established:</strong> {school.establishedYear || "Not added"}</p>
                  </div>

                  <div className="saved-school-actions">
                    <button
                      className="school-edit-button"
                      onClick={() => handleEdit(school)}
                    >
                      Edit
                    </button>

                    <button
                      className="school-delete-button"
                      onClick={() => handleDelete(school.id)}
                    >
                      Delete
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default SchoolInformation;
