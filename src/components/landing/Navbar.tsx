'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-background/80 border-b border-[#1F1F23]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1 text-white font-bold text-lg tracking-tight">
          Vis<span className="text-gold">ion</span>
        </Link>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#comment-ca-marche"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            Comment ça marche
          </a>
          <a
            href="#offres"
            className="text-zinc-400 hover:text-white transition-colors text-sm font-medium"
          >
            Offres
          </a>
        </div>

        {/* CTA */}
        <Link href="/onboarding">
          <Button size="sm">Commencer</Button>
        </Link>
      </div>
    </nav>
  )
}
