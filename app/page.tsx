import { EventCard } from '@/components/event-card'
import { mockEventRepository } from '@/lib/data/mock/events'

export default async function HomePage() {
  const events = await mockEventRepository.getEvents()

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl tracking-widest text-primary">
          近期演出
        </h1>
        <p className="text-muted-foreground">聚焦国内金属现场，不错过任何一场演出。</p>
      </div>

      {events.length === 0 ? (
        <p className="text-muted-foreground">暂无演出，去现场撒点野吧。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
