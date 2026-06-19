import { NextRequest, NextResponse } from 'next/server'
import { generatePlan } from '@/lib/anthropic'
import { savePlan } from '@/lib/plan-store'

export async function POST(req: NextRequest) {
  try {
    const { answers } = await req.json()
    const plan = await generatePlan(answers)
    const planId = crypto.randomUUID()
    savePlan(planId, plan)
    return NextResponse.json({ planId, plan })
  } catch (err) {
    console.error('Plan generation error:', err)
    return NextResponse.json({ error: 'Failed to generate plan' }, { status: 500 })
  }
}
