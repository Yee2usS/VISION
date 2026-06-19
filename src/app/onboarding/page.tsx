import type { Metadata } from 'next'
import OnboardingTunnel from '@/components/onboarding/OnboardingTunnel'

export const metadata: Metadata = {
  title: 'Créer mon profil — Vision',
  description: 'Réponds à 6 questions pour identifier ta zone de génie et générer ton plan personnalisé.',
}

export default function OnboardingPage() {
  return <OnboardingTunnel />
}
