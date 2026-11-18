import { Link } from "react-router-dom";
import "./Gallery.css";

const galleryImages = [
  {
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=85",
    title: "School Campus",
    category: "Campus",
  },
  {
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85",
    title: "Classroom Learning",
    category: "Classroom",
  },
  {
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=85",
    title: "Library",
    category: "Facilities",
  },
  {
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=900&q=85",
    title: "Learning Environment",
    category: "Classroom",
  },
  {
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85",
    title: "Sports & Activities",
    category: "Activities",
  },
  {
    image: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=900&q=85",
    title: "Group Learning",
    category: "Activities",
  },
];

function Gallery() {
  return (
    <div className="gallery-page">
      <nav className="gallery-nav">
        <Link to="/" className="gallery-brand">
          <span>SV</span>
          <div>
            <strong>SRI VENKATESWARA</strong>
            <small>HIGH SCHOOL</small>
          </div>
        </Link>

        <div className="gallery-nav-links">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/gallery" className="selected">Gallery</Link>
          <Link to="/login">Admin Login</Link>
        </div>
      </nav>

      <header className="gallery-hero">
        <span>MEMORIES • LEARNING • GROWTH</span>
        <h1>Our School Gallery</h1>
        <p>A glimpse of the learning environment and school life.</p>
      </header>

      <section className="gallery-content">
        <div className="gallery-heading">
          <span>PHOTO COLLECTION</span>
          <h2>Moments That Inspire</h2>
          <p>
            Explore school campus, learning spaces and activities.
          </p>
        </div>

        <div className="gallery-grid">
          {galleryImages.map((item, index) => (
            <article className="gallery-card" key={index}>
              <div className="gallery-image">
                <img src={item.image} alt={item.title} />
                <span>{item.category}</span>
              </div>
              <div className="gallery-card-info">
                <h3>{item.title}</h3>
                <p>Sri Venkateswara High School</p>
              </div>
            </article>
          ))}
        </div>

        <div className="gallery-notice">
          <strong>Photo notice</strong>
          <p>
            These are sample placeholder photographs for website design.
            Replace them with actual school photographs before final project
            submission.
          </p>
        </div>
      </section>

      <footer className="gallery-footer">
        <h3>SRI VENKATESWARA HIGH SCHOOL</h3>
        <p>Kodumur, Kurnool, Andhra Pradesh</p>
        <p>© 2026 Sri Venkateswara High School</p>
      </footer>
    </div>
  );
}

export default Gallery;