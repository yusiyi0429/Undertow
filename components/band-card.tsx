import { Band } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BandCardProps {
  band: Band
}

export function BandCard({ band }: BandCardProps) {
  return (
    <Card className="group overflow-hidden border-l-4 border-l-primary bg-[#0a0a0a] ring-1 ring-white/5 transition-all duration-300 hover:border-primary/80 hover:bg-[#111111] hover:shadow-lg hover:shadow-primary/10 hover:ring-primary/20">
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl uppercase tracking-wide text-white">
            {band.name}
          </h3>
          <Badge className="bg-primary/15 text-primary hover:bg-primary/25">
            {band.genre}
          </Badge>
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-white/40">
          {band.country} · {band.formedYear}
        </p>
        <p className="text-sm leading-relaxed text-white/70">{band.description}</p>
      </CardContent>
    </Card>
  )
}
