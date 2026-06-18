import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@/lib/supabase/server'
import { sendConfirmationEmail } from '@/lib/resend'

export const dynamic = 'force-dynamic'

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature')

  if (!sig) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 })
  }

  let event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch (err) {
    console.error('Webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object
    const planId = session.metadata?.planId
    const priceType = session.metadata?.priceType
    const email = session.customer_details?.email

    if (planId) {
      const supabase = createClient()
      await supabase
        .from('plans')
        .update({
          status: 'paid',
          offer_type: priceType,
          stripe_customer_id: session.customer as string | null,
        })
        .eq('id', planId)

      if (email) {
        try {
          await sendConfirmationEmail(email, planId, priceType || 'one-shot')
        } catch (emailErr) {
          console.error('Failed to send confirmation email:', emailErr)
        }

        // Notify Skool if monthly
        if (priceType === 'monthly' && process.env.SKOOL_WEBHOOK_URL) {
          try {
            await fetch(process.env.SKOOL_WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, planId }),
            })
          } catch (skoolErr) {
            console.error('Skool webhook error:', skoolErr)
          }
        }
      }
    }
  }

  return NextResponse.json({ received: true })
}
