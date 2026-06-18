'use client'

import { motion } from 'framer-motion'
import { Zap, Compass, Eye } from 'lucide-react'

const problems = [
  {
    number: '01',
    icon: Zap,
    title: 'Tu commences, tu t\'emballas, tu t\'arrêtes',
    description:
      "Un projet, une idée, une formation. T'es à fond pendant deux semaines. Puis la vie reprend. Et ça recommence.",
  },
  {
    number: '02',
    icon: Compass,
    title: 'T\'as quelque chose — mais tu sais pas quoi en faire',
    description:
      "Tu sens que t'as un truc. Mais mettre le doigt dessus, le nommer, en faire un business... c'est là que ça coince.",
  },
  {
    number: '03',
    icon: Eye,
    title: 'T\'as regardé les autres réussir en te demandant ce qu\'ils ont que t\'as pas',
    description:
      "Spoiler : ils ont pas plus que toi. Ils ont juste un plan clair et quelqu'un qui leur a dit par où commencer.",
  },
]

export default function Problem() {
  return (
    <section id="probleme" className="py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white leading-tight"
          >
            Le problème que tout le monde a
            <br />
            <span className="text-zinc-400">mais que personne ne dit</span>
          </motion.h2>
        </div>

        {/* Problem cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {problems.map((problem, i) => {
            const Icon = problem.icon
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-surface border border-[#1F1F23] rounded-2xl p-7 hover:border-gold/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center group-hover:bg-gold/15 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <span className="text-3xl font-bold text-[#1F1F23] group-hover:text-[#2A2A2E] transition-colors">
                    {problem.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-3 leading-snug">
                  {problem.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {problem.description}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Solution paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="h-px bg-gradient-to-r from-transparent via-[#1F1F23] to-transparent mb-12" />
          <p className="text-lg md:text-xl text-zinc-300 leading-relaxed">
            <span className="text-white font-semibold">Shift by Max, c'est pas une énième formation.</span>{' '}
            C'est un diagnostic. 10 minutes de questions. Un plan personnalisé. Et une direction claire
            pour les 90 jours qui suivent.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
