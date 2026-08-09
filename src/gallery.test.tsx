import { render, screen } from '@testing-library/react'
import Gallery from './components/Gallery'
import { describe, it, expect } from 'vitest'

describe('Gallery', () => {
  it('renders gallery section with projects', () => {
    render(<Gallery />)

    expect(screen.getByText('Projects Gallery')).toBeTruthy()
    expect(screen.getByText('Interactive Dashboard')).toBeTruthy()
    expect(screen.getByText('Mobile App Design')).toBeTruthy()
    expect(screen.getByText('E-Commerce Platform')).toBeTruthy()
    expect(screen.getByText('Content Management System')).toBeTruthy()
  })

  it('renders gallery items with correct count', () => {
    render(<Gallery />)

    const items = screen.getAllByRole('button')
    expect(items.length).toBe(4)
  })

  it('renders gallery items as clickable buttons', () => {
    render(<Gallery />)

    const buttons = screen.getAllByRole('button')
    buttons.forEach(button => {
      expect(button).toBeTruthy()
    })
  })
})
