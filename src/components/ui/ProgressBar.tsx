interface ProgressBarProps {
  currentPhase: number
  totalPhases?: number
}

export default function ProgressBar({ currentPhase, totalPhases = 6 }: ProgressBarProps) {
  return (
    <div className="flex items-center gap-2 w-full max-w-md mx-auto">
      {Array.from({ length: totalPhases }).map((_, i) => {
        const phase = i + 1
        const isCompleted = phase < currentPhase
        const isCurrent = phase === currentPhase
        return (
          <div key={i} className="flex items-center flex-1">
            <div className={`
              w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300 flex-shrink-0
              ${isCompleted ? 'bg-gold text-background' : isCurrent ? 'bg-gold/20 border-2 border-gold text-gold' : 'bg-[#1F1F23] text-zinc-600'}
            `}>
              {isCompleted ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : phase}
            </div>
            {i < totalPhases - 1 && (
              <div className={`flex-1 h-0.5 mx-1 transition-all duration-300 ${isCompleted ? 'bg-gold' : 'bg-[#1F1F23]'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}
