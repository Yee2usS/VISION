import { redirect } from 'next/navigation'
import { CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react'
import { createAdminClient } from '@/lib/supabase/admin'
import PdfExport from '@/components/dashboard/PdfExport'
import { GeneratedPlan } from '@/types'

interface PlanRecord {
  id: string
  plan: GeneratedPlan
  status: string
  offer_type: string | null
  created_at: string
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { planId?: string }
}) {
  const planId = searchParams.planId

  if (!planId) {
    redirect('/onboarding')
  }

  const supabase = createAdminClient()
  const { data: planRecord, error } = await supabase
    .from('plans')
    .select('id, plan, status, offer_type, created_at')
    .eq('id', planId)
    .eq('status', 'paid')
    .single() as { data: PlanRecord | null; error: unknown }

  if (error || !planRecord) {
    redirect('/onboarding')
  }

  const plan = planRecord.plan

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-[#1F1F23] bg-surface sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-widest font-medium">Vision</p>
            <h1 className="text-lg font-bold text-white">Mon Dashboard</h1>
          </div>
          <PdfExport />
        </div>
      </div>

      <div id="plan-content" className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        {/* Hero */}
        <section className="text-center py-8">
          <p className="text-xs font-medium text-gold uppercase tracking-widest mb-3">Ta zone de génie</p>
          <h2 className="text-4xl md:text-5xl font-bold text-gradient-gold mb-4">{plan.geniusZone}</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            {plan.geniusZoneDescription}
          </p>
        </section>

        {/* Strengths */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-5">Tes points forts</h3>
          <div className="grid md:grid-cols-3 gap-4">
            {plan.strengths?.map((strength, i) => (
              <div key={i} className="bg-surface border border-[#1F1F23] rounded-xl p-5 flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <p className="text-zinc-300 text-sm leading-relaxed">{strength}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommended Offer */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-5">L'offre recommandée</h3>
          <div className="bg-surface border border-gold/20 rounded-2xl p-7">
            <p className="text-gold font-semibold text-xl mb-3">{plan.recommendedOffer}</p>
            <p className="text-zinc-300 leading-relaxed">{plan.offerDescription}</p>
          </div>
        </section>

        {/* Distribution channel */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-5">Canal de distribution principal</h3>
          <div className="bg-surface border border-[#1F1F23] rounded-2xl p-7">
            <p className="text-white font-semibold text-lg mb-3">{plan.distributionChannel}</p>
            <p className="text-zinc-400 leading-relaxed">{plan.channelStrategy}</p>
          </div>
        </section>

        {/* First steps */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-5">Tes 3 prochaines actions</h3>
          <div className="space-y-3">
            {plan.firstSteps?.map((step, i) => (
              <div key={i} className="flex items-start gap-4 bg-surface border border-[#1F1F23] rounded-xl p-5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-background text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <div className="flex items-center gap-2 flex-1">
                  <p className="text-white leading-relaxed">{step}</p>
                  {i === 0 && (
                    <span className="text-xs bg-gold/10 text-gold px-2 py-0.5 rounded-full border border-gold/20 whitespace-nowrap flex-shrink-0">
                      Dans les 24h
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Full 12-week roadmap */}
        <section>
          <h3 className="text-xl font-semibold text-white mb-5">Ta roadmap 90 jours</h3>
          <div className="space-y-3">
            {plan.roadmap?.map((week) => (
              <details
                key={week.week}
                className="bg-surface border border-[#1F1F23] rounded-xl overflow-hidden group"
              >
                <summary className="flex items-center gap-4 p-5 cursor-pointer list-none hover:bg-white/[0.02] transition-colors">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gold text-background text-xs font-bold flex items-center justify-center">
                    {week.week}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white truncate">{week.title}</p>
                    <p className="text-zinc-500 text-sm truncate">{week.description}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-zinc-600 flex-shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5 border-t border-[#1F1F23] pt-4">
                  <ul className="space-y-2 mb-4">
                    {week.actions.map((action, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                        {action}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-gold/5 border border-gold/20 rounded-lg p-3">
                    <p className="text-xs text-gold font-medium mb-1">Milestone</p>
                    <p className="text-zinc-300 text-sm">{week.milestone}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* Warnings */}
        {plan.warnings && plan.warnings.length > 0 && (
          <section>
            <h3 className="text-xl font-semibold text-white mb-5">Points de vigilance</h3>
            <div className="space-y-3">
              {plan.warnings.map((warning, i) => (
                <div key={i} className="flex items-start gap-3 bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5">
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <p className="text-zinc-300 text-sm leading-relaxed">{warning}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
