import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Vision — Identifie ta zone de génie, monétise-la',
  description: 'Un plan personnalisé généré par IA pour transformer tes compétences en revenus. Découvre ta zone de génie et lance ton activité en 90 jours.',
  keywords: ['monétisation compétences', 'freelance', 'solopreneur', 'formation en ligne', 'coaching'],
  openGraph: {
    title: 'Vision',
    description: 'Identifie ta zone de génie. Monétise-la. En 90 jours.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
