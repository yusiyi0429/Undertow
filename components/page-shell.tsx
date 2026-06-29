import { ReactNode } from 'react'

interface PageShellProps {
  children: ReactNode
  className?: string
}

export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className="relative min-h-screen bg-black px-4 pb-24 pt-28 sm:px-6">
      {/* subtle top glow line */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(220,38,38,0.4) 50%, transparent 100%)',
        }}
      />
      <div
        className={`relative mx-auto max-w-5xl ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
