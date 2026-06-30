import { cn } from '@/lib/utils'

interface GenreFilterProps {
  genres: string[]
  selected: string
  onChange: (genre: string) => void
}

export function GenreFilter({ genres, selected, onChange }: GenreFilterProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => onChange(genre)}
          className={cn(
            'rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200',
            selected === genre
              ? 'bg-[#ff1a1a] text-black shadow-lg shadow-[#ff1a1a]/30'
              : 'border border-[#330a0a] bg-[#0a0000] text-[#ff9999] hover:border-[#ff1a1a]/50 hover:text-white'
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
