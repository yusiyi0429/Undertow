import { Event } from '@/lib/data/types'
import { EventRepository } from '@/lib/data/repositories/event-repository'

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    bandName: 'Cradle of Filth',
    date: '2025-08-12',
    venue: 'Modern Sky LAB',
    city: '上海',
    genre: 'Extreme Metal',
  },
  {
    id: 'evt-2',
    bandName: 'Nightwish',
    date: '2025-09-05',
    venue: '凯迪拉克中心',
    city: '北京',
    genre: 'Symphonic Metal',
  },
  {
    id: 'evt-3',
    bandName: '施教日',
    date: '2025-07-20',
    venue: 'MAO Livehouse',
    city: '广州',
    genre: '黑金属',
  },
]

export const mockEventRepository: EventRepository = {
  getEvents: async () => mockEvents,
  getEventById: async (id: string) =>
    mockEvents.find((event) => event.id === id) || null,
}
