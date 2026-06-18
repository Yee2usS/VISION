'use client'

import { Check } from 'lucide-react'
import PhaseWrapper from './PhaseWrapper'
import Button from '@/components/ui/Button'
import { OnboardingAnswers } from '@/types'

interface Phase1Props {
  values: OnboardingAnswers['phase1']
  onUpdate: (values: OnboardingAnswers['phase1']) => void
  onNext: () => void
}

const options = [
  {
    key: 'startsProjects' as const,
    label: 'Je commence des projets, je m\'emballe, et quelques semaines plus tard je passe à autre chose',
  },
  {
    key: 'boughtUnfinishedCourse' as const,
    label: 'J\'ai déjà acheté une formation sans aller jusqu\'au bout',
  },
  {
    key: 'hasSkillsNoDirection' as const,
    label: 'J\'ai l\'impression d\'avoir des compétences réelles mais je sais pas quoi en faire',
  },
]

export default function Phase1({ values, onUpdate, onNext }: Phase1Props) {
  const canContinue =
    values.startsProjects === true ||
    values.boughtUnfinishedCourse === true ||
    values.hasSkillsNoDirection === true

  function toggle(key: keyof OnboardingAnswers['phase1']) {
    onUpdate({ ...values, [key]: !values[key] })
  }

  return (
    <PhaseWrapper
      step={1}
      title="Quelques secondes pour se reconnaître."
      subtitle="Coche ce qui te correspond. Tu peux cocher plusieurs cases."
    >
      <div className="space-y-3 mb-8">
        {options.map((option) => {
          const selected = values[option.key] === true
          return (
            <button
              key={option.key}
              onClick={() => toggle(option.key)}
              className={`w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 flex items-start gap-4 group ${
                selected
                  ? 'border-gold bg-gold/5 text-white'
                  : 'border-[#1F1F23] bg-surface text-zinc-300 hover:border-zinc-600'
              }`}
            >
              <div
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all ${
                  selected ? 'bg-gold border-gold' : 'border-zinc-600 group-hover:border-zinc-400'
                }`}
              >
                {selected && <Check className="w-3 h-3 text-background" strokeWidth={3} />}
              </div>
              <span className="text-sm leading-relaxed">{option.label}</span>
            </button>
          )
        })}
      </div>

      <Button
        onClick={onNext}
        disabled={!canContinue}
        size="lg"
        className="w-full"
      >
        Continuer
      </Button>
    </PhaseWrapper>
  )
}
