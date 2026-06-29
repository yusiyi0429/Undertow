import { describe, it, expect } from 'vitest'
import { mockBandRepository } from '@/lib/data/mock/bands'

describe('mockBandRepository', () => {
  it('returns bands', async () => {
    const bands = await mockBandRepository.getBands()
    expect(bands.length).toBeGreaterThan(0)
    expect(bands[0]).toHaveProperty('name')
    expect(bands[0]).toHaveProperty('genre')
  })
})
