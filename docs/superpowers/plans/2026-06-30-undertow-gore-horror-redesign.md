# Undertow 血腥阴暗风格重设计 · 实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将 Undertow 现有暗色金属主题升级为血浆重口味恐怖风格，应用 Nosifer 字体、血红配色、暗黑网络素材，并更新所有相关组件。

**Architecture:** 通过更新 Tailwind CSS 变量、引入 Google Fonts（或本地字体兜底）、替换/增强现有 React 组件样式来实现视觉重设计；不引入新依赖，保持 shadcn/ui 组件不变，仅覆盖 className。

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 4, shadcn/ui (base-nova), Vitest, React Testing Library

---

## 文件变更总览

| 文件 | 操作 | 说明 |
|------|------|------|
| `app/globals.css` | 修改 | 更新颜色变量，新增字体变量 |
| `app/layout.tsx` | 修改 | 加载 Nosifer 字体 |
| `public/images/horror/dark-hero.jpg` | 创建 | Hero 背景图 |
| `public/images/horror/black-sand-texture.jpg` | 创建 | 纹理素材 |
| `public/fonts/Nosifer-Regular.ttf` | 创建（兜底） | 若 Google Fonts 不可用 |
| `components/hero.tsx` | 修改 | 应用 Nosifer 标题、暗黑背景、血红色叠加 |
| `components/navbar.tsx` | 修改 | Logo/导航新样式 |
| `components/page-header.tsx` | 修改 | 标题改用 Nosifer，增加左侧血线 |
| `components/band-card.tsx` | 修改 | 新卡片样式、纹理头像、Nosifer 乐队名 |
| `components/event-card.tsx` | 修改 | 与 BandCard 一致的风格 |
| `components/post-card.tsx` | 修改 | 左侧血线、Nosifer 用户名 |
| `components/post-form.tsx` | 修改 | 黑红表单风格 |
| `components/genre-filter.tsx` | 修改 | 新选中/未选中样式 |
| `__tests__/app/page.test.tsx` | 修改 | 更新断言以匹配当前 Hero 结构 |
| `__tests__/components/navbar.test.tsx` | 修改 | 更新导航文本断言 |

---

## Task 1: 准备图片与字体资源

**Files:**
- Create: `public/images/horror/dark-hero.jpg`
- Create: `public/images/horror/black-sand-texture.jpg`
- Create: `public/fonts/Nosifer-Regular.ttf`（本地兜底）

- [ ] **Step 1: 下载 Hero 背景图**

```bash
mkdir -p public/images/horror public/fonts
curl -sL -A "Mozilla/5.0" "https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?w=1920&q=85" -o public/images/horror/dark-hero.jpg
ls -la public/images/horror/dark-hero.jpg
```

Expected: file exists, size > 30KB.

- [ ] **Step 2: 下载纹理图**

```bash
curl -sL -A "Mozilla/5.0" "https://images.unsplash.com/photo-1533134486753-c833f0ed4866?w=800&q=80" -o public/images/horror/black-sand-texture.jpg
ls -la public/images/horror/black-sand-texture.jpg
```

Expected: file exists, size > 20KB.

- [ ] **Step 3: 下载 Nosifer 字体作为本地兜底**

```bash
curl -sL -A "Mozilla/5.0" "https://fonts.gstatic.com/s/nosifer/v23/ZGjXol5JTp0g5bxZaC0.ttf" -o public/fonts/Nosifer-Regular.ttf
file public/fonts/Nosifer-Regular.ttf
```

Expected: `TrueType Font data`.

---

## Task 2: 更新全局样式变量

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: 替换颜色变量为血腥配色，新增字体变量**

将 `@theme inline` 块更新为：

```css
@theme inline {
  --color-background: #050000;
  --color-foreground: #e5e5e5;
  --color-card: #0a0000;
  --color-card-foreground: #e5e5e5;
  --color-popover: #0a0000;
  --color-popover-foreground: #e5e5e5;
  --color-primary: #ff1a1a;
  --color-primary-foreground: #000000;
  --color-secondary: #1a0000;
  --color-secondary-foreground: #e5e5e5;
  --color-muted: #1a0000;
  --color-muted-foreground: #9ca3af;
  --color-accent: #7f0000;
  --color-accent-foreground: #e5e5e5;
  --color-destructive: #ff1a1a;
  --color-destructive-foreground: #ffffff;
  --color-border: #330a0a;
  --color-input: #1a0505;
  --color-ring: #ff1a1a;
  --font-bebas-neue: "Bebas Neue", sans-serif;
  --font-metal-mania: "Metal Mania", cursive;
  --font-ma-shan-zheng: "Ma Shan Zheng", cursive;
  --font-inter: "Inter", sans-serif;
  --font-playfair: "Playfair Display", serif;
  --font-nosifer: "Nosifer", cursive;
  --radius: 0.25rem;
}
```

- [ ] **Step 2: 更新 body 基础样式**

```css
@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-family: var(--font-inter), system-ui, sans-serif;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

- [ ] **Step 3: 运行构建检查样式是否生效**

```bash
npm run build
```

Expected: build succeeds or fails only with expected component errors that will be fixed in later tasks.

---

## Task 3: 在 layout.tsx 加载 Nosifer 字体

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: 使用 next/font/google 引入 Nosifer**

替换文件内容为：

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Nosifer } from "next/font/google";
import { Navigation } from "@/components/navigation";

const nosifer = Nosifer({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-nosifer",
  display: "swap",
  fallback: ["cursive"],
});

export const metadata: Metadata = {
  title: "Undertow · 暗流涌动",
  description: "暗流涌动 — 金属乐演出日历、乐队百科与社区动态",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`${nosifer.variable} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 验证字体变量可用**

```bash
npm run build
```

Expected: build 继续通过（若环境无法访问 Google Fonts，见 Task 9 本地兜底方案）。

---

## Task 4: 更新 Hero 组件

**Files:**
- Modify: `components/hero.tsx`

- [ ] **Step 1: 替换标题为 Nosifer 整体渲染，移除手动字母拆分**

关键修改点：

```tsx
<h1
  className="font-[family-name:var(--font-nosifer)] text-8xl text-[#ff0505] sm:text-9xl md:text-[120px]"
  style={{
    textShadow: `
      0 0 50px rgba(255,5,5,0.9),
      0 0 100px rgba(255,5,5,0.5),
      6px 6px 0 #000,
      8px 8px 0 #330000
    `,
    lineHeight: 1.1,
  }}
>
  UNDERTOW
</h1>
```

- [ ] **Step 2: 添加暗黑 Hero 背景图与血红叠加**

在背景层使用：

```tsx
<div
  className="hero-zoom absolute inset-0 bg-cover bg-center bg-no-repeat"
  style={{
    backgroundImage: `url(/images/horror/dark-hero.jpg)`,
    zIndex: 10,
    filter: 'grayscale(20%) contrast(1.2) brightness(0.45)',
  }}
/>
<div
  className="absolute inset-0"
  style={{
    zIndex: 11,
    background: 'linear-gradient(180deg, rgba(80,0,0,0.55) 0%, rgba(30,0,0,0.7) 50%, rgba(0,0,0,0.98) 100%)',
    mixBlendMode: 'multiply',
  }}
/>
```

- [ ] **Step 3: 移除所有手动 SVG/CSS 血滴，保留 Nosifer 自带滴血**

删除之前为硬扭字体添加的 `LETTER_CHAOS`、per-letter span 循环、以及任何额外 SVG 血滴。

- [ ] **Step 4: 运行首页测试**

```bash
npx vitest run __tests__/app/page.test.tsx
```

Expected: 若测试仍期望 "近期演出"，更新测试断言为 `screen.getByText('UNDERTOW')` 或 `screen.getByText('暗流涌动 · 金属现场与社区')`。

---

## Task 5: 更新 Navbar 组件

**Files:**
- Modify: `components/navbar.tsx`

- [ ] **Step 1: Logo 文字改用 Nosifer**

```tsx
<span className="font-[family-name:var(--font-nosifer)] text-xl text-white">
  Undertow
</span>
```

- [ ] **Step 2: 导航胶囊应用新边框/背景色**

```tsx
<div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[#ff1a1a]/35 bg-black/50 px-2 py-2 backdrop-blur-md md:flex">
```

- [ ] **Step 3: CTA 按钮应用红色半透明边框**

```tsx
<Link
  href="/community"
  prefetch={true}
  className="hidden rounded-full border border-[#ff1a1a]/55 bg-[#ff1a1a]/20 px-6 py-2.5 text-sm font-semibold text-[#ff4d4d] backdrop-blur-md transition-colors hover:bg-[#ff1a1a]/30 md:block"
>
  加入社区
</Link>
```

- [ ] **Step 4: 更新 navbar 测试断言**

由于导航项当前为 "首页 / 乐队百科 / 社区动态"，而测试期望 "演出日历"，需更新 `__tests__/components/navbar.test.tsx`：

```tsx
expect(screen.getByText('首页')).toBeInTheDocument()
expect(screen.getByText('乐队百科')).toBeInTheDocument()
expect(screen.getByText('社区动态')).toBeInTheDocument()
```

- [ ] **Step 5: 运行 navbar 测试**

```bash
npx vitest run __tests__/components/navbar.test.tsx
```

Expected: PASS.

---

## Task 6: 更新 PageHeader 组件

**Files:**
- Modify: `components/page-header.tsx`

- [ ] **Step 1: 应用 Nosifer 字体与左侧血线**

替换文件内容为：

```tsx
interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative mb-10 space-y-3 border-l-[5px] border-[#ff1a1a] pl-6">
      <h1 className="font-[family-name:var(--font-nosifer)] text-5xl text-[#ff1a1a] sm:text-6xl md:text-7xl"
          style={{ textShadow: '0 0 20px rgba(255,26,26,0.5)' }}>
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          {subtitle}
        </p>
      )}
      <div
        className="h-[3px] w-28 rounded-full"
        style={{
          background: 'linear-gradient(90deg, #ff1a1a 0%, transparent 100%)',
        }}
      />
    </div>
  )
}
```

- [ ] **Step 2: 运行 bands / community 页面测试**

```bash
npx vitest run __tests__/app/bands/page.test.tsx __tests__/app/community/page.test.tsx
```

Expected: PASS（标题文本未变，仅样式调整）。

---

## Task 7: 更新 BandCard 组件

**Files:**
- Modify: `components/band-card.tsx`

- [ ] **Step 1: 重写 BandCard 样式**

```tsx
import { Band } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface BandCardProps {
  band: Band
}

export function BandCard({ band }: BandCardProps) {
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
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-[family-name:var(--font-nosifer)] text-2xl leading-none text-white">
            {band.name}
          </h3>
          <Badge className="border-transparent bg-[#ff1a1a]/15 text-[#ff4d4d] hover:bg-[#ff1a1a]/25">
            {band.genre}
          </Badge>
        </div>
        <p className="text-xs font-medium uppercase tracking-wider text-[#ff9999]">
          {band.country} · {band.formedYear}
        </p>
        <p className="text-sm leading-relaxed text-white/70">{band.description}</p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: 运行 BandCard 测试**

```bash
npx vitest run __tests__/components/band-card.test.tsx
```

Expected: PASS.

---

## Task 8: 更新 EventCard 组件

**Files:**
- Modify: `components/event-card.tsx`

- [ ] **Step 1: 应用与 BandCard 一致的新风格**

```tsx
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
      <CardContent className="relative p-5">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-[#ff9999]">
          {event.date}
        </div>
        <h3 className="mb-2 font-[family-name:var(--font-nosifer)] text-2xl leading-none text-white">
          {event.bandName}
        </h3>
        <p className="mb-3 text-sm text-white/60">
          {event.city} · {event.venue}
        </p>
        <Badge
          variant="secondary"
          className="border-transparent bg-[#ff1a1a]/15 text-[#ff4d4d] hover:bg-[#ff1a1a]/25"
        >
          {event.genre}
        </Badge>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: 运行 EventCard 测试**

```bash
npx vitest run __tests__/components/event-card.test.tsx
```

Expected: PASS.

---

## Task 9: 更新 PostCard 组件

**Files:**
- Modify: `components/post-card.tsx`

- [ ] **Step 1: 应用左侧血线与 Nosifer 用户名**

```tsx
import { Post } from '@/lib/data/types'
import { Card, CardContent } from '@/components/ui/card'

interface PostCardProps {
  post: Post
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.createdAt).toLocaleString('zh-CN')

  return (
    <Card className="relative overflow-hidden border-l-0 bg-[#050000] ring-1 ring-[#1a0505] transition-all duration-300 hover:ring-[#330a0a]">
      <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[#ff1a1a] to-transparent" />
      <CardContent className="space-y-2 p-5 pl-6">
        <div className="flex items-center justify-between">
          <span className="font-[family-name:var(--font-nosifer)] text-sm text-[#ff1a1a]">
            {post.author}
          </span>
          <span className="text-xs text-white/40">{date}</span>
        </div>
        <p className="leading-relaxed text-white/85">{post.content}</p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Step 2: 运行 PostCard 测试**

```bash
npx vitest run __tests__/components/post-card.test.tsx
```

Expected: PASS.

---

## Task 10: 更新 PostForm 组件

**Files:**
- Modify: `components/post-form.tsx`

- [ ] **Step 1: 应用黑红表单风格**

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
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 rounded-xl border border-[#330a0a] bg-[#0a0000] p-4 ring-1 ring-[#1a0505] sm:flex-row sm:items-center sm:p-5"
    >
      <Input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="分享你的金属现场…"
        className="flex-1 border-[#1a0505] bg-[#050000] text-white placeholder:text-white/40 focus-visible:border-[#ff1a1a] focus-visible:ring-[#ff1a1a]/30"
      />
      <Button
        type="submit"
        className="bg-[#ff1a1a] font-extrabold uppercase tracking-wider text-black shadow-lg shadow-[#ff1a1a]/20 transition-all hover:bg-[#ff1a1a]/90 hover:shadow-[#ff1a1a]/40"
      >
        发布
      </Button>
    </form>
  )
}
```

- [ ] **Step 2: 运行 PostForm 测试**

```bash
npx vitest run __tests__/components/post-form.test.tsx
```

Expected: PASS.

---

## Task 11: 更新 GenreFilter 组件

**Files:**
- Modify: `components/genre-filter.tsx`

- [ ] **Step 1: 应用新的选中/未选中样式**

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
            'rounded-full px-5 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-200',
            selected === genre
              ? 'bg-[#ff1a1a] text-black shadow-lg shadow-[#ff1a1a]/30'
              : 'border border-[#330a0a] bg-[#0a0000] text-[#ff9999] hover:border-[#ff1a1a]/50 hover:text-white'
          )}
        >
          {genre}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 2: 运行 GenreFilter 测试**

```bash
npx vitest run __tests__/components/genre-filter.test.tsx
```

Expected: PASS.

---

## Task 12: 本地字体兜底（仅在 next/font/google 构建失败时执行）

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/fonts.ts`（可选）

- [ ] **Step 1: 若 `npm run build` 因无法访问 Google Fonts 失败，改用本地字体**

将 `app/layout.tsx` 中 `next/font/google` 部分替换为本地 CSS 变量：

```tsx
import type { Metadata } from "next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

export const metadata: Metadata = {
  title: "Undertow · 暗流涌动",
  description: "暗流涌动 — 金属乐演出日历、乐队百科与社区动态",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 2: 在 `app/globals.css` 顶部添加本地 @font-face**

```css
@font-face {
  font-family: 'Nosifer';
  src: url('/fonts/Nosifer-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

- [ ] **Step 3: 重新构建验证**

```bash
npm run build
```

Expected: build succeeds.

---

## Task 13: 全量测试与构建验证

**Files:**
- Run: `npm test`
- Run: `npm run build`

- [ ] **Step 1: 运行所有测试**

```bash
npm test
```

Expected: 所有测试 PASS。若因 pre-existing 测试断言与当前结构不符而失败，按 Task 4 / Task 5 说明更新对应测试。

- [ ] **Step 2: 运行生产构建**

```bash
npm run build
```

Expected: build succeeds with zero errors.

- [ ] **Step 3: 运行 lint**

```bash
npm run lint
```

Expected: no lint errors.

---

## 自我检查

**Spec 覆盖检查：**
- [x] 血浆重口味视觉方向 → Task 2 配色 + Task 4/5/6/7/8/9/10/11 组件样式
- [x] Nosifer 字体 → Task 3 layout + 各组件 `font-[family-name:var(--font-nosifer)]`
- [x] 网络暗黑素材 → Task 1 下载 + Task 4/7/8/9 引用
- [x] 移除额外血滴 → Task 4 明确删除
- [x] 全站一致 → 覆盖 Hero、Navbar、PageHeader、Band/Event/Post Card、PostForm、GenreFilter
- [x] 无障碍 → Task 2 body 使用 Inter，正文保持可读

**Placeholder 检查：**
- [x] 无 TBD/TODO
- [x] 每个代码步骤包含实际代码
- [x] 每个命令包含预期输出
- [x] 文件路径精确

**类型一致性检查：**
- [x] `--font-nosifer` 在 layout、globals.css、组件中一致
- [x] 颜色 `#ff1a1a`、背景 `#050000` 等在各组件中一致
