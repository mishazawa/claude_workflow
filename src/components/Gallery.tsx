import { useState } from 'react'
import Lightbox from './Lightbox'
import './Gallery.css'

interface Project {
  id: number
  title: string
  description: string
  image: string
  color: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Interactive Dashboard',
    description: 'A real-time analytics dashboard with live data visualization and custom widgets.',
    image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: '#667eea'
  },
  {
    id: 2,
    title: 'Mobile App Design',
    description: 'Beautiful mobile application interface with smooth animations and intuitive navigation.',
    image: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: '#f093fb'
  },
  {
    id: 3,
    title: 'E-Commerce Platform',
    description: 'Full-featured online store with product catalog, shopping cart, and secure checkout.',
    image: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    color: '#4facfe'
  },
  {
    id: 4,
    title: 'Content Management System',
    description: 'Flexible CMS with drag-and-drop page builder and powerful content management tools.',
    image: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    color: '#43e97b'
  }
]

function Gallery() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section className="gallery-section">
        <h2>Projects Gallery</h2>
        <div className="gallery-grid">
          {projects.map(project => (
            <div
              key={project.id}
              className="gallery-item"
              onClick={() => setSelectedProject(project)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setSelectedProject(project)
                }
              }}
            >
              <div
                className="gallery-image"
                style={{ background: project.image }}
                aria-label={`${project.title} thumbnail`}
              />
              <div className="gallery-overlay">
                <h3>{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedProject && (
        <Lightbox
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  )
}

export default Gallery
