import { Band } from '@/lib/data/types'
import { BandRepository } from '@/lib/data/repositories/band-repository'

export const mockBands: Band[] = [
  {
    id: 'band-1',
    name: 'Mayhem',
    genre: '黑金属',
    formedYear: 1984,
    country: '挪威',
    description: '挪威黑金属先驱，以激进的现场表演著称。',
  },
  {
    id: 'band-2',
    name: 'Cannibal Corpse',
    genre: '死金',
    formedYear: 1988,
    country: '美国',
    description: '美国死亡金属代表乐队之一。',
  },
  {
    id: 'band-3',
    name: 'Sabaton',
    genre: '力量金属',
    formedYear: 1999,
    country: '瑞典',
    description: '以战争历史为主题的力量金属乐队。',
  },
]

export const mockBandRepository: BandRepository = {
  getBands: async () => mockBands,
  getBandById: async (id: string) =>
    mockBands.find((band) => band.id === id) || null,
}
