import { Event } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface EventCardProps {
  event: Event
}

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="group overflow-hidden border-l-[5px] border-l-[#ff1a1a] bg-gradient-to-br from-[#0a0000] to-[#050000] ring-1 ring-[#330a0a] transition-all duration-300 hover:border-[#ff1a1a]/80 hover:shadow-lg hover:shadow-[#ff1a1a]/20 hover:ring-[#ff1a1a]/30">
      <div className="relative h-[140px] overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(/images/horror/dark-hero.jpg)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050000]" />
      </div>
      <CardContent className="relative space-y-3 p-5">
        <div
          className="absolute -top-7 right-5 h-14 w-14 rounded-full border-2 border-[#ff1a1a] bg-cover bg-center shadow-lg shadow-[#ff1a1a]/40"
          style={{ backgroundImage: `url(/images/horror/black-sand-texture.jpg)` }}
        />
        <p className="text-xs font-medium uppercase tracking-wider text-[#ff9999]">
          {event.date}
        </p>
        <h3 className="font-[family-name:var(--font-nosifer)] text-2xl leading-none text-white">
          {event.bandName}
        </h3>
        <p className="text-sm text-white/60">
          {event.city} · {event.venue}
        </p>
        <Badge className="border-transparent bg-[#ff1a1a]/15 text-[#ff4d4d] hover:bg-[#ff1a1a]/25">
          {event.genre}
        </Badge>
      </CardContent>
    </Card>
  )
}
