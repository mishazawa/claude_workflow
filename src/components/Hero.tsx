import ShaderBackground from './ShaderBackground'
import './Hero.css'

const Hero = () => {
  return (
    <div className="hero-container">
      <ShaderBackground />
      <div className="hero-content">
        <div className="logo-mark">
          <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'var(--accent)', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: 'var(--accent-border)', stopOpacity: 0.8 }} />
              </linearGradient>
            </defs>
            <circle cx="50" cy="50" r="45" fill="none" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.8" />
            <path
              d="M 50 30 L 60 50 L 50 70 L 40 50 Z"
              fill="none"
              stroke="url(#logoGradient)"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <circle cx="50" cy="50" r="8" fill="url(#logoGradient)" opacity="0.6" />
          </svg>
        </div>
        <h1 className="artist-name">Slava Rybin</h1>
        <p className="tagline">systems artist exploring perception, feedback, complexity</p>
      </div>
    </div>
  )
}

export default Hero
