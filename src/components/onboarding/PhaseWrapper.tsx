interface PhaseWrapperProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  step: number
}

export default function PhaseWrapper({ title, subtitle, children, step }: PhaseWrapperProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div className="mb-8">
        <span className="text-xs font-medium text-gold uppercase tracking-widest">Étape {step} / 6</span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-2 mb-2">{title}</h2>
        {subtitle && <p className="text-zinc-400 text-base">{subtitle}</p>}
      </div>
      {children}
    </div>
  )
}
