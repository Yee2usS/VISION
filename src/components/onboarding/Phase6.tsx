'use client'

import { AlertCircle, HelpCircle, Shield, Clock, ArrowRight } from 'lucide-react'
import PhaseWrapper from './PhaseWrapper'
import Button from '@/components/ui/Button'
import { OnboardingAnswers } from '@/types'

interface Phase6Props {
  values: OnboardingAnswers['phase6']
  onUpdate: (values: OnboardingAnswers['phase6']) => void
  onSubmit: () => void
  isLoading: boolean
}

const blocks: {
  value: 'dontknowwhat' | 'dontknowho' | 'fearmistake' | 'notime'
  icon: React.ElementType
  title: string
  desc: string
}[] = [
  {
    value: 'dontknowwhat',
    icon: AlertCircle,
    title: 'Je sais pas quoi faire',
    desc: 'Le sujet, l\'offre, le positionnement — c\'est flou',
  },
  {
    value: 'dontknowho',
    icon: HelpCircle,
    title: 'Je sais pas comment faire',
    desc: 'Le technique, le business model, les outils',
  },
  {
    value: 'fearmistake',
    icon: Shield,
    title: 'J\'ai peur de me tromper',
    desc: 'Et si c\'est pas le bon moment ? Et si ça marche pas ?',
  },
  {
    value: 'notime',
    icon: Clock,
    title: 'J\'ai pas le temps',
    desc: 'Trop de choses à gérer, pas assez d\'heures dans la journée',
  },
]

export default function Phase6({ values, onUpdate, onSubmit, isLoading }: Phase6Props) {
  function update<K extends keyof OnboardingAnswers['phase6']>(key: K, val: OnboardingAnswers['phase6'][K]) {
    onUpdate({ ...values, [key]: val })
  }

  const canSubmit = values.mainBlock !== ''

  return (
    <PhaseWrapper
      step={6}
      title="Soyons honnêtes une seconde."
      subtitle="Ce frein, c'est la dernière information dont on a besoin pour ton plan."
    >
      <div className="space-y-7 mb-8">
        {/* Main block */}
        <div>
          <p className="text-sm font-medium text-white mb-3">
            Qu'est-ce qui t'a empêché de te lancer jusqu'ici ?
          </p>
          <div className="grid grid-cols-2 gap-3">
            {blocks.map((block) => {
              const Icon = block.icon
              const selected = values.mainBlock === block.value
              return (
                <button
                  key={block.value}
                  onClick={() => update('mainBlock', block.value)}
                  className={`p-4 rounded-xl border text-left transition-all duration-200 flex flex-col gap-2 ${
                    selected
                      ? 'border-gold bg-gold/5 text-white'
                      : 'border-[#1F1F23] bg-surface text-zinc-400 hover:border-zinc-600'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${selected ? 'text-gold' : 'text-zinc-500'}`} />
                  <p className="font-medium text-sm">{block.title}</p>
                  <p className="text-xs text-zinc-500 leading-snug">{block.desc}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Tried before */}
        <div>
          <p className="text-sm font-medium text-white mb-3">
            T'as déjà essayé de te lancer dans quelque chose avant ?
          </p>
          <div className="flex gap-3">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => update('triedBefore', v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  values.triedBefore === v
                    ? 'bg-gold border-gold text-background'
                    : 'bg-surface border-[#1F1F23] text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {v ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
        </div>

        {values.triedBefore === true && (
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Qu'est-ce qui n'a pas marché ?
            </label>
            <textarea
              value={values.triedDescription}
              onChange={(e) => update('triedDescription', e.target.value)}
              placeholder="Sois honnête — ça aide l'IA à éviter les mêmes erreurs dans ton plan"
              rows={3}
              className="w-full bg-surface border border-[#1F1F23] rounded-xl px-4 py-3 text-white placeholder-zinc-600 text-sm resize-none focus:outline-none focus:border-gold transition-colors"
            />
          </div>
        )}
      </div>

      <Button
        onClick={onSubmit}
        disabled={!canSubmit || isLoading}
        loading={isLoading}
        size="lg"
        className="w-full"
      >
        {!isLoading && (
          <>
            Générer mon plan
            <ArrowRight className="w-5 h-5" />
          </>
        )}
        {isLoading && 'Génération en cours...'}
      </Button>
    </PhaseWrapper>
  )
}
