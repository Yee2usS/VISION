'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Lock, Check, ArrowRight, ChevronDown, Calendar, Phone } from 'lucide-react'
import Button from '@/components/ui/Button'
import { GeneratedPlan } from '@/types'

interface PlanRecord {
  id: string
  plan: GeneratedPlan
  status: string
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get('planId')
  const [planRecord, setPlanRecord] = useState<PlanRecord | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null)

  useEffect(() => {
    if (!planId) {
      setError('Plan non trouvé')
      setLoading(false)
      return
    }

    fetch(`/api/plan/${planId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error || !data.plan) {
          setError('Impossible de charger le plan')
        } else {
          setPlanRecord({ id: planId, plan: data.plan, status: data.status })
        }
        setLoading(false)
      })
      .catch(() => {
        setError('Impossible de charger le plan')
        setLoading(false)
      })
  }, [planId])

  async function handleCheckout(priceType: 'one-shot' | 'monthly') {
    setCheckoutLoading(priceType)
    try {
      const res = await fetch('/api/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceType, planId }),
      })
      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        console.error('Checkout error:', data.error)
        setCheckoutLoading(null)
      }
    } catch (err) {
      console.error(err)
      setCheckoutLoading(null)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-400">Chargement de ton plan...</p>
        </div>
      </div>
    )
  }

  if (error || !planRecord) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-zinc-400 mb-4">{error || 'Plan non trouvé'}</p>
          <Button onClick={() => router.push('/onboarding')}>Recommencer</Button>
        </div>
      </div>
    )
  }

  const plan = planRecord.plan

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="border-b border-[#1F1F23] bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">Ta zone de génie</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">{plan.geniusZone}</h1>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">{plan.geniusZoneDescription}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
        {/* Recommended offer — blurred */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Ce que l'IA recommande</h2>
          <div className="bg-surface border border-[#1F1F23] rounded-2xl p-6">
            <p className="text-gold font-semibold text-lg mb-2">{plan.recommendedOffer}</p>
            <div className="relative">
              <p className="text-zinc-400 leading-relaxed blur-sm select-none" aria-hidden>
                {plan.offerDescription}
              </p>
              <div className="absolute inset-0 flex items-center justify-center bg-surface/80 rounded-lg">
                <div className="flex items-center gap-2 text-zinc-400">
                  <Lock className="w-4 h-4" />
                  <span className="text-sm font-medium">Débloquer mon plan complet</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap preview */}
        <section>
          <h2 className="text-xl font-semibold text-white mb-4">Ta roadmap 90 jours</h2>
          <div className="space-y-3">
            {plan.roadmap?.map((week, i) => {
              const isVisible = i < 2
              return (
                <div
                  key={week.week}
                  className={`bg-surface border border-[#1F1F23] rounded-xl p-5 transition-all ${
                    !isVisible ? 'relative overflow-hidden' : ''
                  }`}
                >
                  {isVisible ? (
                    <>
                      <div className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center">
                          {week.week}
                        </span>
                        <div>
                          <p className="font-semibold text-white mb-1">{week.title}</p>
                          <p className="text-zinc-400 text-sm mb-3">{week.description}</p>
                          <ul className="space-y-1">
                            {week.actions.map((action, j) => (
                              <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                                <Check className="w-3.5 h-3.5 text-gold flex-shrink-0 mt-0.5" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="blur-sm select-none" aria-hidden>
                        <div className="flex items-start gap-4">
                          <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold/30 text-transparent text-xs font-bold flex items-center justify-center">
                            {week.week}
                          </span>
                          <div>
                            <p className="font-semibold text-zinc-600 mb-1">{week.title}</p>
                            <p className="text-zinc-700 text-sm">{week.description}</p>
                          </div>
                        </div>
                      </div>
                      {i === 2 && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-surface/50 to-surface rounded-xl">
                          <div className="flex items-center gap-2 text-zinc-400 bg-background/80 px-4 py-2 rounded-full border border-[#1F1F23]">
                            <Lock className="w-4 h-4" />
                            <span className="text-sm font-medium">10 semaines de plus disponibles</span>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Pricing section */}
        <section>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Débloquer ton plan complet</h2>
            <p className="text-zinc-400">Choisis la formule qui te correspond</p>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {/* One-shot */}
            <div className="bg-surface border border-[#1F1F23] rounded-2xl p-7 hover:border-gold/30 transition-all">
              <h3 className="font-semibold text-white text-lg mb-1">Le Plan</h3>
              <p className="text-zinc-400 text-sm mb-4">Plan complet, accès à vie</p>
              <p className="text-4xl font-bold text-white mb-6">97€</p>
              <ul className="space-y-2 mb-6">
                {['Plan complet débloqué', 'Roadmap 12 semaines', 'Export PDF'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-zinc-500" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                variant="outline"
                className="w-full"
                loading={checkoutLoading === 'one-shot'}
                onClick={() => handleCheckout('one-shot')}
              >
                Obtenir mon plan
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>

            {/* Monthly */}
            <div className="bg-surface border-2 border-gold rounded-2xl p-7 relative shadow-[0_0_30px_rgba(201,168,76,0.08)]">
              <div className="absolute -top-3 left-6">
                <span className="bg-gold text-background text-xs font-bold px-3 py-1 rounded-full">
                  Recommandé
                </span>
              </div>
              <h3 className="font-semibold text-white text-lg mb-1">Le Plan + Communauté</h3>
              <p className="text-zinc-400 text-sm mb-4">Plan + communauté privée</p>
              <p className="text-4xl font-bold text-white mb-6">
                29,95€<span className="text-base text-zinc-500 font-normal">/mois</span>
              </p>
              <ul className="space-y-2 mb-6">
                {['Tout du Plan +', 'Communauté Skool privée', 'Lives mensuels', 'Ressources exclusives'].map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-zinc-300">
                    <Check className="w-4 h-4 text-gold" />
                    {f}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full"
                loading={checkoutLoading === 'monthly'}
                onClick={() => handleCheckout('monthly')}
              >
                Rejoindre la communauté
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

        </section>

        {/* Coaching 1-on-1 */}
        <section>
          <div className="relative rounded-2xl border border-gold/30 bg-surface overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent pointer-events-none" />
            <div className="relative px-8 py-10 flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                <Phone className="w-6 h-6 text-gold" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="text-xs font-medium text-gold uppercase tracking-widest mb-2">Coaching 1-on-1</p>
                <h3 className="text-xl font-bold text-white mb-2">Tu veux aller plus vite ?</h3>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                  Un appel stratégique de 30 min pour clarifier ta zone de génie, valider ton offre et définir les 3 actions prioritaires. Gratuit, sans engagement.
                </p>
              </div>
              <a
                href="https://calendly.com/wealphialabs/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 inline-flex items-center gap-2 bg-gold text-background font-semibold px-6 py-3 rounded-xl hover:bg-gold/90 transition-colors whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                Réserver un appel gratuit
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ResultsContent />
    </Suspense>
  )
}
