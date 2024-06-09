import { render, screen } from '@testing-library/react'
import App from './App'
import { beforeEach, vi } from 'vitest'
import { zonaService } from './services/zonaService'

describe('App', () => {

  beforeEach(() => {
    vi.spyOn(zonaService, 'zonas').mockImplementation(() => [])
  })

  test('smoke test for App', () => {
    render(<App />)
    const linkElement = screen.getByText(/Consulta/i)
    expect(linkElement).toBeInTheDocument()
  })
  
  afterEach(() => {
    vi.restoreAllMocks()
  })

})