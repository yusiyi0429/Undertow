import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EventCard } from '@/components/event-card'
import { Event } from '@/lib/data/types'

describe('EventCard', () => {
  it('renders event details', () => {
    const event: Event = {
      id: '1',
      bandName: 'Test Band',
      date: '2025-08-12',
      venue: 'MAO',
      city: '上海',
      genre: '黑金属',
    }
    render(<EventCard event={event} />)
    expect(screen.getByText('Test Band')).toBeInTheDocument()
    expect(screen.getByText('上海 · MAO')).toBeInTheDocument()
    expect(screen.getByText('2025-08-12')).toBeInTheDocument()
  })
})
