
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Announcements.css";

function Announcements() {
  const navigate = useNavigate();

  const [announcements, setAnnouncements] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !description.trim()) {
      alert("Please enter title and description");
      return;
    }

    if (editingId !== null) {
      setAnnouncements((previous) =>
        previous.map((item) =>
          item.id === editingId
            ? { ...item, title, description }
            : item
        )
      );
      setEditingId(null);
      alert("Announcement updated successfully!");
    } else {
      const newAnnouncement = {
        id: Date.now(),
        title,
        description,
        date: new Date().toLocaleDateString("en-IN"),
      };

      setAnnouncements((previous) => [
        newAnnouncement,
        ...previous,
      ]);

      alert("Announcement added successfully!");
    }

    setTitle("");
    setDescription("");
  };

  const handleEdit = (item) => {
    setTitle(item.title);
    setDescription(item.description);
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this announcement?")) {
      setAnnouncements((previous) =>
        previous.filter((item) => item.id !== id)
      );
    }
  };

  const cancelEdit = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  return (
    <div className="announcements-page">

      <header className="announcement-header">
        <div>
          <span>SV SCHOOL / ADMIN PORTAL</span>
          <h1>Announcements</h1>
          <p>Manage important school news and updates.</p>
        </div>

        <button
          className="back-dashboard-button"
          onClick={() => navigate("/admin/dashboard")}
        >
          ← Back to Dashboard
        </button>
      </header>

      <main className="announcement-container">

        <section className="announcement-form-card">
          <span className="announcement-label">NOTICE MANAGEMENT</span>

          <h2>
            {editingId !== null
              ? "Edit Announcement"
              : "Create New Announcement"}
          </h2>

          <form onSubmit={handleSubmit}>
            <label>Announcement Title</label>
            <input
              type="text"
              placeholder="Enter announcement title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label>Description</label>
            <textarea
              placeholder="Write announcement details here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="5"
              required
            />

            <div className="announcement-form-buttons">
              <button type="submit" className="publish-button">
                {editingId !== null ? "Update Announcement" : "Publish Announcement"}
              </button>

              {editingId !== null && (
                <button
                  type="button"
                  className="cancel-button"
                  onClick={cancelEdit}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        <section className="announcement-list-section">
          <div className="announcement-list-heading">
            <div>
              <span className="announcement-label">SCHOOL UPDATES</span>
              <h2>Published Announcements</h2>
            </div>

            <span className="announcement-count">
              {announcements.length} Notices
            </span>
          </div>

          {announcements.length === 0 ? (
            <div className="announcement-empty">
              <div>☷</div>
              <h3>No Announcements Yet</h3>
              <p>
                Your published school announcements will appear here.
              </p>
            </div>
          ) : (
            <div className="announcement-list">
              {announcements.map((item) => (
                <article className="announcement-item" key={item.id}>
                  <div className="notice-icon">☷</div>

                  <div className="notice-content">
                    <span className="notice-date">{item.date}</span>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>

                  <div className="notice-actions">
                    <button
                      className="edit-notice"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-notice"
                      onClick={() => handleDelete(item.id)}
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

export default Announcements;
