'use client'

import PhaseWrapper from './PhaseWrapper'
import Button from '@/components/ui/Button'
import { OnboardingAnswers } from '@/types'

interface Phase5Props {
  values: OnboardingAnswers['phase5']
  onUpdate: (values: OnboardingAnswers['phase5']) => void
  onNext: () => void
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

// timeHorizon type is '1month' | '3months' | '6months' | ''
// '' represents the "Plus" / no specific horizon option
const horizonOptions: { typeValue: '1month' | '3months' | '6months' | ''; label: string }[] = [
  { typeValue: '1month', label: '1 mois' },
  { typeValue: '3months', label: '3 mois' },
  { typeValue: '6months', label: '6 mois' },
  { typeValue: 'more' as unknown as '', label: 'Plus' },
]

export default function Phase5({ values, onUpdate, onNext }: Phase5Props) {
  function update<K extends keyof OnboardingAnswers['phase5']>(
    key: K,
    val: OnboardingAnswers['phase5'][K]
  ) {
    onUpdate({ ...values, [key]: val })
  }

  // hoursPerWeek defaults to 10 so it's always > 0
  // timeHorizon is valid if it's any of the defined options (including '' for "Plus")
  // We track whether user has made a selection via whether timeHorizon changed from initial
  const horizonChosen = values.timeHorizon !== '' || horizonOptions.some(
    (o) => (o.typeValue as string) === 'more' && values.timeHorizon === ''
  )

  const canContinue =
    values.revenueGoal !== '' &&
    values.incomeLogic !== ''

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
            onChange={(e) => update('hoursPerWeek', Number(e.target.value))}
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
                onClick={() => update('revenueGoal', value)}
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
                onClick={() => update('incomeLogic', value)}
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
            {[
              { tv: '1month' as const, label: '1 mois' },
              { tv: '3months' as const, label: '3 mois' },
              { tv: '6months' as const, label: '6 mois' },
              { tv: '' as const, label: 'Plus' },
            ].map(({ tv, label }) => (
              <button
                key={label}
                onClick={() => update('timeHorizon', tv)}
                className={`py-3 px-2 rounded-xl border text-sm font-medium transition-all duration-200 text-center ${
                  values.timeHorizon === tv
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
        disabled={!canContinue}
        onClick={onNext}
        className="w-full"
      >
        Continuer
      </Button>
    </PhaseWrapper>
  )
}
