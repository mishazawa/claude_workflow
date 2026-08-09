import { useEffect } from 'react'
import './Lightbox.css'

interface Project {
  id: number
  title: string
  description: string
  image: string
}

interface LightboxProps {
  project: Project
  onClose: () => void
}

function Lightbox({ project, onClose }: LightboxProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleEscape)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [onClose])

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="lightbox-backdrop" onClick={handleBackdropClick}>
      <div className="lightbox-container">
        <div className="lightbox-content">
          <div
            className="lightbox-image"
            style={{ background: project.image }}
            role="img"
            aria-label={project.title}
          />
          <div className="lightbox-text">
            <h2>{project.title}</h2>
            <p>{project.description}</p>
          </div>
        </div>

        <button
          className="lightbox-close"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default Lightbox
