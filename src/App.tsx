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
          <h2>About</h2>
          <div className="about-content">
            <div className="about-bio">
              <h3>Artist Statement</h3>
              <p>
                I create generative systems and interactive experiences that explore the intersection of art, technology, and perception. My practice investigates how computational systems can reveal patterns in the natural world, transforming data and algorithms into poetic visual narratives. Through experimentation with code and real-time graphics, I seek to create moments of wonder and reflection in an increasingly digital landscape.
              </p>
            </div>
            <div className="about-practice">
              <h3>Practice & Tools</h3>
              <p>
                I work primarily with TouchDesigner for immersive installations and real-time visuals, combined with custom GLSL shaders for computational aesthetics. My practice integrates generative algorithms, AI-assisted creative processes, and systems art methodologies to explore emergent complexity and aesthetic possibilities at the intersection of code and creativity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="section section-contact">
        <div className="section-content">
          <h2>Contact</h2>
          <div className="contact-footer">
            <div className="contact-email">
              <p>Get in touch:</p>
              <a href="mailto:hello@rybinfx.com" className="email-link">hello@rybinfx.com</a>
            </div>
            <div className="contact-social">
              <p>Follow:</p>
              <div className="social-links">
                <a href="https://x.com" className="social-icon" aria-label="X">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694L2.306 21.75H.0l7.644-8.735L.0 2.25h6.667l4.872 6.443 5.705-6.443zM17.15 19.39h1.828L5.895 4.17H3.965l13.185 15.22z"/>
                  </svg>
                </a>
                <a href="https://tiktok.com" className="social-icon" aria-label="TikTok">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a5.32 5.32 0 0 0-1.49-.22c-3.02 0-5.44 2.18-5.44 5.43s2.42 5.43 5.44 5.43a5.32 5.32 0 0 0 5.16-3.83 60 60 0 0 0 .11-1.23h3.02c.44 1.94.78 3.57.9 4.55.1.5.27 1.05.47 1.52.58 1.45 1.92 2.78 3.28 2.78 1.49 0 2.74-.67 3.64-2.17.24-.42.44-.9.6-1.44.37-1.35.57-3.06.57-5.18v-.34C24 8.55 21.84 6.74 19.59 6.69Z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" className="social-icon" aria-label="Instagram">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10z" fill="none" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
