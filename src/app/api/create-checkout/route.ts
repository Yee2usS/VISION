import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/stripe'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { priceType, planId, email } = await req.json()

    const priceId =
      priceType === 'monthly'
        ? process.env.STRIPE_PRICE_MONTHLY!
        : process.env.STRIPE_PRICE_ONE_SHOT!

    const rawUrl = process.env.NEXT_PUBLIC_APP_URL ?? ''
    const appUrl = rawUrl.startsWith('https://') && !rawUrl.includes('localhost')
      ? rawUrl.replace(/\/$/, '')
      : 'https://vision-gilt-nu.vercel.app'

    console.log('[checkout] appUrl:', appUrl, '| priceId:', priceId, '| priceType:', priceType)

    const sessionConfig: Stripe.Checkout.SessionCreateParams = {
      mode: priceType === 'monthly' ? 'subscription' : 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/confirmation?session_id={CHECKOUT_SESSION_ID}&planId=${planId}&offer=${priceType}`,
      cancel_url: `${appUrl}/results?planId=${planId}`,
      metadata: { planId, priceType },
    }

    if (email) {
      sessionConfig.customer_email = email
    }

    const session = await stripe.checkout.sessions.create(sessionConfig)

    // Update plan with session id
    const supabase = createAdminClient()
    await supabase
      .from('plans')
      .update({ stripe_session_id: session.id })
      .eq('id', planId)

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Checkout error:', err)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
