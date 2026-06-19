import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité — Vision',
}

export default function PolitiqueConfidentialite() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors mb-8 inline-block">
          ← Retour
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Politique de confidentialité</h1>
        <p className="text-zinc-500 text-sm mb-10">Dernière mise à jour : juin 2026</p>

        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Données collectées</h2>
            <p>Lors de l'utilisation de Vision, nous collectons :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Les réponses au questionnaire d'onboarding (stockées en base de données)</li>
              <li>L'adresse email, si fournie lors du paiement</li>
              <li>Les données de paiement, traitées exclusivement par Stripe (nous ne stockons aucune donnée bancaire)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Finalité du traitement</h2>
            <p>Les données collectées sont utilisées pour :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Générer votre plan personnalisé via intelligence artificielle</li>
              <li>Traiter votre paiement</li>
              <li>Vous envoyer votre plan par email</li>
              <li>Améliorer nos services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Base légale</h2>
            <p>
              Le traitement de vos données est fondé sur l'exécution du contrat (fourniture du service) et votre consentement pour les communications par email.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. Sous-traitants</h2>
            <p>Nous faisons appel aux sous-traitants suivants :</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong className="text-zinc-300">Supabase</strong> — hébergement de la base de données</li>
              <li><strong className="text-zinc-300">Stripe</strong> — traitement des paiements</li>
              <li><strong className="text-zinc-300">Anthropic</strong> — génération de contenu par IA</li>
              <li><strong className="text-zinc-300">Resend</strong> — envoi d'emails transactionnels</li>
              <li><strong className="text-zinc-300">Vercel</strong> — hébergement du site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Durée de conservation</h2>
            <p>
              Vos données sont conservées pendant la durée nécessaire à la fourniture du service, et au maximum 3 ans après votre dernière interaction avec Vision.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de portabilité et d'opposition. Pour exercer ces droits, contactez-nous à :{' '}
              <a href="mailto:vision@wealphialabs.com" className="text-gold hover:underline">vision@wealphialabs.com</a>
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Cookies</h2>
            <p>
              Ce site utilise des cookies techniques strictement nécessaires au fonctionnement du service. Aucun cookie publicitaire ou de tracking tiers n'est déposé.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Contact</h2>
            <p>
              Pour toute question relative à vos données personnelles :{' '}
              <a href="mailto:vision@wealphialabs.com" className="text-gold hover:underline">vision@wealphialabs.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
