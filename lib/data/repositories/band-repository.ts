import { Band } from '@/lib/data/types'

export interface BandRepository {
  getBands(): Promise<Band[]>
  getBandById(id: string): Promise<Band | null>
}

export const bandRepository: BandRepository = {
  getBands: async () => [],
  getBandById: async () => null,
}
