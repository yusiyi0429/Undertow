import { Event } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group overflow-hidden border-l-4 border-l-primary bg-[#0a0a0a] ring-1 ring-white/5 transition-all duration-300 hover:border-primary/80 hover:bg-[#111111] hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/20">
      <CardContent className="p-5">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-white/50">
          {event.date}
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-bebas-neue)] text-2xl uppercase tracking-wide text-white">
          {event.bandName}
        </h3>
        <p className="mb-3 text-sm text-white/60">
          {event.city} · {event.venue}
        </p>
        <Badge
          variant="secondary"
          className="bg-primary/15 text-primary hover:bg-primary/25"
        >
          {event.genre}
        </Badge>
      </CardContent>
    </Card>
  )
}
