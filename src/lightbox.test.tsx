import { render, screen } from '@testing-library/react'
import Lightbox from './components/Lightbox'
import { describe, it, expect } from 'vitest'

const mockProject = {
  id: 1,
  title: 'Test Project',
  description: 'Test Description',
  image: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}

describe('Lightbox', () => {
  it('renders lightbox with project content', () => {
    const mockOnClose = () => {}
    render(<Lightbox project={mockProject} onClose={mockOnClose} />)

    expect(screen.getByText('Test Project')).toBeTruthy()
    expect(screen.getByText('Test Description')).toBeTruthy()
  })

  it('renders close button', () => {
    const mockOnClose = () => {}
    render(<Lightbox project={mockProject} onClose={mockOnClose} />)

    const closeButton = screen.getByRole('button', { name: /close modal/i })
    expect(closeButton).toBeTruthy()
  })

  it('renders with correct project image background', () => {
    const mockOnClose = () => {}
    render(<Lightbox project={mockProject} onClose={mockOnClose} />)

    const imageElement = screen.getByRole('img', { name: 'Test Project' })
    expect(imageElement).toBeTruthy()
  })
})
