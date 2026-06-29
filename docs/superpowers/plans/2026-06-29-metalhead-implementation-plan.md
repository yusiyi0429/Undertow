# MetalHead Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 使用 React + Next.js 15 + Tailwind CSS 4 + shadcn/ui 搭建 MetalHead 金属乐社区 Web 应用，实现演出日历、乐队百科和社区动态三个页面。

**Architecture:** 采用 Next.js App Router，暗黑重金属视觉主题通过 Tailwind CSS 4 的 `@theme` 自定义变量实现；数据层使用 Repository 模式，默认 Mock 实现并预留真实 API 替换接口；社区帖子使用 localStorage 持久化。

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 4, shadcn/ui, next/font/google, Vitest + React Testing Library

---

## File Structure

```
app/
  layout.tsx              # 根布局 + 字体 + 导航
  globals.css             # Tailwind + 暗黑金属主题变量
  page.tsx                # 首页：演出日历
  bands/
    page.tsx              # 乐队百科
  community/
    page.tsx              # 社区动态
components/
  ui/                     # shadcn/ui 组件
  navbar.tsx              # 顶部导航
  event-card.tsx          # 演出卡片
  band-card.tsx           # 乐队卡片
  genre-filter.tsx        # 流派筛选
  post-card.tsx           # 帖子卡片
  post-form.tsx           # 发帖表单
lib/
  data/
    types.ts              # Event, Band, Post 类型
    repositories/
      event-repository.ts # EventRepository 接口
      band-repository.ts  # BandRepository 接口
    mock/
      events.ts           # MockEventRepository
      bands.ts            # MockBandRepository
  utils.ts                # shadcn 工具函数
public/
.gitignore
docs/superpowers/
  specs/2026-06-29-metalhead-design.md
  plans/2026-06-29-metalhead-implementation-plan.md
```

---

## Task 1: Initialize Next.js + shadcn/ui

**Files:**
- Create: 项目根目录下所有 Next.js 初始化文件
- Modify: `.gitignore`

- [ ] **Step 1: Create Next.js app in a temporary subdirectory**

Run:
```bash
cd /mnt/d/my-workspace/metalhead
npx create-next-app@latest metalhead-tmp --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --use-npm
```
Expected: `metalhead-tmp/` created with Next.js 15 + Tailwind CSS 4.

- [ ] **Step 2: Move generated files to project root**

Run:
```bash
cd /mnt/d/my-workspace/metalhead/metalhead-tmp
find . -mindepth 1 -maxdepth 1 -exec mv -t .. {} +
cd ..
rmdir metalhead-tmp
```
Expected: All Next.js files are now in `/mnt/d/my-workspace/metalhead` alongside `docs/`.

- [ ] **Step 3: Initialize shadcn/ui**

Run:
```bash
npx shadcn@latest init --yes --base-color neutral
```
Expected: `components.json`, `lib/utils.ts`, and updated `app/globals.css` created.

- [ ] **Step 4: Install required shadcn components**

Run:
```bash
npx shadcn@latest add button card input badge skeleton
```
Expected: Components created in `components/ui/`.

- [ ] **Step 5: Update `.gitignore` to exclude generated artifacts**

Modify `.gitignore` to ensure the following entries exist:

```gitignore
# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# next.js
/.next/
/out/

# production
/build

# misc
.DS_Store
*.pem

# debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# local env files
.env*.local

# vercel
.vercel

# typescript
*.tsbuildinfo
next-env.d.ts

# superpowers brainstorming artifacts
.superpowers/
```

- [ ] **Step 6: Install testing dependencies**

Run:
```bash
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 7: Add Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

Create `vitest.setup.ts`:

```ts
import '@testing-library/jest-dom/vitest'
```

- [ ] **Step 8: Add test script to package.json**

Modify `package.json` scripts section:

```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "test": "vitest"
}
```

- [ ] **Step 9: Run dev server to verify initialization**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 10: Commit**

Run:
```bash
git add .
git commit -m "chore: initialize Next.js + shadcn/ui + Vitest"
```

---

## Task 2: Configure Dark Metal Theme

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Define CSS variables in globals.css**

Replace the contents of `app/globals.css` with:

```css
@import "tailwindcss";

@theme inline {
  --color-background: #000000;
  --color-foreground: #e5e5e5;
  --color-card: #111111;
  --color-card-foreground: #e5e5e5;
  --color-popover: #111111;
  --color-popover-foreground: #e5e5e5;
  --color-primary: #dc2626;
  --color-primary-foreground: #000000;
  --color-secondary: #374151;
  --color-secondary-foreground: #e5e5e5;
  --color-muted: #1f1f1f;
  --color-muted-foreground: #9ca3af;
  --color-accent: #7f1d1d;
  --color-accent-foreground: #e5e5e5;
  --color-destructive: #dc2626;
  --color-destructive-foreground: #ffffff;
  --color-border: #333333;
  --color-input: #333333;
  --color-ring: #dc2626;
  --radius: 0.25rem;
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

- [ ] **Step 2: Load Google Fonts and apply to root layout**

Modify `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Bebas_Neue, Metal_Mania } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const metalMania = Metal_Mania({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-metal-mania",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MetalHead - 金属乐社区",
  description: "金属乐演出日历、乐队百科与社区动态",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${bebasNeue.variable} ${metalMania.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify theme is applied**

Run:
```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

Run:
```bash
git add app/globals.css app/layout.tsx
git commit -m "feat: configure dark metal theme and fonts"
```

---

## Task 3: Create Data Types and Repository Interfaces

**Files:**
- Create: `lib/data/types.ts`
- Create: `lib/data/repositories/event-repository.ts`
- Create: `lib/data/repositories/band-repository.ts`

- [ ] **Step 1: Write the failing test for data types**

Create `__tests__/lib/data/types.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import type { Event, Band, Post } from '@/lib/data/types'

describe('data types', () => {
  it('Event type compiles', () => {
    const event: Event = {
      id: '1',
      bandName: 'Test Band',
      date: '2025-08-12',
      venue: 'MAO Livehouse',
      city: '上海',
      genre: '黑金属',
    }
    expect(event.bandName).toBe('Test Band')
  })

  it('Band type compiles', () => {
    const band: Band = {
      id: '1',
      name: 'Test Band',
      genre: '黑金属',
      formedYear: 1990,
      country: '挪威',
      description: 'A test band',
    }
    expect(band.name).toBe('Test Band')
  })

  it('Post type compiles', () => {
    const post: Post = {
      id: '1',
      author: 'User',
      content: 'Hello',
      createdAt: '2025-08-12T10:00:00Z',
    }
    expect(post.content).toBe('Hello')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- __tests__/lib/data/types.test.ts
```
Expected: FAIL - module not found.

- [ ] **Step 3: Create data types**

Create `lib/data/types.ts`:

```ts
export interface Event {
  id: string
  bandName: string
  date: string
  venue: string
  city: string
  genre: string
  imageUrl?: string
}

export interface Band {
  id: string
  name: string
  genre: string
  formedYear: number
  country: string
  description: string
  imageUrl?: string
}

export interface Post {
  id: string
  author: string
  content: string
  createdAt: string
}
```

- [ ] **Step 4: Create repository interfaces**

Create `lib/data/repositories/event-repository.ts`:

```ts
import { Event } from '@/lib/data/types'

export interface EventRepository {
  getEvents(): Promise<Event[]>
  getEventById(id: string): Promise<Event | null>
}

export const eventRepository: EventRepository = {
  getEvents: async () => [],
  getEventById: async () => null,
}
```

Create `lib/data/repositories/band-repository.ts`:

```ts
import { Band } from '@/lib/data/types'

export interface BandRepository {
  getBands(): Promise<Band[]>
  getBandById(id: string): Promise<Band | null>
}

export const bandRepository: BandRepository = {
  getBands: async () => [],
  getBandById: async () => null,
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run:
```bash
npm test -- __tests__/lib/data/types.test.ts
```
Expected: PASS

- [ ] **Step 6: Commit**

Run:
```bash
git add lib/data __tests__
git commit -m "feat: add data types and repository interfaces"
```

---

## Task 4: Create Mock Data and Implementations

**Files:**
- Create: `lib/data/mock/events.ts`
- Create: `lib/data/mock/bands.ts`
- Modify: `lib/data/repositories/event-repository.ts`
- Modify: `lib/data/repositories/band-repository.ts`

- [ ] **Step 1: Write failing test for mock repositories**

Create `__tests__/lib/data/mock/events.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mockEventRepository } from '@/lib/data/mock/events'

describe('mockEventRepository', () => {
  it('returns events', async () => {
    const events = await mockEventRepository.getEvents()
    expect(events.length).toBeGreaterThan(0)
    expect(events[0]).toHaveProperty('bandName')
    expect(events[0]).toHaveProperty('city')
  })
})
```

Create `__tests__/lib/data/mock/bands.test.ts`:

```ts
import { describe, it, expect } from 'vitest'
import { mockBandRepository } from '@/lib/data/mock/bands'

describe('mockBandRepository', () => {
  it('returns bands', async () => {
    const bands = await mockBandRepository.getBands()
    expect(bands.length).toBeGreaterThan(0)
    expect(bands[0]).toHaveProperty('name')
    expect(bands[0]).toHaveProperty('genre')
  })
})
```

- [ ] **Step 2: Run tests to verify they fail**

Run:
```bash
npm test -- __tests__/lib/data/mock
```
Expected: FAIL - modules not found.

- [ ] **Step 3: Create mock events data and repository**

Create `lib/data/mock/events.ts`:

```ts
import { Event } from '@/lib/data/types'
import { EventRepository } from '@/lib/data/repositories/event-repository'

export const mockEvents: Event[] = [
  {
    id: 'evt-1',
    bandName: 'Cradle of Filth',
    date: '2025-08-12',
    venue: 'Modern Sky LAB',
    city: '上海',
    genre: 'Extreme Metal',
  },
  {
    id: 'evt-2',
    bandName: 'Nightwish',
    date: '2025-09-05',
    venue: '凯迪拉克中心',
    city: '北京',
    genre: 'Symphonic Metal',
  },
  {
    id: 'evt-3',
    bandName: '施教日',
    date: '2025-07-20',
    venue: 'MAO Livehouse',
    city: '广州',
    genre: '黑金属',
  },
]

export const mockEventRepository: EventRepository = {
  getEvents: async () => mockEvents,
  getEventById: async (id: string) =>
    mockEvents.find((event) => event.id === id) || null,
}
```

- [ ] **Step 4: Create mock bands data and repository**

Create `lib/data/mock/bands.ts`:

```ts
import { Band } from '@/lib/data/types'
import { BandRepository } from '@/lib/data/repositories/band-repository'

export const mockBands: Band[] = [
  {
    id: 'band-1',
    name: 'Mayhem',
    genre: '黑金属',
    formedYear: 1984,
    country: '挪威',
    description: '挪威黑金属先驱，以激进的现场表演著称。',
  },
  {
    id: 'band-2',
    name: 'Cannibal Corpse',
    genre: '死金',
    formedYear: 1988,
    country: '美国',
    description: '美国死亡金属代表乐队之一。',
  },
  {
    id: 'band-3',
    name: 'Sabaton',
    genre: '力量金属',
    formedYear: 1999,
    country: '瑞典',
    description: '以战争历史为主题的力量金属乐队。',
  },
]

export const mockBandRepository: BandRepository = {
  getBands: async () => mockBands,
  getBandById: async (id: string) =>
    mockBands.find((band) => band.id === id) || null,
}
```

- [ ] **Step 5: Update repository interfaces to export default implementations**

Modify `lib/data/repositories/event-repository.ts` to import and re-export the mock as default:

```ts
import { Event } from '@/lib/data/types'

export interface EventRepository {
  getEvents(): Promise<Event[]>
  getEventById(id: string): Promise<Event | null>
}
```

Modify `lib/data/repositories/band-repository.ts` similarly:

```ts
import { Band } from '@/lib/data/types'

export interface BandRepository {
  getBands(): Promise<Band[]>
  getBandById(id: string): Promise<Band | null>
}
```

- [ ] **Step 6: Run tests to verify they pass**

Run:
```bash
npm test -- __tests__/lib/data/mock
```
Expected: PASS

- [ ] **Step 7: Commit**

Run:
```bash
git add lib/data __tests__
git commit -m "feat: add mock events and bands repositories"
```

---

## Task 5: Create Navbar Component

**Files:**
- Create: `components/navbar.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Write failing test for Navbar**

Create `__tests__/components/navbar.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Navbar } from '@/components/navbar'

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)
    expect(screen.getByText('演出日历')).toBeInTheDocument()
    expect(screen.getByText('乐队百科')).toBeInTheDocument()
    expect(screen.getByText('社区动态')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- __tests__/components/navbar.test.tsx
```
Expected: FAIL - component not found.

- [ ] **Step 3: Implement Navbar component**

Create `components/navbar.tsx`:

```tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: '演出日历' },
  { href: '/bands', label: '乐队百科' },
  { href: '/community', label: '社区动态' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
        <Link
          href="/"
          className="font-[family-name:var(--font-bebas-neue)] text-3xl tracking-widest text-primary"
        >
          METALHEAD
        </Link>
        <ul className="flex items-center gap-6">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'text-sm font-semibold uppercase tracking-wide transition-colors hover:text-primary',
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                )}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
```

- [ ] **Step 4: Add Navbar to root layout**

Modify `app/layout.tsx` to include `<Navbar />`:

```tsx
import { Navbar } from '@/components/navbar'

// ... inside body:
<Navbar />
<main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
```

- [ ] **Step 5: Run test to verify it passes**

Run:
```bash
npm test -- __tests__/components/navbar.test.tsx
```
Expected: PASS

- [ ] **Step 6: Commit**

Run:
```bash
git add components/navbar.tsx __tests__/components/navbar.test.tsx app/layout.tsx
git commit -m "feat: add Navbar component"
```

---

## Task 6: Implement Home Page (Event Calendar)

**Files:**
- Create: `components/event-card.tsx`
- Create: `__tests__/components/event-card.test.tsx`
- Modify: `app/page.tsx`
- Create: `__tests__/app/page.test.tsx`

- [ ] **Step 1: Write failing test for EventCard**

Create `__tests__/components/event-card.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EventCard } from '@/components/event-card'
import { Event } from '@/lib/data/types'

describe('EventCard', () => {
  it('renders event details', () => {
    const event: Event = {
      id: '1',
      bandName: 'Test Band',
      date: '2025-08-12',
      venue: 'MAO',
      city: '上海',
      genre: '黑金属',
    }
    render(<EventCard event={event} />)
    expect(screen.getByText('Test Band')).toBeInTheDocument()
    expect(screen.getByText('上海 · MAO')).toBeInTheDocument()
    expect(screen.getByText('2025-08-12')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

Run:
```bash
npm test -- __tests__/components/event-card.test.tsx
```
Expected: FAIL

- [ ] **Step 3: Implement EventCard**

Create `components/event-card.tsx`:

```tsx
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
```

- [ ] **Step 4: Write failing test for Home page**

Create `__tests__/app/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

describe('HomePage', () => {
  it('renders event calendar heading and events', async () => {
    const page = await HomePage()
    render(page)
    expect(screen.getByText('近期演出')).toBeInTheDocument()
    expect(screen.getByText('Cradle of Filth')).toBeInTheDocument()
  })
})
```

- [ ] **Step 5: Implement Home page**

Replace `app/page.tsx`:

```tsx
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
```

- [ ] **Step 6: Run tests to verify they pass**

Run:
```bash
npm test -- __tests__/components/event-card.test.tsx __tests__/app/page.test.tsx
```
Expected: PASS

- [ ] **Step 7: Commit**

Run:
```bash
git add components/event-card.tsx __tests__/components/event-card.test.tsx app/page.tsx __tests__/app/page.test.tsx
git commit -m "feat: implement home page event calendar"
```

---

## Task 7: Implement Band Encyclopedia Page

**Files:**
- Create: `components/genre-filter.tsx`
- Create: `components/band-card.tsx`
- Create: `__tests__/components/genre-filter.test.tsx`
- Create: `__tests__/components/band-card.test.tsx`
- Create: `app/bands/page.tsx`
- Create: `__tests__/app/bands/page.test.tsx`

- [ ] **Step 1: Write failing test for GenreFilter**

Create `__tests__/components/genre-filter.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { GenreFilter } from '@/components/genre-filter'

describe('GenreFilter', () => {
  it('renders genres and calls onChange', () => {
    const onChange = vi.fn()
    render(
      <GenreFilter
        genres={['全部', '黑金属', '死金', '力量金属']}
        selected="全部"
        onChange={onChange}
      />
    )
    fireEvent.click(screen.getByText('黑金属'))
    expect(onChange).toHaveBeenCalledWith('黑金属')
  })
})
```

- [ ] **Step 2: Implement GenreFilter**

Create `components/genre-filter.tsx`:

```tsx
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
```

- [ ] **Step 3: Write failing test for BandCard**

Create `__tests__/components/band-card.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BandCard } from '@/components/band-card'
import { Band } from '@/lib/data/types'

describe('BandCard', () => {
  it('renders band details', () => {
    const band: Band = {
      id: '1',
      name: 'Test Band',
      genre: '黑金属',
      formedYear: 1990,
      country: '挪威',
      description: 'A test band',
    }
    render(<BandCard band={band} />)
    expect(screen.getByText('Test Band')).toBeInTheDocument()
    expect(screen.getByText('挪威 · 1990')).toBeInTheDocument()
  })
})
```

- [ ] **Step 4: Implement BandCard**

Create `components/band-card.tsx`:

```tsx
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
```

- [ ] **Step 5: Write failing test for Bands page**

Create `__tests__/app/bands/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BandsPage from '@/app/bands/page'

describe('BandsPage', () => {
  it('renders heading and bands', async () => {
    const page = await BandsPage()
    render(page)
    expect(screen.getByText('乐队百科')).toBeInTheDocument()
    expect(screen.getByText('Mayhem')).toBeInTheDocument()
  })
})
```

- [ ] **Step 6: Implement Bands page**

Create `app/bands/page.tsx`:

```tsx
'use client'

import { useState, useMemo } from 'react'
import { BandCard } from '@/components/band-card'
import { GenreFilter } from '@/components/genre-filter'
import { mockBands } from '@/lib/data/mock/bands'

const genres = ['全部', '黑金属', '死金', '力量金属']

export default function BandsPage() {
  const [selectedGenre, setSelectedGenre] = useState('全部')

  const filteredBands = useMemo(() => {
    if (selectedGenre === '全部') return mockBands
    return mockBands.filter((band) => band.genre === selectedGenre)
  }, [selectedGenre])

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl tracking-widest text-primary">
          乐队百科
        </h1>
        <p className="text-muted-foreground">按流派探索金属乐队。</p>
      </div>

      <GenreFilter genres={genres} selected={selectedGenre} onChange={setSelectedGenre} />

      {filteredBands.length === 0 ? (
        <p className="text-muted-foreground">该流派下暂无乐队。</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBands.map((band) => (
            <BandCard key={band.id} band={band} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 7: Run tests to verify they pass**

Run:
```bash
npm test -- __tests__/components/genre-filter.test.tsx __tests__/components/band-card.test.tsx __tests__/app/bands/page.test.tsx
```
Expected: PASS

- [ ] **Step 8: Commit**

Run:
```bash
git add components/genre-filter.tsx components/band-card.tsx app/bands __tests__
git commit -m "feat: implement band encyclopedia with genre filter"
```

---

## Task 8: Implement Community Feed Page

**Files:**
- Create: `components/post-card.tsx`
- Create: `components/post-form.tsx`
- Create: `__tests__/components/post-card.test.tsx`
- Create: `__tests__/components/post-form.test.tsx`
- Create: `app/community/page.tsx`
- Create: `__tests__/app/community/page.test.tsx`

- [ ] **Step 1: Write failing test for PostCard**

Create `__tests__/components/post-card.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PostCard } from '@/components/post-card'
import { Post } from '@/lib/data/types'

describe('PostCard', () => {
  it('renders post content', () => {
    const post: Post = {
      id: '1',
      author: 'Thrasher',
      content: '现场太炸了！',
      createdAt: '2025-08-12T10:00:00Z',
    }
    render(<PostCard post={post} />)
    expect(screen.getByText('Thrasher')).toBeInTheDocument()
    expect(screen.getByText('现场太炸了！')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Implement PostCard**

Create `components/post-card.tsx`:

```tsx
import { Post } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleString('zh-CN')

  return (
    <Card className="bg-card">
      <CardContent className="space-y-2 p-5">
        <div className="flex items-center justify-between">
          <span className="font-bold text-primary">{post.author}</span>
          <span className="text-xs text-muted-foreground">{date}</span>
        </div>
        <p className="text-foreground/90">{post.content}</p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 3: Write failing test for PostForm**

Create `__tests__/components/post-form.test.tsx`:

```tsx
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { PostForm } from '@/components/post-form'

describe('PostForm', () => {
  it('calls onSubmit with content', () => {
    const onSubmit = vi.fn()
    render(<PostForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByPlaceholderText('分享你的金属现场…'), {
      target: { value: '现场太炸了' },
    })
    fireEvent.click(screen.getByText('发布'))
    expect(onSubmit).toHaveBeenCalledWith('现场太炸了')
  })
})
```

- [ ] **Step 4: Implement PostForm**

Create `components/post-form.tsx`:

```tsx
'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface PostFormProps {
  onSubmit: (content: string) => void
}

export function PostForm({ onSubmit }: PostFormProps) {
  const [content, setContent] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return
    onSubmit(content.trim())
    setContent('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row">
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="分享你的金属现场…"
        className="flex-1 border-border bg-card text-foreground placeholder:text-muted-foreground"
      />
      <Button type="submit" className="bg-primary text-primary-foreground hover:bg-primary/90">
        发布
      </Button>
    </form>
  )
}
```

- [ ] **Step 5: Implement Community page with localStorage**

Create `app/community/page.tsx`:

```tsx
'use client'

import { useEffect, useState } from 'react'
import { PostCard } from '@/components/post-card'
import { PostForm } from '@/components/post-form'
import { Post } from '@/lib/data/types'

const STORAGE_KEY = 'metalhead-posts'

const defaultPosts: Post[] = [
  {
    id: 'post-1',
    author: 'Thrasher_99',
    content: '昨晚 Slayer tribute 现场太炸了！有人录了全程吗？',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
]

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(defaultPosts)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setPosts(JSON.parse(stored))
      }
    } catch {
      // Fallback to defaultPosts
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts))
    } catch {
      // Ignore storage errors
    }
  }, [posts])

  const handleAddPost = (content: string) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      author: `Anonymous_${Math.floor(Math.random() * 1000)}`,
      content,
      createdAt: new Date().toISOString(),
    }
    setPosts((prev) => [newPost, ...prev])
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-[family-name:var(--font-bebas-neue)] text-5xl tracking-widest text-primary">
          社区动态
        </h1>
        <p className="text-muted-foreground">分享现场、乐队与金属生活。</p>
      </div>

      <PostForm onSubmit={handleAddPost} />

      {posts.length === 0 ? (
        <p className="text-muted-foreground">还没有动态，做第一个发帖的人。</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 6: Write failing test for Community page**

Create `__tests__/app/community/page.test.tsx`:

```tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import CommunityPage from '@/app/community/page'

describe('CommunityPage', () => {
  it('renders heading and default post', () => {
    render(<CommunityPage />)
    expect(screen.getByText('社区动态')).toBeInTheDocument()
    expect(screen.getByText('Thrasher_99')).toBeInTheDocument()
  })
})
```

- [ ] **Step 7: Run tests to verify they pass**

Run:
```bash
npm test -- __tests__/components/post-card.test.tsx __tests__/components/post-form.test.tsx __tests__/app/community/page.test.tsx
```
Expected: PASS

- [ ] **Step 8: Commit**

Run:
```bash
git add components/post-card.tsx components/post-form.tsx app/community/page.tsx __tests__
git commit -m "feat: implement community feed with anonymous posts"
```

---

## Task 9: Final Build and Verification

**Files:**
- Modify: any remaining files as needed

- [ ] **Step 1: Run full test suite**

Run:
```bash
npm test
```
Expected: All tests PASS.

- [ ] **Step 2: Run production build**

Run:
```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 3: Start dev server and smoke test routes**

Run:
```bash
npm run dev
```
Expected: Server starts on `http://localhost:3000`.

Manually verify (or via Playwright if available):
- `/` shows event cards
- `/bands` shows genre filter and band cards
- `/community` shows post form and default post

- [ ] **Step 4: Commit final state**

Run:
```bash
git add .
git commit -m "chore: final build verification"
```

---

## Self-Review Checklist

- [ ] **Spec coverage:** 演出日历、乐队百科（流派筛选）、社区动态（匿名发帖）、暗黑金属 UI、可替换数据层全部有对应任务。
- [ ] **Placeholder scan:** 计划中没有 TBD/TODO/"implement later"/"添加适当错误处理" 等模糊步骤。
- [ ] **Type consistency:** `Event`、`Band`、`Post` 类型与 repository 接口、mock 数据、组件 props 完全一致。
- [ ] **No git conflicts:** 所有文件路径基于项目根目录，与已提交的 `docs/` 不冲突。
- [ ] **Tailwind CSS 4 compatible:** 主题通过 `@theme inline` 在 `globals.css` 中定义，不使用 `tailwind.config.ts`。

## Execution Handoff

Plan complete and saved to `docs/superpowers/plans/2026-06-29-metalhead-implementation-plan.md`.

Two execution options:

1. **Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration.
2. **Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints.

Which approach would you like?
