import Gallery from './components/Gallery'
import './App.css'

function App() {
  const handleNavClick = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className="sticky-nav">
        <div className="nav-container">
          <h1 className="nav-logo">Portfolio</h1>
          <ul className="nav-links">
            <li>
              <button onClick={() => handleNavClick('hero')} className="nav-button">
                Hero
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('gallery')} className="nav-button">
                Gallery
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('about')} className="nav-button">
                About
              </button>
            </li>
            <li>
              <button onClick={() => handleNavClick('contact')} className="nav-button">
                Contact
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <section id="hero" className="section section-hero">
        <div className="section-content">
          <h1>Welcome to Our Portfolio</h1>
          <p>Discover exceptional work and innovative solutions</p>
          <button
            className="cta-button"
            onClick={() => handleNavClick('gallery')}
          >
            Explore Gallery
          </button>
        </div>
      </section>

      <section id="gallery" className="section section-gallery">
        <div className="section-content">
          <h2>Gallery</h2>
          <Gallery />
        </div>
      </section>

      <section id="about" className="section section-about">
        <div className="section-content">
          <h2>About Us</h2>
          <p>
            We are passionate about creating beautiful and functional digital experiences.
            Our team combines creativity with technical expertise to deliver exceptional results.
          </p>
          <div className="about-grid">
            <div className="about-card">
              <h3>Design</h3>
              <p>Thoughtful and user-centered design approach</p>
            </div>
            <div className="about-card">
              <h3>Development</h3>
              <p>Robust and scalable technical implementation</p>
            </div>
            <div className="about-card">
              <h3>Innovation</h3>
              <p>Pushing boundaries and exploring new possibilities</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-contact">
        <div className="section-content">
          <h2>Get in Touch</h2>
          <p>We'd love to hear from you. Let's create something amazing together.</p>
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Your Name"
              className="form-input"
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              className="form-input"
              required
            />
            <textarea
              placeholder="Your Message"
              className="form-input form-textarea"
              rows={5}
              required
            ></textarea>
            <button type="submit" className="cta-button">Send Message</button>
          </form>
        </div>
      </section>
    </>
  )
}

export default App
