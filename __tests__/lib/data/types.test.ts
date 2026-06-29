import { describe, it, expect } from 'vitest'
import type { Event, Band, Post } from '@/lib/data/types'

describe('data types', () => {
  it('Event type compiles', () => {
    const event: Event = {
      id: '1',
      bandName: 'Test Band',
      date: '2025-08-12',
      venue: 'MAO Livehouse',
      city: '上海',
      genre: '黑金属',
    }
    expect(event.bandName).toBe('Test Band')
  })

  it('Band type compiles', () => {
    const band: Band = {
      id: '1',
      name: 'Test Band',
      genre: '黑金属',
      formedYear: 1990,
      country: '挪威',
      description: 'A test band',
    }
    expect(band.name).toBe('Test Band')
  })

  it('Post type compiles', () => {
    const post: Post = {
      id: '1',
      author: 'User',
      content: 'Hello',
      createdAt: '2025-08-12T10:00:00Z',
    }
    expect(post.content).toBe('Hello')
  })
})
