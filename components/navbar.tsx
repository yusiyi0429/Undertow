'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'

const navItems = [
  { href: '/', label: '首页' },
  { href: '/bands', label: '乐队百科' },
  { href: '/community', label: '社区动态' },
]

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="fixed left-0 right-0 top-0 z-[100] px-4 py-4 sm:px-5">
      <nav className="relative mx-auto flex max-w-6xl items-center justify-between">
        {/* Logo */}
        <Link href="/" prefetch={true} className="flex items-center gap-3">
          <svg
            width="26"
            height="26"
            viewBox="0 0 256 256"
            fill="#dc2626"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="font-[family-name:var(--font-metal-mania)] text-2xl text-white">
            Undertow
          </span>
        </Link>

        {/* Center pill */}
        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-white/30 bg-white/10 px-2 py-2 backdrop-blur-md md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                  active
                    ? 'text-white'
                    : 'text-white/80 hover:bg-white/20 hover:text-white'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </div>

        {/* Right */}
        <div className="flex items-center gap-3">
          <Link
            href="/community"
            prefetch={true}
            className="hidden rounded-full border border-white/30 bg-white/10 px-6 py-2.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20 md:block"
          >
            加入社区
          </Link>
          <button className="rounded-full p-2 text-white hover:bg-white/10 md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </nav>
    </header>
  )
}
