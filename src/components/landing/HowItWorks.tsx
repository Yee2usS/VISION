'use client'

import { motion } from 'framer-motion'
import { MessageSquare, Brain, Map, Users } from 'lucide-react'

const steps = [
  {
    icon: MessageSquare,
    title: 'Tu réponds à 6 questions',
    description:
      'On analyse ton flow, tes compétences, tes contraintes et ce qui te bloque vraiment.',
  },
  {
    icon: Brain,
    title: "L'IA analyse ton profil",
    description:
      'Claude (Anthropic) croise tes réponses pour identifier ta zone de génie unique.',
  },
  {
    icon: Map,
    title: 'Tu reçois ton plan 90 jours',
    description:
      'Une roadmap semaine par semaine, une offre recommandée, un canal de distribution.',
  },
  {
    icon: Users,
    title: 'Tu choisis ton accompagnement',
    description:
      "Plan seul, plan + communauté, ou coaching personnalisé avec Max.",
  },
]

export default function HowItWorks() {
  return (
    <section id="comment-ca-marche" className="py-24 px-4 bg-surface border-y border-[#1F1F23]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-medium text-gold uppercase tracking-widest mb-3"
          >
            Processus
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Comment ça marche
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 text-lg"
          >
            De zéro à un plan clair — en 10 minutes.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#1F1F23] to-transparent" />

          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="relative text-center"
                >
                  {/* Step number + icon */}
                  <div className="relative inline-flex mb-6">
                    <div className="w-20 h-20 rounded-2xl bg-background border border-[#1F1F23] flex items-center justify-center">
                      <Icon className="w-8 h-8 text-gold" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-white mb-2 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
