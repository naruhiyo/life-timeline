import { render, screen } from '@testing-library/react'
import Home from '@/page'
import '@testing-library/jest-dom'

describe('render home screen', () => {
  it('render body text', () => {
    render(<Home />)

    const mainDom = screen.getByRole('main')

    expect(mainDom).toHaveTextContent('Hello World')
  })
})
