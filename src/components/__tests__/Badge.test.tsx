import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('[components] - Badge', () => {
  it('renders text correctly', () => {
    const { getByText } = render(<Badge text="Notion" />)
    expect(getByText('Notion')).toBeInTheDocument()
  })

  it('renders type correcly', () => {
    render(<Badge text="Free" type="Free" />)
    render(<Badge text="Freemium" type="Freemium" />)
    render(<Badge text="Paid" type="Paid" />)
    expect(screen.getByText('Free')).toHaveClass(
      'bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white'
    )
    expect(screen.getByText('Freemium')).toHaveClass('bg-gradient-to-r from-purple-400 to-yellow-400 text-white')
    expect(screen.getByText('Paid')).toHaveClass('bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white')
  })

  it('has link wrapper if link prop is passed', () => {
    const { getByText } = render(<Badge text="Notion" link="/notion" />)
    expect(getByText('Notion')).toHaveAttribute('href', '/notion')
  })

  it('has pointer wrapper if pointer prop is passed', () => {
    const { getByText } = render(<Badge text="Notion" pointer />)
    expect(getByText('Notion')).toHaveClass('cursor-pointer')
  })
})
