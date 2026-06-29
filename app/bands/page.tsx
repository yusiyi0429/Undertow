import { mockBandRepository } from '@/lib/data/mock/bands'
import { BandsList } from '@/components/bands-list'

export default async function BandsPage() {
  const bands = await mockBandRepository.getBands()

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl tracking-widest text-primary">
          乐队百科
        </h1>
        <p className="text-muted-foreground">按流派探索金属乐队。</p>
      </div>

      <BandsList bands={bands} />
    </div>
  )
}
