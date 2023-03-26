import { render, screen } from '@testing-library/react'
import App from './App'

test('smoke test for App', () => {
  render(<App />)
  const linkElement = screen.getByText(/Consulta/i)
  expect(linkElement).toBeInTheDocument()
})
