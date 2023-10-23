import { render, screen } from '@testing-library/react'
import Home from '@/page'

describe('render home screen', () => {
  it('render body text', () => {
    render(<Home />)

    const mainDom = screen.getByRole('main')

    expect(mainDom).toHaveTextContent('Hello World')
  })
})
