'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Animated background */}
      <style>{`
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.05); }
        }
        @keyframes pulse-glow-2 {
          0%, 100% { opacity: 0.2; transform: scale(1.05); }
          50% { opacity: 0.4; transform: scale(1); }
        }
        .hero-glow-1 {
          animation: pulse-glow 8s ease-in-out infinite;
        }
        .hero-glow-2 {
          animation: pulse-glow-2 10s ease-in-out infinite;
        }
      `}</style>

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Radial glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hero-glow-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          className="hero-glow-2 absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold/30 bg-gold/5 text-gold text-sm font-medium mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          Votre plan personnalisé en 10 minutes
        </motion.div>

        {/* H1 */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6"
        >
          T'as les compétences.
          <br />
          <span>Il manque juste </span>
          <span className="text-gradient-gold">le plan.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-zinc-400 leading-relaxed mb-10 max-w-2xl mx-auto"
        >
          6 questions pour analyser ta zone de génie. Une roadmap personnalisée sur 90 jours.
          Un plan d'action clair pour monétiser ce que tu sais déjà faire.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <Link href="/onboarding">
            <Button size="lg">
              Découvrir mon profil
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <a href="#comment-ca-marche">
            <Button size="lg" variant="ghost">
              Voir comment ça marche
            </Button>
          </a>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-0"
        >
          {[
            { value: '400+', label: 'profils analysés' },
            { value: '90 jours', label: 'pour voir les premiers résultats' },
            { value: '3 formats', label: "d'accompagnement" },
          ].map((stat, i) => (
            <div key={i} className="flex items-center">
              <div className="px-8 py-4 text-center">
                <p className="text-2xl font-bold text-white mb-0.5">{stat.value}</p>
                <p className="text-sm text-zinc-500">{stat.label}</p>
              </div>
              {i < 2 && (
                <div className="hidden sm:block w-px h-10 bg-[#1F1F23]" />
              )}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
