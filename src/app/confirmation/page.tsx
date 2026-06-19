'use client'

import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const planId = searchParams.get('planId')
  const isMonthly = searchParams.get('offer') === 'monthly'

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-lg text-center">
        {/* Icon */}
        <div className="flex items-center justify-center mb-8">
          <div className="w-20 h-20 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-gold" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
          C'est parti.
        </h1>
        <p className="text-2xl font-semibold text-gold mb-6">
          Ton plan est prêt.
        </p>
        <p className="text-zinc-400 text-lg leading-relaxed mb-10">
          Tu as maintenant une roadmap claire pour les 90 prochains jours. Voici tes prochaines étapes :
        </p>

        {/* Steps */}
        <div className="space-y-4 mb-8 text-left">
          {[
            'Accède à ton dashboard et lis ton plan en entier',
            'Note les 3 premières actions dans ton agenda',
            'Commence aujourd\'hui — même 20 minutes comptent',
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-4 bg-surface border border-[#1F1F23] rounded-xl p-4">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-background text-sm font-bold flex items-center justify-center">
                {i + 1}
              </span>
              <p className="text-white leading-relaxed pt-0.5">{step}</p>
            </div>
          ))}
        </div>

        {/* Monthly community notice */}
        {isMonthly && (
          <a
            href="https://www.skool.com/hustle-finance-by-max-7002/about"
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-gold/5 border border-gold/20 rounded-xl p-5 mb-8 text-left hover:bg-gold/10 transition-colors"
          >
            <p className="text-gold font-semibold mb-1">Communauté Skool privée</p>
            <p className="text-zinc-400 text-sm leading-relaxed mb-3">
              Accède dès maintenant aux lives mensuels et aux ressources exclusives.
            </p>
            <span className="text-gold text-sm font-medium">Rejoindre la communauté →</span>
          </a>
        )}

        {/* CTA */}
        <Link href={planId ? `/dashboard?planId=${planId}` : '/dashboard'}>
          <Button size="lg" className="w-full">
            Accéder à mon dashboard
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationContent />
    </Suspense>
  )
}
