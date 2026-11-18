
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Students.css";

const API = "http://localhost:5000/api/students";

const classOptions = [
  "1st Class", "2nd Class", "3rd Class", "4th Class",
  "5th Class", "6th Class", "7th Class", "8th Class",
  "9th Class", "10th Class"
];

const emptyForm = {
  name: "",
  admissionNumber: "",
  className: "",
  parentName: "",
  parentPhone: "",
  address: "",
};

function Students() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [students, setStudents] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage, setStudentsPerPage] = useState(10);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API, config);
      setStudents(response.data);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Unable to load students.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      if (editingId) {
        await axios.put(`${API}/${editingId}`, form, config);
        setMessage("Student updated successfully!");
      } else {
        await axios.post(API, form, config);
        setMessage("Student added successfully!");
      }

      setForm(emptyForm);
      setEditingId(null);
      setCurrentPage(1);
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleEdit = (student) => {
    setForm({
      name: student.name,
      admissionNumber: student.admissionNumber,
      className: student.className,
      parentName: student.parentName,
      parentPhone: student.parentPhone,
      address: student.address || "",
    });

    setEditingId(student._id);
    setMessage("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this student?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`, config);
      setMessage("Student deleted successfully!");
      fetchStudents();
    } catch (err) {
      setError(err.response?.data?.message || "Unable to delete student.");
    }
  };

  const cancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  // Class and search filtering
  const filteredStudents = students.filter((student) => {
    const matchesClass =
      selectedClass === "All Classes" ||
      student.className === selectedClass;

    const search = searchTerm.trim().toLowerCase();

    const matchesSearch =
      student.name?.toLowerCase().includes(search) ||
      student.admissionNumber?.toLowerCase().includes(search);

    return matchesClass && matchesSearch;
  });

  const totalPages = Math.ceil(
    filteredStudents.length / studentsPerPage
  );

  const startIndex = (currentPage - 1) * studentsPerPage;

  const currentStudents = filteredStudents.slice(
    startIndex,
    startIndex + studentsPerPage
  );

  const selectedClassCount =
    selectedClass === "All Classes"
      ? students.length
      : students.filter(
          (student) => student.className === selectedClass
        ).length;

  // Keep current page valid after filtering or deleting
  useEffect(() => {
    if (totalPages === 0 && currentPage !== 1) {
      setCurrentPage(1);
    } else if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  const handleClassFilter = (e) => {
    setSelectedClass(e.target.value);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageSize = (e) => {
    setStudentsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="students-page">

      {/* HEADER */}
      <header className="students-header">
        <div>
          <span className="students-eyebrow">SCHOOL ADMINISTRATION</span>
          <h1>Student Management</h1>
          <p>Manage student admission details and records.</p>
        </div>

        <button className="back-btn" onClick={() => navigate("/admin")}>
          ← Dashboard
        </button>
      </header>

      {/* STATISTICS */}
      <div className="student-stats">
        <div className="student-stat-card">
          <span>Total Students</span>
          <strong>{students.length}</strong>
          <small>All registered students</small>
        </div>

        <div className="student-stat-card">
          <span>
            {selectedClass === "All Classes" ? "All Classes" : selectedClass}
          </span>
          <strong>{selectedClassCount}</strong>
          <small>Students in selected class</small>
        </div>

        <div className="student-stat-card">
          <span>School</span>
          <strong>SVHS</strong>
          <small>Sri Venkateswara High School</small>
        </div>
      </div>

      {/* ADD / EDIT FORM */}
      <section className="student-form-card">
        <div className="section-heading">
          <div>
            <span className="students-eyebrow">
              {editingId ? "UPDATE RECORD" : "NEW ADMISSION"}
            </span>
            <h2>{editingId ? "Edit Student" : "Add New Student"}</h2>
          </div>
        </div>

        {message && <div className="success-message">{message}</div>}
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className="student-form">
          <label>
            Student Name
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Enter student name"
              required
            />
          </label>

          <label>
            Admission Number
            <input
              name="admissionNumber"
              value={form.admissionNumber}
              onChange={handleChange}
              placeholder="Enter admission number"
              required
            />
          </label>

          <label>
            Class
            <select
              name="className"
              value={form.className}
              onChange={handleChange}
              required
            >
              <option value="">Select class</option>
              {classOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </label>

          <label>
            Parent Name
            <input
              name="parentName"
              value={form.parentName}
              onChange={handleChange}
              placeholder="Enter parent name"
              required
            />
          </label>

          <label>
            Parent Phone
            <input
              name="parentPhone"
              type="tel"
              value={form.parentPhone}
              onChange={handleChange}
              placeholder="Enter phone number"
              pattern="[0-9]{10}"
              title="Enter a 10-digit phone number"
              required
            />
          </label>

          <label>
            Address
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Enter address"
            />
          </label>

          <div className="form-actions">
            <button className="save-student-btn" type="submit">
              {editingId ? "Update Student" : "+ Add Student"}
            </button>

            {editingId && (
              <button
                type="button"
                className="cancel-btn"
                onClick={cancelEdit}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* STUDENT DIRECTORY */}
      <section className="student-table-card">
        <div className="section-heading">
          <div>
            <span className="students-eyebrow">STUDENT DIRECTORY</span>
            <h2>Student Records</h2>
          </div>

          <span className="record-count">
            {filteredStudents.length} Records
          </span>
        </div>

        {/* FILTER AND SEARCH */}
        <div className="student-filter-bar">
          <div className="student-filter-field">
            <label htmlFor="classFilter">Select Class</label>
            <select
              id="classFilter"
              value={selectedClass}
              onChange={handleClassFilter}
            >
              <option value="All Classes">All Classes</option>
              {classOptions.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          <div className="student-search-field">
            <label htmlFor="studentSearch">Search Student</label>
            <input
              id="studentSearch"
              type="text"
              placeholder="Search name or admission number..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>

          <button
            type="button"
            className="clear-filter-btn"
            onClick={() => {
              setSelectedClass("All Classes");
              setSearchTerm("");
              setCurrentPage(1);
            }}
          >
            Clear Filters
          </button>
        </div>

        <p className="filter-result-text">
          Showing <strong>{filteredStudents.length}</strong> of{" "}
          <strong>{students.length}</strong> students
        </p>

        {loading ? (
          <p className="empty-state">Loading students...</p>
        ) : filteredStudents.length === 0 ? (
          <p className="empty-state">
            No students found. Try another class or search.
          </p>
        ) : (
          <>
            <div className="table-wrapper">
              <table className="students-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Admission No.</th>
                    <th>Class</th>
                    <th>Parent</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {currentStudents.map((student) => (
                    <tr key={student._id}>
                      <td>{student.name}</td>
                      <td>{student.admissionNumber}</td>
                      <td>{student.className}</td>
                      <td>{student.parentName}</td>
                      <td>{student.parentPhone}</td>
                      <td className="action-buttons">
                        <button onClick={() => handleEdit(student)}>
                          Edit
                        </button>
                        <button onClick={() => handleDelete(student._id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="student-pagination">
              <div className="pagination-info">
                Showing {startIndex + 1}–
                {Math.min(startIndex + studentsPerPage, filteredStudents.length)}
                {" "}of {filteredStudents.length} students
              </div>

              <div className="pagination-controls">
                <label htmlFor="pageSize">Rows:</label>
                <select
                  id="pageSize"
                  value={studentsPerPage}
                  onChange={handlePageSize}
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                </select>

                <button
                  type="button"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => page - 1)}
                >
                  Previous
                </button>

                <span className="page-number">
                  {currentPage} / {totalPages}
                </span>

                <button
                  type="button"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage((page) => page + 1)}
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Students;


