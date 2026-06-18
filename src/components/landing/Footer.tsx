import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[#1F1F23] bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="text-white font-bold text-lg tracking-tight">
          Shift by <span className="text-gold">Max</span>
        </Link>

        {/* Links */}
        <div className="flex items-center gap-6">
          {[
            { label: 'Mentions légales', href: '#' },
            { label: 'Politique de confidentialité', href: '#' },
            { label: 'CGV', href: '#' },
          ].map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Copyright */}
        <p className="text-zinc-600 text-sm">
          &copy; 2024 Shift by Max. Tous droits réservés.
        </p>
      </div>
    </footer>
  )
}
