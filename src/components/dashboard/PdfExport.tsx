'use client'

import { useState } from 'react'
import { Download } from 'lucide-react'
import Button from '@/components/ui/Button'
import { GeneratedPlan } from '@/types'

type RGB = [number, number, number]

const COLORS = {
  background: [10, 10, 11] as RGB,
  white: [255, 255, 255] as RGB,
  zinc300: [212, 212, 216] as RGB,
  zinc400: [161, 161, 170] as RGB,
  zinc500: [113, 113, 122] as RGB,
  border: [40, 40, 45] as RGB,
  gold: [201, 168, 76] as RGB,
  warning: [234, 179, 8] as RGB,
}

const PT_TO_MM = 0.352778
const LINE_FACTOR = 1.35

function sanitize(str: string): string {
  return str
    .replace(/[—–]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')
}

interface PdfExportProps {
  plan: GeneratedPlan
}

export default function PdfExport({ plan }: PdfExportProps) {
  const [loading, setLoading] = useState(false)

  async function handleExport() {
    setLoading(true)
    try {
      const { jsPDF } = await import('jspdf')
      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      pdf.setLineHeightFactor(LINE_FACTOR)

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 18
      const contentWidth = pageWidth - margin * 2
      const headerHeight = 14
      const footerHeight = 12
      const topLimit = margin + headerHeight
      const bottomLimit = pageHeight - margin - footerHeight
      let y = topLimit

      const paintPage = () => {
        pdf.setFillColor(...COLORS.background)
        pdf.rect(0, 0, pageWidth, pageHeight, 'F')
        pdf.setFont('helvetica', 'bold')
        pdf.setFontSize(10)
        pdf.setTextColor(...COLORS.gold)
        pdf.text('VISION', margin, margin + 4)
        pdf.setDrawColor(...COLORS.border)
        pdf.line(margin, margin + 7, pageWidth - margin, margin + 7)
      }

      const newPage = () => {
        pdf.addPage()
        paintPage()
        y = topLimit
      }

      const ensureSpace = (needed: number) => {
        if (y + needed > bottomLimit) newPage()
      }

      const lineHeightMm = (fontSizePt: number) => fontSizePt * PT_TO_MM * LINE_FACTOR

      const text = (
        str: string,
        x: number,
        size: number,
        color: RGB,
        opts: { bold?: boolean; maxWidth?: number; gapAfter?: number } = {}
      ) => {
        pdf.setFont('helvetica', opts.bold ? 'bold' : 'normal')
        pdf.setFontSize(size)
        pdf.setTextColor(...color)
        const maxWidth = opts.maxWidth ?? contentWidth - (x - margin)
        const lines = pdf.splitTextToSize(sanitize(str), maxWidth) as string[]
        const lh = lineHeightMm(size)
        const blockHeight = lines.length * lh
        ensureSpace(blockHeight)
        pdf.text(lines, x, y + size * PT_TO_MM * 0.8)
        y += blockHeight + (opts.gapAfter ?? 0)
      }

      const sectionTitle = (title: string) => {
        ensureSpace(16)
        y += 5
        text(title, margin, 14, COLORS.white, { bold: true })
        y += 1
        pdf.setDrawColor(...COLORS.gold)
        pdf.line(margin, y, margin + 22, y)
        y += 5
      }

      paintPage()

      // Header block
      text('TA ZONE DE GENIE', margin, 9, COLORS.gold, { bold: true, gapAfter: 2 })
      text(plan.geniusZone, margin, 24, COLORS.gold, { bold: true, gapAfter: 2 })
      text(plan.geniusZoneDescription, margin, 11, COLORS.zinc400, { gapAfter: 4 })

      // Strengths
      if (plan.strengths?.length) {
        sectionTitle('Tes points forts')
        plan.strengths.forEach((s) => {
          text(`-  ${s}`, margin, 10.5, COLORS.zinc300, { gapAfter: 2 })
        })
      }

      // Recommended offer
      sectionTitle("L'offre recommandee")
      text(plan.recommendedOffer, margin, 12.5, COLORS.gold, { bold: true, gapAfter: 2 })
      text(plan.offerDescription, margin, 10.5, COLORS.zinc300)

      // Distribution channel
      sectionTitle('Canal de distribution principal')
      text(plan.distributionChannel, margin, 12.5, COLORS.white, { bold: true, gapAfter: 2 })
      text(plan.channelStrategy, margin, 10.5, COLORS.zinc400)

      // First steps
      if (plan.firstSteps?.length) {
        sectionTitle('Tes 3 prochaines actions')
        plan.firstSteps.forEach((step, i) => {
          text(`${i + 1}.  ${step}`, margin, 10.5, COLORS.white, { gapAfter: 2.5 })
        })
      }

      // Roadmap
      if (plan.roadmap?.length) {
        sectionTitle('Ta roadmap 90 jours')
        plan.roadmap.forEach((week, idx) => {
          ensureSpace(14)
          text(`Semaine ${week.week} - ${week.title}`, margin, 12, COLORS.gold, { bold: true, gapAfter: 1 })
          text(week.description, margin, 9.5, COLORS.zinc400, { gapAfter: 2 })
          week.actions?.forEach((action) => {
            text(`-  ${action}`, margin + 2, 9.5, COLORS.zinc300, { maxWidth: contentWidth - 2 })
          })
          y += 1
          text(`Objectif de la semaine : ${week.milestone}`, margin, 9.5, COLORS.gold, { gapAfter: 4 })
          if (idx < plan.roadmap.length - 1) {
            ensureSpace(4)
            pdf.setDrawColor(...COLORS.border)
            pdf.line(margin, y, pageWidth - margin, y)
            y += 5
          }
        })
      }

      // Warnings
      if (plan.warnings?.length) {
        sectionTitle('Points de vigilance')
        plan.warnings.forEach((w) => {
          text(`!  ${w}`, margin, 10.5, COLORS.warning, { gapAfter: 2.5 })
        })
      }

      const totalPages = pdf.getNumberOfPages()
      for (let i = 1; i <= totalPages; i++) {
        pdf.setPage(i)
        pdf.setDrawColor(...COLORS.border)
        pdf.line(margin, pageHeight - margin - 6, pageWidth - margin, pageHeight - margin - 6)
        pdf.setFont('helvetica', 'normal')
        pdf.setFontSize(8)
        pdf.setTextColor(...COLORS.zinc500)
        pdf.text('Vision - Ton plan personnalise', margin, pageHeight - margin - 1)
        pdf.text(`${i} / ${totalPages}`, pageWidth - margin, pageHeight - margin - 1, { align: 'right' })
      }

      pdf.save('mon-plan-vision.pdf')
    } catch (err) {
      console.error('PDF export error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button variant="outline" size="sm" onClick={handleExport} loading={loading}>
      <Download className="w-4 h-4" />
      Exporter en PDF
    </Button>
  )
}
