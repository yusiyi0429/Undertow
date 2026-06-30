interface PageHeaderProps {
  title: string
  subtitle?: string
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative mb-10 space-y-3 border-l-[5px] border-[#ff1a1a] pl-6">
      <h1
        className="font-[family-name:var(--font-nosifer)] text-5xl text-[#ff1a1a] sm:text-6xl md:text-7xl"
        style={{ textShadow: '0 0 20px rgba(255,26,26,0.5)' }}
      >
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
