import { Event } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden border-l-4 border-l-primary bg-card">
      <CardContent className="p-5">
        <div className="mb-2 text-sm text-muted-foreground">{event.date}</div>
        <h3 className="mb-2 font-[family-name:var(--font-bebas-neue)] text-2xl uppercase tracking-wide text-foreground">
          {event.bandName}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">
          {event.city} · {event.venue}
        </p>
        <Badge variant="secondary" className="bg-accent text-accent-foreground">
          {event.genre}
        </Badge>
      </CardContent>
    </Card>
  )
}
