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
              ? 'bg-primary text-black shadow-lg shadow-primary/30'
              : 'border border-white/10 bg-white/5 text-white/70 hover:border-primary/50 hover:text-white'
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
