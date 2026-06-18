'use client'

import { useRef } from 'react'
import PhaseWrapper from './PhaseWrapper'
import Button from '@/components/ui/Button'
import { OnboardingAnswers } from '@/types'

interface Phase2Props {
  values: OnboardingAnswers['phase2']
  onUpdate: (values: OnboardingAnswers['phase2']) => void
  onNext: () => void
}

const questions = [
  {
    key: 'flowActivity' as const,
    label: 'Quand tu perds la notion du temps, t\'es en train de faire quoi ?',
    placeholder: 'Ex: concevoir des interfaces, écrire, expliquer des concepts...',
  },
  {
    key: 'helpRequested' as const,
    label: 'Qu\'est-ce que les gens te demandent souvent de l\'aide pour faire ?',
    placeholder: 'Ex: rédiger leurs emails, régler leurs problèmes techniques, les conseiller sur...',
  },
  {
    key: 'sixMonthsFreedom' as const,
    label: 'Si t\'avais 6 mois sans contraintes financières, tu passerais ton temps sur quoi ?',
    placeholder: 'Sois honnête — pas la réponse "correcte", la vraie.',
  },
  {
    key: 'endlessSubject' as const,
    label: 'Y\'a un sujet sur lequel tu peux parler des heures sans te lasser ?',
    placeholder: 'Ex: la psychologie, les finances perso, le design, le sport...',
  },
  {
    key: 'obviousSkill' as const,
    label: 'Qu\'est-ce que tu sais faire qui te paraît tellement évident que t\'imagines pas que d\'autres le paieraient ?',
    placeholder: 'Ce truc que tu fais naturellement et que les autres galèrent à faire...',
  },
]

export default function Phase2({ values, onUpdate, onNext }: Phase2Props) {
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([])

  const canContinue = questions.every((q) => (values[q.key] || '').trim().length > 0)

  function handleInput(key: keyof OnboardingAnswers['phase2'], value: string, index: number) {
    onUpdate({ ...values, [key]: value })
    // Auto-resize
    const el = textareaRefs.current[index]
    if (el) {
      el.style.height = 'auto'
      el.style.height = `${el.scrollHeight}px`
    }
  }

  return (
    <PhaseWrapper
      step={2}
      title="Ce qui t'anime vraiment."
      subtitle="Réponds honnêtement. Ces réponses sont la base de ton plan."
    >
      <div className="space-y-6 mb-8">
        {questions.map((q, i) => (
          <div key={q.key}>
            <label className="block text-sm font-medium text-white mb-2">
              {q.label}
            </label>
            <textarea
              ref={(el) => { textareaRefs.current[i] = el }}
              value={values[q.key]}
              onChange={(e) => handleInput(q.key, e.target.value, i)}
              placeholder={q.placeholder}
              rows={2}
              className="w-full bg-surface border border-[#1F1F23] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm resize-none focus:outline-none focus:border-gold transition-colors leading-relaxed overflow-hidden"
              style={{ minHeight: '72px' }}
            />
          </div>
        ))}
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
