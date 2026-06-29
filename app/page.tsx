import { EventCard } from '@/components/event-card'
import { Hero } from '@/components/hero'
import { mockEventRepository } from '@/lib/data/mock/events'

export default async function HomePage() {
  const events = await mockEventRepository.getEvents()

  return (
    <>
      <Hero />
      {/* Smooth transition from hero into content */}
      <div className="relative -mt-32 h-32 bg-gradient-to-b from-transparent to-background" />
      <main id="events" className="relative mx-auto max-w-5xl px-4 pb-24 pt-8">
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="font-[family-name:var(--font-bebas-neue)] text-5xl tracking-widest text-primary">
              近期演出
            </h2>
            <p className="font-[family-name:var(--font-inter)] text-muted-foreground">
              聚焦国内金属现场，不错过任何一场演出。
            </p>
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
      </main>
    </>
  )
}
