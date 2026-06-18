'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import ProgressBar from '@/components/ui/ProgressBar'
import Phase1 from './Phase1'
import Phase2 from './Phase2'
import Phase3 from './Phase3'
import Phase4 from './Phase4'
import Phase5 from './Phase5'
import Phase6 from './Phase6'
import { OnboardingAnswers } from '@/types'

const initialAnswers: OnboardingAnswers = {
  phase1: {
    startsProjects: null,
    boughtUnfinishedCourse: null,
    hasSkillsNoDirection: null,
  },
  phase2: {
    flowActivity: '',
    helpRequested: '',
    sixMonthsFreedom: '',
    endlessSubject: '',
    obviousSkill: '',
  },
  phase3: {
    skillLevel: 5,
    helpedSomeone: null,
    hasTangibleProof: null,
    proofDescription: '',
    hasExistingAudience: null,
    audienceDescription: '',
  },
  phase4: {
    targetAudience: '',
    communicationStyle: [],
    hasOnlinePresence: null,
    workStyle: '',
  },
  phase5: {
    hoursPerWeek: 10,
    revenueGoal: '',
    incomeLogic: '',
    timeHorizon: '',
  },
  phase6: {
    mainBlock: '',
    triedBefore: null,
    triedDescription: '',
  },
}

export default function OnboardingTunnel() {
  const router = useRouter()
  const [currentPhase, setCurrentPhase] = useState<1 | 2 | 3 | 4 | 5 | 6>(1)
  const [answers, setAnswers] = useState<OnboardingAnswers>(initialAnswers)
  const [isGenerating, setIsGenerating] = useState(false)
  const [direction, setDirection] = useState(1)

  function handleNext() {
    if (currentPhase < 6) {
      setDirection(1)
      setCurrentPhase((prev) => (prev + 1) as 1 | 2 | 3 | 4 | 5 | 6)
    }
  }

  function handleBack() {
    if (currentPhase > 1) {
      setDirection(-1)
      setCurrentPhase((prev) => (prev - 1) as 1 | 2 | 3 | 4 | 5 | 6)
    }
  }

  async function handleSubmit() {
    setIsGenerating(true)
    try {
      const res = await fetch('/api/generate-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      })
      if (!res.ok) throw new Error('API error')
      const data = await res.json()
      router.push(`/results?planId=${data.planId}`)
    } catch (err) {
      console.error(err)
      setIsGenerating(false)
    }
  }

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -60 : 60,
      opacity: 0,
    }),
  }

  if (isGenerating) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-2 border-gold/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-gold animate-spin" />
            <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-gold/50 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">L'IA analyse ton profil...</h2>
          <p className="text-zinc-400 text-base max-w-sm">
            On croise tes réponses pour identifier ta zone de génie et construire ta roadmap personnalisée.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-[#1F1F23] py-4 px-4">
        <div className="max-w-2xl mx-auto flex items-center gap-4">
          {currentPhase > 1 && (
            <button
              onClick={handleBack}
              className="text-zinc-400 hover:text-white transition-colors flex-shrink-0"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
          )}
          <ProgressBar currentPhase={currentPhase} />
        </div>
      </div>

      {/* Phase content */}
      <div className="flex-1 flex items-center justify-center py-12">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentPhase}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="w-full"
          >
            {currentPhase === 1 && (
              <Phase1
                values={answers.phase1}
                onUpdate={(v) => setAnswers((a) => ({ ...a, phase1: v }))}
                onNext={handleNext}
              />
            )}
            {currentPhase === 2 && (
              <Phase2
                values={answers.phase2}
                onUpdate={(v) => setAnswers((a) => ({ ...a, phase2: v }))}
                onNext={handleNext}
              />
            )}
            {currentPhase === 3 && (
              <Phase3
                values={answers.phase3}
                onUpdate={(v) => setAnswers((a) => ({ ...a, phase3: v }))}
                onNext={handleNext}
              />
            )}
            {currentPhase === 4 && (
              <Phase4
                values={answers.phase4}
                onUpdate={(v) => setAnswers((a) => ({ ...a, phase4: v }))}
                onNext={handleNext}
              />
            )}
            {currentPhase === 5 && (
              <Phase5
                values={answers.phase5}
                onUpdate={(v) => setAnswers((a) => ({ ...a, phase5: v }))}
                onNext={handleNext}
              />
            )}
            {currentPhase === 6 && (
              <Phase6
                values={answers.phase6}
                onUpdate={(v) => setAnswers((a) => ({ ...a, phase6: v }))}
                onSubmit={handleSubmit}
                isLoading={isGenerating}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
