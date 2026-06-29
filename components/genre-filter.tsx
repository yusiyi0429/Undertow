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
            'rounded-full px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors',
            selected === genre
              ? 'bg-primary text-primary-foreground'
              : 'border border-secondary bg-card text-foreground hover:border-primary hover:text-primary'
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
