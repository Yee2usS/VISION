import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Vision',
}

export default function CGV() {
  return (
    <div className="min-h-screen bg-background py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors mb-8 inline-block">
          ← Retour
        </Link>
        <h1 className="text-3xl font-bold text-white mb-2">Conditions Générales de Vente</h1>
        <p className="text-zinc-500 text-sm mb-10">Dernière mise à jour : juin 2026</p>

        <div className="space-y-8 text-zinc-400 leading-relaxed">
          <section>
            <h2 className="text-white font-semibold text-lg mb-3">1. Objet</h2>
            <p>
              Les présentes Conditions Générales de Vente régissent l'achat des offres proposées par Vision, service édité par Wealphia Labs. Tout achat implique l'acceptation sans réserve des présentes CGV.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">2. Offres proposées</h2>
            <div className="space-y-3">
              <div className="bg-surface border border-[#1F1F23] rounded-xl p-4">
                <p className="text-zinc-300 font-medium mb-1">Le Plan — 97€ TTC (paiement unique)</p>
                <p>Accès à vie au plan personnalisé complet généré par intelligence artificielle, incluant la roadmap 12 semaines, l'offre recommandée et l'export PDF.</p>
              </div>
              <div className="bg-surface border border-[#1F1F23] rounded-xl p-4">
                <p className="text-zinc-300 font-medium mb-1">Le Plan + Communauté — 29,95€ TTC/mois</p>
                <p>Abonnement mensuel incluant le plan complet, l'accès à la communauté privée Skool, les lives mensuels et les ressources exclusives. Sans engagement, résiliable à tout moment.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">3. Prix et paiement</h2>
            <p>
              Les prix sont indiqués en euros TTC. Le paiement est effectué en ligne via Stripe (carte bancaire). La transaction est sécurisée et chiffrée. Wealphia Labs ne stocke aucune donnée bancaire.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">4. Accès au service</h2>
            <p>
              Après confirmation du paiement, vous recevez un email de confirmation avec l'accès à votre plan. L'accès est disponible immédiatement dans votre espace personnel sur Vision.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">5. Droit de rétractation</h2>
            <p>
              Conformément à l'article L221-28 du Code de la consommation, le droit de rétractation ne peut être exercé pour les contenus numériques fournis immédiatement après paiement, dès lors que vous avez expressément consenti à la fourniture immédiate du service et renoncé à votre droit de rétractation.
            </p>
            <p className="mt-2">
              En validant votre achat, vous acceptez la fourniture immédiate du contenu numérique et renoncez expressément à votre droit de rétractation de 14 jours.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">6. Résiliation de l'abonnement</h2>
            <p>
              L'abonnement mensuel peut être résilié à tout moment depuis votre espace Stripe (lien fourni dans l'email de confirmation) ou en contactant <a href="mailto:vision@wealphialabs.com" className="text-gold hover:underline">vision@wealphialabs.com</a>. La résiliation prend effet à la fin de la période en cours.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">7. Responsabilité</h2>
            <p>
              Les plans générés par Vision sont basés sur l'intelligence artificielle et fournis à titre indicatif. Wealphia Labs ne garantit pas de résultats spécifiques. La mise en œuvre des recommandations relève de la seule responsabilité de l'utilisateur.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">8. Droit applicable</h2>
            <p>
              Les présentes CGV sont soumises au droit français. En cas de litige, les parties s'engagent à rechercher une solution amiable avant tout recours judiciaire. À défaut, les tribunaux compétents seront ceux du ressort du siège social de Wealphia Labs.
            </p>
          </section>

          <section>
            <h2 className="text-white font-semibold text-lg mb-3">9. Contact</h2>
            <p>
              Pour toute question : <a href="mailto:vision@wealphialabs.com" className="text-gold hover:underline">vision@wealphialabs.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
