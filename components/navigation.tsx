'use client'

import { usePathname } from 'next/navigation'
import { Navbar } from './navbar'

export function Navigation() {
  const pathname = usePathname()

  // The homepage renders its own fixed navigation inside the Hero section
  if (pathname === '/') {
    return null
  }

  return <Navbar />
}
