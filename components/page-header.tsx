interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="mb-10 space-y-3">
      <h1 className="font-[family-name:var(--font-metal-mania)] text-5xl text-white sm:text-6xl md:text-7xl">
        {title}
      </h1>
      {subtitle && (
        <p className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-base">
          {subtitle}
        </p>
      )}
      <div
        className="h-0.5 w-24 rounded-full"
        style={{
          background:
            'linear-gradient(90deg, #dc2626 0%, rgba(220,38,38,0.2) 100%)',
        }}
      />
    </div>
  )
}
