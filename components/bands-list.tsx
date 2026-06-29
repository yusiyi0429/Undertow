'use client'

import { useState, useMemo } from 'react'
import { BandCard } from '@/components/band-card'
import { GenreFilter } from '@/components/genre-filter'
import { Band } from '@/lib/data/types'

const genres = ['全部', '黑金属', '死金', '力量金属']

interface BandsListProps {
  bands: Band[]
}

export function BandsList({ bands }: BandsListProps) {
  const [selectedGenre, setSelectedGenre] = useState('全部')

  const filteredBands = useMemo(() => {
    if (selectedGenre === '全部') return bands
    return bands.filter((band) => band.genre === selectedGenre)
  }, [selectedGenre, bands])

  return (
    <div className="space-y-8">
      <GenreFilter genres={genres} selected={selectedGenre} onChange={setSelectedGenre} />

      {filteredBands.length === 0 ? (
        <p className="text-muted-foreground">该流派下暂无乐队。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBands.map((band) => (
            <BandCard key={band.id} band={band} />
          ))}
        </div>
      )}
    </div>
  )
}
