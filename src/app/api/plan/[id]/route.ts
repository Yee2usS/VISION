import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/admin'

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createAdminClient()
  const { data, error } = await supabase
    .from('plans')
    .select('plan, status, offer_type')
    .eq('id', params.id)
    .single()

  if (error || !data) return NextResponse.json({ error: 'Plan not found' }, { status: 404 })
  return NextResponse.json({ plan: data.plan, status: data.status, offerType: data.offer_type })
}
