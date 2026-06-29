import { describe, it, expect } from 'vitest'
import { mockEventRepository } from '@/lib/data/mock/events'

describe('mockEventRepository', () => {
  it('returns events', async () => {
    const events = await mockEventRepository.getEvents()
    expect(events.length).toBeGreaterThan(0)
    expect(events[0]).toHaveProperty('bandName')
    expect(events[0]).toHaveProperty('city')
  })
})
