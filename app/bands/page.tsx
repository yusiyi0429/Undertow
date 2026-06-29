import { mockBandRepository } from '@/lib/data/mock/bands'
import { BandsList } from '@/components/bands-list'
import { PageShell } from '@/components/page-shell'
import { PageHeader } from '@/components/page-header'

export default async function BandsPage() {
  const bands = await mockBandRepository.getBands()

  return (
    <PageShell>
      <PageHeader
        title="乐队百科"
        subtitle="按流派探索金属乐队。从地下传奇到现役军团，记录每一支撕裂夜晚的声音。"
      />
      <BandsList bands={bands} />
    </PageShell>
  )
}
