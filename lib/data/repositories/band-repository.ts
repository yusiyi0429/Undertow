import { Band } from '@/lib/data/types'

export interface BandRepository {
  getBands(): Promise<Band[]>
  getBandById(id: string): Promise<Band | null>
}
