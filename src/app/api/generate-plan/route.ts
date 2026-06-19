import { NextRequest, NextResponse } from 'next/server'
import { generatePlan } from '@/lib/anthropic'
import { createAdminClient } from '@/lib/supabase/admin'

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json()
    const plan = await generatePlan(answers)

    const supabase = createAdminClient()
    const { data, error } = await supabase
      .from('plans')
      .insert({ answers, plan, status: 'ready' })
      .select('id')
      .single()

    if (error) throw error

    return NextResponse.json({ planId: data.id, plan })
  } catch (err) {
    console.error('Plan generation error:', err)
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 })
  }
}
