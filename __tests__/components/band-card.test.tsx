import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BandCard } from '@/components/band-card'
import { Band } from '@/lib/data/types'

describe('BandCard', () => {
  it('renders band details', () => {
    const band: Band = {
      id: '1',
      name: 'Test Band',
      genre: '黑金属',
      formedYear: 1990,
      country: '挪威',
      description: 'A test band',
    }
    render(<BandCard band={band} />)
    expect(screen.getByText('Test Band')).toBeInTheDocument()
    expect(screen.getByText('挪威 · 1990')).toBeInTheDocument()
  })
})
