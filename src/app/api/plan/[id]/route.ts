import { NextRequest, NextResponse } from 'next/server'
import { getPlan } from '@/lib/plan-store'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const record = getPlan(params.id)
  if (!record) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
  return NextResponse.json({ plan: record.plan, status: record.status, offerType: record.offerType })
}
