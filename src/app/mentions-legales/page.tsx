import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions légales — Vision',
}

export default function MentionsLegales() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors mb-8 inline-block">
          ← Retour
        </Link>
        <h1 className="text-3xl font-bold text-white mb-10">Mentions légales</h1>

        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Éditeur du site</h2>
            <p>
              <strong className="text-zinc-300">Vision</strong> est un service édité par :<br />
              Wealphia Labs<br />
              Entreprise Individuelle (EI)<br />
              Exploitant : Maxime Hermoso<br />
              Adresse : Landes, France<br />
              SIRET : 88331849500024<br />
              Email : <a href="mailto:vision@wealphialabs.com" className="text-gold hover:underline">vision@wealphialabs.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Directeur de la publication</h2>
            <p>Maxime Hermoso</p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Hébergement</h2>
            <p>
              Ce site est hébergé par :<br />
              <strong className="text-zinc-300">Vercel Inc.</strong><br />
              340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis<br />
              <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">vercel.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Propriété intellectuelle</h2>
            <p>
              L'ensemble des contenus présents sur ce site (textes, images, graphismes, logo, icônes) sont la propriété exclusive de Wealphia Labs, sauf mention contraire. Toute reproduction, distribution ou utilisation sans autorisation préalable est interdite.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Limitation de responsabilité</h2>
            <p>
              Les informations et plans générés par Vision sont fournis à titre indicatif. Wealphia Labs ne saurait être tenu responsable des décisions prises par les utilisateurs sur la base des contenus générés par l'intelligence artificielle.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">Contact</h2>
            <p>
              Pour toute question : <a href="mailto:vision@wealphialabs.com" className="text-gold hover:underline">vision@wealphialabs.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
