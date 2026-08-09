import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import Counter from './Counter'

describe('Counter', () => {
  it('displays initial count of 0', () => {
    render(<Counter />)
    expect(screen.getByText('Current count: 0')).toBeInTheDocument()
  })

  it('increments count by 1 when increment button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', { name: 'Increment' })

    await user.click(incrementButton)
    expect(screen.getByText('Current count: 1')).toBeInTheDocument()
  })

  it('increments count multiple times', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', { name: 'Increment' })

    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(incrementButton)
    expect(screen.getByText('Current count: 3')).toBeInTheDocument()
  })

  it('decrements count by 1 when decrement button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })

    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(decrementButton)
    expect(screen.getByText('Current count: 1')).toBeInTheDocument()
  })

  it('decrements count to negative when decrement button is clicked from 0', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })

    await user.click(decrementButton)
    expect(screen.getByText('Current count: -1')).toBeInTheDocument()
  })

  it('decrements to multiple negative numbers', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })

    await user.click(decrementButton)
    await user.click(decrementButton)
    await user.click(decrementButton)
    expect(screen.getByText('Current count: -3')).toBeInTheDocument()
  })

  it('resets count to 0 when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    const incrementButton = screen.getByRole('button', { name: 'Increment' })
    const resetButton = screen.getByRole('button', { name: 'Reset' })

    await user.click(incrementButton)
    await user.click(incrementButton)
    await user.click(resetButton)
    expect(screen.getByText('Current count: 0')).toBeInTheDocument()
  })

  it('resets count to 0 from negative', async () => {
    const user = userEvent.setup()
    render(<Counter />)
    const decrementButton = screen.getByRole('button', { name: 'Decrement' })
    const resetButton = screen.getByRole('button', { name: 'Reset' })

    await user.click(decrementButton)
    await user.click(decrementButton)
    await user.click(resetButton)
    expect(screen.getByText('Current count: 0')).toBeInTheDocument()
  })
})
