import { Resend } from 'resend'

export async function sendConfirmationEmail(to: string, planId: string, offer: string) {
  const resend = new Resend(process.env.RESEND_API_KEY!)
  const isMonthly = offer === 'monthly'
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to,
    subject: 'Ton plan Vision est prêt',
    html: `
      <div style="font-family: Inter, sans-serif; background: #0A0A0B; color: white; padding: 40px; max-width: 600px; margin: 0 auto;">
        <h1 style="color: #C9A84C; font-size: 28px; margin-bottom: 8px;">Vision</h1>
        <p style="color: #71717A; margin-bottom: 32px;">Ton plan personnalisé t'attend</p>
        <h2 style="font-size: 22px; margin-bottom: 16px;">Bienvenue dans ton nouveau chapitre.</h2>
        <p style="color: #A1A1AA; line-height: 1.7; margin-bottom: 24px;">
          Ton plan a été généré et est disponible dans ton dashboard. 90 jours, étape par étape — c'est maintenant que ça commence.
        </p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard?planId=${planId}" style="display: inline-block; background: #C9A84C; color: #0A0A0B; padding: 14px 28px; border-radius: 8px; font-weight: 600; text-decoration: none; margin-bottom: 32px;">
          Accéder à mon plan
        </a>
        ${isMonthly ? `
        <div style="background: #111113; border: 1px solid #2a2400; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <p style="color: #C9A84C; font-weight: 600; margin: 0 0 8px 0;">Communauté privée Skool</p>
          <p style="color: #A1A1AA; margin: 0 0 16px 0; font-size: 15px;">Rejoins maintenant la communauté pour accéder aux lives mensuels et aux ressources exclusives.</p>
          <a href="https://www.skool.com/hustle-finance-by-max-7002/about" style="display: inline-block; background: transparent; color: #C9A84C; padding: 10px 20px; border-radius: 8px; font-weight: 600; text-decoration: none; border: 1px solid #C9A84C;">
            Rejoindre la communauté →
          </a>
        </div>` : ''}
        <hr style="border-color: #1F1F23; margin: 32px 0;" />
        <p style="color: #52525B; font-size: 14px;">Vision</p>
      </div>
    `,
  })
}
