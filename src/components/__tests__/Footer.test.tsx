import Footer from '../Footer'
import { render } from '@testing-library/react'

test('it should render correcly', () => {
  const { getByText } = render(<Footer />)
  expect(getByText('Made with ❤️ in VN by')).toBeInTheDocument()
})
