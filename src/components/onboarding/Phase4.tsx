'use client'

import PhaseWrapper from './PhaseWrapper'
import Button from '@/components/ui/Button'
import { OnboardingAnswers } from '@/types'

interface Phase4Props {
  values: OnboardingAnswers['phase4']
  onUpdate: (values: OnboardingAnswers['phase4']) => void
  onNext: () => void
}

const targetOptions: { value: 'individuals' | 'professionals' | 'companies'; label: string; desc: string }[] = [
  { value: 'individuals', label: 'Particuliers', desc: 'Grand public, passionnés, apprenants' },
  { value: 'professionals', label: 'Professionnels', desc: 'Freelances, indépendants, salariés' },
  { value: 'companies', label: 'Entreprises', desc: 'PME, startups, grands comptes' },
]

const commStyles: { value: 'writing' | 'speaking' | 'video' | 'inperson'; label: string }[] = [
  { value: 'writing', label: 'À l\'écrit' },
  { value: 'speaking', label: 'À l\'oral' },
  { value: 'video', label: 'En vidéo' },
  { value: 'inperson', label: 'En présentiel' },
]

const workStyles: { value: 'solo' | 'contact'; label: string; desc: string }[] = [
  { value: 'solo', label: 'Travail solo', desc: 'Contenu, produits digitaux, formations en ligne' },
  { value: 'contact', label: 'Contact direct', desc: 'Coaching, consulting, service client' },
]

export default function Phase4({ values, onUpdate, onNext }: Phase4Props) {
  function update<K extends keyof OnboardingAnswers['phase4']>(key: K, val: OnboardingAnswers['phase4'][K]) {
    onUpdate({ ...values, [key]: val })
  }

  function toggleComm(style: 'writing' | 'speaking' | 'video' | 'inperson') {
    const current = values.communicationStyle
    const next = current.includes(style)
      ? current.filter((s) => s !== style)
      : [...current, style]
    update('communicationStyle', next)
  }

  const canContinue =
    values.targetAudience !== '' &&
    values.communicationStyle.length > 0 &&
    values.hasOnlinePresence !== null &&
    values.workStyle !== ''

  return (
    <PhaseWrapper
      step={4}
      title="Le marché et la distribution."
      subtitle="On va trouver où et comment tu vas toucher tes futurs clients."
    >
      <div className="space-y-7 mb-8">
        {/* Target audience */}
        <div>
          <p className="text-sm font-medium text-white mb-3">À qui tu veux t'adresser en priorité ?</p>
          <div className="grid grid-cols-3 gap-3">
            {targetOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => update('targetAudience', opt.value)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  values.targetAudience === opt.value
                    ? 'border-gold bg-gold/5 text-white'
                    : 'border-[#1F1F23] bg-surface text-zinc-400 hover:border-zinc-600'
                }`}
              >
                <p className="font-medium text-sm mb-1">{opt.label}</p>
                <p className="text-xs text-zinc-500 leading-snug">{opt.desc}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Communication style */}
        <div>
          <p className="text-sm font-medium text-white mb-3">
            Comment tu préfères communiquer ? (plusieurs choix possibles)
          </p>
          <div className="flex flex-wrap gap-2">
            {commStyles.map((s) => (
              <button
                key={s.value}
                onClick={() => toggleComm(s.value)}
                className={`px-4 py-2 rounded-full text-sm border transition-all duration-200 ${
                  values.communicationStyle.includes(s.value)
                    ? 'border-gold bg-gold/10 text-gold'
                    : 'border-[#1F1F23] bg-surface text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Online presence */}
        <div>
          <p className="text-sm font-medium text-white mb-3">
            T'as déjà une présence en ligne (réseau social, blog, chaîne...) ?
          </p>
          <div className="flex gap-3">
            {[true, false].map((v) => (
              <button
                key={String(v)}
                onClick={() => update('hasOnlinePresence', v)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all duration-200 ${
                  values.hasOnlinePresence === v
                    ? 'bg-gold border-gold text-background'
                    : 'bg-surface border-[#1F1F23] text-zinc-400 hover:border-zinc-600'
                }`}
              >
                {v ? 'Oui' : 'Non'}
              </button>
            ))}
          </div>
        </div>

        {/* Work style */}
        <div>
          <p className="text-sm font-medium text-white mb-3">Comment tu préfères travailler ?</p>
          <div className="grid grid-cols-2 gap-3">
            {workStyles.map((ws) => (
              <button
                key={ws.value}
                onClick={() => update('workStyle', ws.value)}
                className={`p-4 rounded-xl border text-left transition-all duration-200 ${
                  values.workStyle === ws.value
                    ? 'border-gold bg-gold/5 text-white'
                    : 'border-[#1F1F23] bg-surface text-zinc-400 hover:border-zinc-600'
                }`}
              >
                <p className="font-medium text-sm mb-1">{ws.label}</p>
                <p className="text-xs text-zinc-500 leading-snug">{ws.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={onNext} disabled={!canContinue} size="lg" className="w-full">
        Continuer
      </Button>
    </PhaseWrapper>
  )
}
