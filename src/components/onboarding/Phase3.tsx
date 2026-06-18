'use client'

import PhaseWrapper from './PhaseWrapper'
import Button from '@/components/ui/Button'
import { OnboardingAnswers } from '@/types'

interface Phase3Props {
  values: OnboardingAnswers['phase3']
  onUpdate: (values: OnboardingAnswers['phase3']) => void
  onNext: () => void
}

const levelLabels: Record<number, string> = {
  1: 'Débutant', 2: 'Débutant', 3: 'Débutant',
  4: 'Intermédiaire', 5: 'Intermédiaire', 6: 'Intermédiaire',
  7: 'Avancé', 8: 'Avancé',
  9: 'Expert', 10: 'Expert',
}

interface YesNoProps {
  label: string
  value: boolean | null
  onChange: (val: boolean) => void
}

function YesNo({ label, value, onChange }: YesNoProps) {
  return (
    <div>
      <p className="text-sm font-medium text-white mb-2">{label}</p>
      <div className="flex gap-3">
        {[true, false].map((v) => (
          <button
            key={String(v)}
            onClick={() => onChange(v)}
            className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
              value === v
                ? 'bg-gold border-gold text-background'
                : 'bg-surface border-[#1F1F23] text-zinc-400 hover:border-zinc-600'
            }`}
          >
            {v ? 'Oui' : 'Non'}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function Phase3({ values, onUpdate, onNext }: Phase3Props) {
  function update<K extends keyof OnboardingAnswers['phase3']>(key: K, val: OnboardingAnswers['phase3'][K]) {
    onUpdate({ ...values, [key]: val })
  }

  const canContinue =
    values.helpedSomeone !== null &&
    values.hasTangibleProof !== null &&
    values.hasExistingAudience !== null

  return (
    <PhaseWrapper
      step={3}
      title="Évaluation de tes compétences."
      subtitle="Pas de bonne ou mauvaise réponse — sois honnête avec toi-même."
    >
      <div className="space-y-7 mb-8">
        {/* Skill level slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium text-white">
              Sur une échelle de 1 à 10, tu te situes où dans ce domaine ?
            </p>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gold">{values.skillLevel}</span>
              <span className="text-xs text-zinc-500 mt-1">{levelLabels[values.skillLevel]}</span>
            </div>
          </div>
          <input
            type="range"
            min={1}
            max={10}
            value={values.skillLevel}
            onChange={(e) => update('skillLevel', parseInt(e.target.value))}
            className="w-full accent-gold cursor-pointer"
            style={{ accentColor: '#C9A84C' }}
          />
          <div className="flex justify-between text-xs text-zinc-600 mt-1">
            <span>1 — Débutant</span>
            <span>10 — Expert</span>
          </div>
        </div>

        {/* Yes/No questions */}
        <YesNo
          label="T'as déjà aidé quelqu'un avec ça, même gratuitement ?"
          value={values.helpedSomeone}
          onChange={(v) => update('helpedSomeone', v)}
        />

        <div className="space-y-3">
          <YesNo
            label="T'as une preuve tangible — projet, résultat, retour client ?"
            value={values.hasTangibleProof}
            onChange={(v) => update('hasTangibleProof', v)}
          />
          {values.hasTangibleProof === true && (
            <textarea
              value={values.proofDescription}
              onChange={(e) => update('proofDescription', e.target.value)}
              placeholder="Décris-la en une phrase"
              rows={2}
              className="w-full bg-surface border border-[#1F1F23] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm resize-none focus:outline-none focus:border-gold transition-colors"
            />
          )}
        </div>

        <div className="space-y-3">
          <YesNo
            label="T'as une audience existante quelque part, même petite ?"
            value={values.hasExistingAudience}
            onChange={(v) => update('hasExistingAudience', v)}
          />
          {values.hasExistingAudience === true && (
            <textarea
              value={values.audienceDescription}
              onChange={(e) => update('audienceDescription', e.target.value)}
              placeholder="Où et combien de personnes environ ?"
              rows={2}
              className="w-full bg-surface border border-[#1F1F23] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm resize-none focus:outline-none focus:border-gold transition-colors"
            />
          )}
        </div>
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
