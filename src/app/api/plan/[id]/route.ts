import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('plans')
      .select('id, plan, status, offer_type, created_at')
      .eq('id', params.id)
      .single()

    if (error || !data) {
      return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
    }

    return NextResponse.json({ plan: data.plan, status: data.status, offerType: data.offer_type })
  } catch {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
