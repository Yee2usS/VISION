'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'

const offers = [
  {
    id: 'one-shot',
    name: 'Le Plan',
    price: '97',
    period: 'paiement unique',
    description: 'Ton plan personnalisé complet, à vie.',
    features: [
      'Plan personnalisé complet',
      'Roadmap 90 jours détaillée',
      'Export PDF',
      'Accès à vie à ton plan',
    ],
    cta: 'Obtenir mon plan',
    href: '/onboarding',
    recommended: false,
  },
  {
    id: 'monthly',
    name: 'Le Plan + Communauté',
    price: '29,95',
    period: 'par mois',
    description: 'Le plan complet + une communauté pour avancer.',
    features: [
      'Tout ce qu\'il y a dans Le Plan +',
      'Accès communauté Skool privée',
      'Lives mensuels avec Max',
      'Ressources exclusives',
      'Chat direct avec la communauté',
    ],
    cta: 'Rejoindre la communauté',
    href: '/onboarding',
    recommended: true,
  },
  {
    id: 'discovery',
    name: "L'Accompagnement",
    price: null,
    period: 'sur mesure',
    description: 'Coaching 1-on-1 personnalisé avec Max.',
    features: [
      'Diagnostic approfondi',
      'Sessions hebdomadaires',
      'Suivi personnalisé',
      'Accès direct par message',
    ],
    cta: 'Réserver un appel gratuit',
    href: process.env.NEXT_PUBLIC_CALENDLY_URL || '#',
    recommended: false,
    note: 'Appel découverte gratuit — sans engagement',
  },
]

export default function Offers() {
  return (
    <section id="offres" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-gold uppercase tracking-widest mb-3"
          >
            Tarifs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Choisis ton niveau d'engagement
          </motion.h2>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {offers.map((offer, i) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-1 ${
                offer.recommended
                  ? 'bg-surface border-2 border-gold shadow-[0_0_40px_rgba(201,168,76,0.1)]'
                  : 'bg-surface border border-[#1F1F23] hover:border-gold/30'
              }`}
            >
              {/* Recommended badge */}
              {offer.recommended && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="bg-gold text-background text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Recommandé
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">{offer.name}</h3>
                <p className="text-zinc-400 text-sm mb-4">{offer.description}</p>
                <div className="flex items-baseline gap-1">
                  {offer.price ? (
                    <>
                      <span className="text-4xl font-bold text-white">{offer.price}€</span>
                      <span className="text-zinc-500 text-sm">/{offer.period}</span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold text-white capitalize">{offer.period}</span>
                  )}
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {offer.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <Check
                      className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                        offer.recommended ? 'text-gold' : 'text-zinc-500'
                      }`}
                    />
                    <span className="text-zinc-300 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={offer.href}>
                <Button
                  variant={offer.recommended ? 'primary' : 'outline'}
                  className="w-full"
                >
                  {offer.cta}
                </Button>
              </Link>

              {/* Note */}
              {offer.note && (
                <p className="text-zinc-500 text-xs text-center mt-3">{offer.note}</p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
