'use client'

import { useState } from 'react'
import PhaseWrapper from './PhaseWrapper'
import Button from '@/components/ui/Button'
import { OnboardingAnswers } from '@/types'

interface Phase5Props {
  data: OnboardingAnswers['phase5']
  onNext: (data: OnboardingAnswers['phase5']) => void
}

const revenueOptions: { value: '500' | '2000' | '5000' | 'more'; label: string }[] = [
  { value: '500', label: '500€/mois' },
  { value: '2000', label: '2 000€/mois' },
  { value: '5000', label: '5 000€/mois' },
  { value: 'more', label: 'Plus' },
]

const incomeOptions: { value: 'complement' | 'fulltime'; label: string; desc: string }[] = [
  { value: 'complement', label: 'Complément de revenu', desc: 'T\'as déjà une activité principale' },
  { value: 'fulltime', label: 'Reconversion totale', desc: 'Tu veux en vivre à plein temps' },
]

// 'more' maps to '' in the type union (timeHorizon: '1month' | '3months' | '6months' | '')
// The empty string '' represents "Plus" / no specific horizon
const horizonOptions: { value: '1month' | '3months' | '6months' | 'more'; label: string; typeValue: '1month' | '3months' | '6months' | '' }[] = [
  { value: '1month', label: '1 mois', typeValue: '1month' },
  { value: '3months', label: '3 mois', typeValue: '3months' },
  { value: '6months', label: '6 mois', typeValue: '6months' },
  { value: 'more', label: 'Plus', typeValue: '' },
]

export default function Phase5({ data, onNext }: Phase5Props) {
  const [values, setValues] = useState<OnboardingAnswers['phase5']>(data)

  const canContinue =
    values.revenueGoal !== '' &&
    values.incomeLogic !== '' &&
    values.hoursPerWeek > 0 &&
    // horizon is either a concrete value or the user explicitly chose '' (Plus)
    (values.timeHorizon !== '' || horizonOptions.some((o) => o.typeValue === values.timeHorizon))

  // Simpler: consider any selection of the horizon valid, including ''
  // Track whether user has made a horizon selection separately
  const [horizonSelected, setHorizonSelected] = useState(data.timeHorizon !== '' || false)

  const canActuallyContinue =
    values.revenueGoal !== '' &&
    values.incomeLogic !== '' &&
    values.hoursPerWeek > 0 &&
    horizonSelected

  return (
    <PhaseWrapper
      step={5}
      title="Tes contraintes et tes ambitions."
      subtitle="Sois réaliste. Un bon plan, c'est un plan adapté à ta vraie vie."
    >
      <div className="space-y-8 mb-8">
        {/* Hours per week */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-white">
              Combien d'heures par semaine tu peux y consacrer ?
            </label>
            <span className="text-xl font-bold text-gold">{values.hoursPerWeek}h/sem</span>
          </div>
          <input
            type="range"
            min={1}
            max={40}
            step={1}
            value={values.hoursPerWeek}
            onChange={(e) => setValues((prev) => ({ ...prev, hoursPerWeek: Number(e.target.value) }))}
            className="w-full cursor-pointer"
            style={{ accentColor: '#C9A84C' }}
          />
          <div className="flex justify-between text-xs text-zinc-600 mt-1">
            <span>1h</span>
            <span>40h</span>
          </div>
        </div>

        {/* Revenue goal */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Quel serait un premier objectif financier réaliste ?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {revenueOptions.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setValues((prev) => ({ ...prev, revenueGoal: value }))}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all duration-200 ${
                  values.revenueGoal === value
                    ? 'border-gold bg-gold/5 text-gold'
                    : 'border-[#1F1F23] bg-surface text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Income logic */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Tu es dans quelle logique ?
          </label>
          <div className="grid gap-3">
            {incomeOptions.map(({ value, label, desc }) => (
              <button
                key={value}
                onClick={() => setValues((prev) => ({ ...prev, incomeLogic: value }))}
                className={`text-left p-4 rounded-xl border transition-all duration-200 ${
                  values.incomeLogic === value
                    ? 'border-gold bg-gold/5 text-white'
                    : 'border-[#1F1F23] bg-surface text-zinc-400 hover:border-zinc-600'
                }`}
              >
                <div className="font-medium text-sm">{label}</div>
                <div className="text-xs text-zinc-500 mt-0.5">{desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time horizon */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            Dans combien de temps tu veux voir des premiers résultats ?
          </label>
          <div className="grid grid-cols-4 gap-2">
            {horizonOptions.map(({ value, label, typeValue }) => (
              <button
                key={value}
                onClick={() => {
                  setValues((prev) => ({ ...prev, timeHorizon: typeValue }))
                  setHorizonSelected(true)
                }}
                className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-200 text-center ${
                  horizonSelected && values.timeHorizon === typeValue
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-[#1F1F23] bg-surface text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button
        size="lg"
        disabled={!canActuallyContinue}
        onClick={() => onNext(values)}
        className="w-full"
      >
        Continuer
      </Button>
    </PhaseWrapper>
  )
}
