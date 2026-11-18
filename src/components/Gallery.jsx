
import "./Gallery.css";

const galleryItems = [
  {
    title: "Our School Campus",
    category: "CAMPUS",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Learning Environment",
    category: "CLASSROOM",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Student Activities",
    category: "ACTIVITIES",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Sports & Events",
    category: "SPORTS",
    image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=900&q=85",
  },
];

function Gallery() {
  return (
    <section className="gallery-section" id="gallery">
      <div className="gallery-heading">
        <span className="gallery-label">LIFE AT OUR SCHOOL</span>
        <h2>Our School Gallery</h2>
        <p>
          A glimpse of our campus, classrooms and
          memorable student activities.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <article className="gallery-card" key={index}>
            <div className="gallery-image">
              <img
                src={item.image}
                alt={item.title}
                className="gallery-photo"
              />
            </div>

            <div className="gallery-info">
              <span>{item.category}</span>
              <h3>{item.title}</h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Gallery;

