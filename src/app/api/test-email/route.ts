import { NextRequest, NextResponse } from 'next/server'
import { sendConfirmationEmail } from '@/lib/resend'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const email = searchParams.get('email')
  const offer = searchParams.get('offer') ?? 'one-shot'

  if (!email) {
    return NextResponse.json({ error: 'Missing email param' }, { status: 400 })
  }

  try {
    await sendConfirmationEmail(email, 'test-plan-id-123', offer)
    return NextResponse.json({ ok: true, sentTo: email, offer })
  } catch (err) {
    console.error('Test email error:', err)
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
