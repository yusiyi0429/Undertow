import { Event } from '@/lib/data/types'

export interface EventRepository {
  getEvents(): Promise<Event[]>
  getEventById(id: string): Promise<Event | null>
}
