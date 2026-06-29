'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { RevealLayer } from './reveal-layer'

// Dark, dramatic textures that fit the Undertow metal aesthetic.
// The base image shows cracked, shadowy strata; the reveal image lights them up
// like molten veins beneath the surface.
const BG_IMAGE_1 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_195923_b0ba8ace-1d1d-4f2c-9a28-1ab84b330680.png&w=1280&q=85'
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85'

const navItems = [
  { label: '首页', href: '/', active: true },
  { label: '演出日历', href: '/bands' },
  { label: '乐队百科', href: '/community' },
  { label: '社区动态', href: '/community' },
]

// Per-letter chaos for the cinematic UNDERTOW title:
// size, vertical offset, rotation, and right margin.
const LETTER_CHAOS = [
  { size: 'text-6xl sm:text-7xl md:text-8xl', y: '-10px', rotate: '-3deg', spacing: '0.02em' },
  { size: 'text-7xl sm:text-8xl md:text-9xl', y: '14px', rotate: '2deg', spacing: '-0.04em' },
  { size: 'text-5xl sm:text-6xl md:text-7xl', y: '-4px', rotate: '-2deg', spacing: '0.01em' },
  { size: 'text-8xl sm:text-9xl md:text-[10rem]', y: '20px', rotate: '4deg', spacing: '-0.02em' },
  { size: 'text-6xl sm:text-7xl md:text-8xl', y: '-14px', rotate: '-4deg', spacing: '0em' },
  { size: 'text-7xl sm:text-8xl md:text-9xl', y: '8px', rotate: '1deg', spacing: '-0.03em' },
  { size: 'text-5xl sm:text-6xl md:text-7xl', y: '-8px', rotate: '-1deg', spacing: '0.02em' },
  { size: 'text-8xl sm:text-9xl md:text-[10rem]', y: '16px', rotate: '5deg', spacing: '-0.02em' },
]

export function Hero() {
  const mouse = useRef({ x: -999, y: -999 })
  const smooth = useRef({ x: -999, y: -999 })
  const rafRef = useRef<number>(0)
  const [cursorPos, setCursorPos] = useState({ x: -999, y: -999 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (smooth.current.x === -999) {
        smooth.current = { x: e.clientX, y: e.clientY }
      }
    }

    const animate = () => {
      smooth.current.x += (mouse.current.x - smooth.current.x) * 0.1
      smooth.current.y += (mouse.current.y - smooth.current.y) * 0.1
      setCursorPos({ x: smooth.current.x, y: smooth.current.y })
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <section
      className="relative w-full overflow-hidden bg-black"
      style={{ height: '100dvh' }}
    >
      {/* Base image */}
      <div
        className="hero-zoom absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${BG_IMAGE_1})`,
          zIndex: 10,
          filter: 'grayscale(20%) contrast(1.1) brightness(0.55)',
        }}
      />

      {/* Dark overlay to unify the palette */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"
        style={{ zIndex: 20 }}
      />

      {/* Vignette for cinematic dark mystery */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 21,
          background: 'radial-gradient(circle at 50% 40%, transparent 0%, rgba(0,0,0,0.45) 65%, rgba(0,0,0,0.85) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Reveal layer */}
      <RevealLayer
        image={BG_IMAGE_2}
        cursorX={cursorPos.x}
        cursorY={cursorPos.y}
      />

      {/* Navigation */}
      <nav className="fixed left-0 right-0 top-0 z-[100] flex items-center justify-between p-4 sm:p-5">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            fill="#dc2626"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="font-[family-name:var(--font-playfair)] text-2xl italic text-white">
            Undertow
          </span>
        </Link>

        {/* Center pill */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/10 px-2 py-2 backdrop-blur-md md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                item.active
                  ? 'text-white'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 md:block">
            加入社区
          </button>
          <button className="rounded-full p-2 text-white hover:bg-white/10 md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Heading */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-[12%] z-50 flex flex-col items-center px-5 text-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <h1 className="flex flex-col items-center gap-2 sm:gap-4">
          {/* Chinese subtitle - dark metallic seal */}
          <span
            className="hero-anim hero-reveal font-[family-name:var(--font-ma-shan-zheng)] text-3xl font-normal tracking-[0.12em] text-transparent sm:text-4xl md:text-5xl"
            style={{
              animationDelay: '0.2s',
              backgroundImage: 'linear-gradient(180deg, #e5e5e5 0%, #9ca3af 40%, #4b5563 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 18px rgba(220,38,38,0.25))',
            }}
          >
            暗流涌动
          </span>

          {/* Main title: UNDERTOW - Harry Potter / cinematic metal lettering */}
          <span
            className="hero-anim hero-reveal flex select-none items-baseline justify-center leading-[0.85]"
            style={{ animationDelay: '0.35s' }}
          >
            {'UNDERTOW'.split('').map((letter, i) => {
              const chaos = LETTER_CHAOS[i]
              return (
                <span
                  key={i}
                  className={`font-[family-name:var(--font-metal-mania)] ${chaos.size} inline-block text-transparent`}
                  style={{
                    backgroundImage:
                      'linear-gradient(175deg, #ffffff 0%, #d4d4d4 18%, #737373 40%, #e5e5e5 55%, #525252 78%, #a3a3a3 100%)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    transform: `translateY(${chaos.y}) rotate(${chaos.rotate})`,
                    filter: `
                      drop-shadow(0 1px 0 #000)
                      drop-shadow(0 1px 0 #1a0505)
                      drop-shadow(0 1px 0 #220808)
                      drop-shadow(0 1px 0 #2a0a0a)
                      drop-shadow(0 1px 0 #330d0d)
                      drop-shadow(0 2px 6px rgba(0,0,0,0.9))
                      drop-shadow(0 0 24px rgba(220,38,38,0.45))
                      drop-shadow(0 0 48px rgba(220,38,38,0.2))
                    `,
                    marginRight: chaos.spacing,
                  }}
                >
                  {letter}
                </span>
              )
            })}
          </span>

          {/* Tagline */}
          <span
            className="hero-anim hero-reveal mt-2 text-xs font-light uppercase tracking-[0.3em] text-white/60 sm:text-sm"
            style={{ animationDelay: '0.6s' }}
          >
            金属现场与社区
          </span>
        </h1>
      </div>

      {/* Bottom-left paragraph */}
      <div
        className="hero-anim hero-fade absolute bottom-14 left-10 z-50 hidden max-w-[280px] sm:block md:left-14"
        style={{ animationDelay: '0.7s', fontFamily: "'Inter', sans-serif" }}
      >
        <p className="text-sm leading-relaxed text-white/80">
          聚焦国内金属现场，从黑金属到力量金属，记录每一次失真、每一滴汗水，和台下涌动的人潮。
        </p>
      </div>

      {/* Bottom-right block */}
      <div
        className="hero-anim hero-fade absolute bottom-10 left-5 right-5 z-50 flex max-w-full flex-col items-start gap-4 sm:bottom-24 sm:left-auto sm:right-10 sm:max-w-[280px] sm:gap-5 md:right-14"
        style={{ animationDelay: '0.85s', fontFamily: "'Inter', sans-serif" }}
      >
        <p className="text-xs leading-relaxed text-white/80 sm:text-sm">
          在这里发现演出、探索乐队、分享现场。滑动光标，探照这片土地下燃烧的金属暗流。
        </p>
        <Link
          href="/bands"
          className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-all hover:scale-[1.03] hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
        >
          探索演出
        </Link>
      </div>
    </section>
  )
}
