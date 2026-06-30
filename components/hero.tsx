'use client'

import { useEffect, useRef, useState } from 'react'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { RevealLayer } from './reveal-layer'

// Dark, dramatic textures that fit the Undertow metal aesthetic.
// The base image shows cracked, shadowy strata; the reveal image lights them up
// like molten veins beneath the surface.
const BG_IMAGE_1 = '/images/horror/dark-hero.jpg'
const BG_IMAGE_2 =
  'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260609_201152_bba90a12-bf12-459f-91f0-51f237dbaf3b.png&w=1280&q=85'

const navItems = [
  { label: '首页', href: '/', active: true },
  { label: '乐队百科', href: '/bands' },
  { label: '社区动态', href: '/community' },
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
          filter: 'grayscale(20%) contrast(1.2) brightness(0.45)',
        }}
      />

      {/* Blood-red multiply overlay */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 11,
          background: 'linear-gradient(180deg, rgba(80,0,0,0.55) 0%, rgba(30,0,0,0.7) 50%, rgba(0,0,0,0.98) 100%)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* Dark overlay to unify the palette */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/80"
        style={{ zIndex: 12 }}
      />

      {/* Vignette for cinematic dark mystery */}
      <div
        className="absolute inset-0"
        style={{
          zIndex: 13,
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
            fill="#ff1a1a"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="font-[family-name:var(--font-nosifer)] text-xl text-white">
            Undertow
          </span>
        </Link>

        {/* Center pill */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[#ff1a1a]/35 bg-black/50 px-2 py-2 backdrop-blur-md md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              prefetch={true}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                item.active
                  ? 'text-[#ff4d4d]'
                  : 'text-white/80 hover:bg-white/20 hover:text-white'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <button className="hidden rounded-full border border-[#ff1a1a]/55 bg-[#ff1a1a]/20 px-6 py-2.5 text-sm font-semibold text-[#ff4d4d] backdrop-blur-md transition-colors hover:bg-[#ff1a1a]/30 md:block">
            加入社区
          </button>
          <button className="rounded-full p-2 text-white hover:bg-white/10 md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Heading */}
      <div
        className="pointer-events-none absolute left-0 right-0 top-[16%] z-50 flex flex-col items-center px-2 text-center sm:top-[14%]"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <h1
          className="hero-anim hero-reveal font-[family-name:var(--font-nosifer)] text-8xl text-[#ff0505] sm:text-9xl md:text-[120px]"
          style={{
            animationDelay: '0.3s',
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

        {/* Tagline */}
        <span
          className="hero-anim hero-reveal mt-4 text-xs font-light uppercase tracking-[0.45em] text-[#ff9999] sm:mt-6 sm:text-sm"
          style={{ animationDelay: '0.55s' }}
        >
          暗流涌动 · 金属现场与社区
        </span>
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

    </section>
  )
}
