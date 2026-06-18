import { NextRequest, NextResponse } from 'next/server'
import { generatePlan } from '@/lib/anthropic'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json()
    const plan = await generatePlan(answers)

    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const planId = crypto.randomUUID()
    const { error } = await supabase.from('plans').insert({
      id: planId,
      user_id: user?.id ?? null,
      answers: answers,
      plan: plan,
      status: 'ready',
      created_at: new Date().toISOString(),
    })

    if (error) throw error

    return NextResponse.json({ planId, plan })
  } catch (err) {
    console.error('Plan generation error:', err)
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 })
  }
}
