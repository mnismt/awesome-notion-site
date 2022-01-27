import Favicon from '../Favicon'
import { render } from '@testing-library/react'

describe('[components] - Favicons', () => {
  it('should render alt text', () => {
    const { getByAltText } = render(<Favicon link="https://google.com" />)
    expect(getByAltText('Favicon')).toBeInTheDocument()
  })

  it('should render a favicon', () => {
    const { getByAltText } = render(<Favicon link="https://google.com" />)
    expect(getByAltText('Favicon')).toHaveAttribute(
      'src',
      'https://www.google.com/s2/favicons?domain=https://google.com'
    )
  })

  it('renders github favicon from githubassets instead of google', () => {
    const { getByAltText } = render(<Favicon link="https://github.com" />)
    expect(getByAltText('Favicon')).toHaveAttribute('src', 'https://github.githubassets.com/favicons/favicon.svg')
  })
})
