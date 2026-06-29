import { Band } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BandCardProps {
  band: Band
}

export function BandCard({ band }: BandCardProps) {
  return (
    <Card className="bg-card">
      <CardContent className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-bebas-neue)] text-2xl uppercase tracking-wide text-foreground">
            {band.name}
          </h3>
          <Badge className="bg-accent text-accent-foreground">{band.genre}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">
          {band.country} · {band.formedYear}
        </p>
        <p className="text-sm text-foreground/80">{band.description}</p>
      </CardContent>
    </Card>
  )
}
