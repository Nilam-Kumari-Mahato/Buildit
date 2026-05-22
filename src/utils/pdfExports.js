import jsPDF from 'jspdf'

export function downloadPDF(result) {
  const doc = new jsPDF()
  const pageWidth = doc.internal.pageSize.getWidth()
  let y = 20

  // ===== Helper functions =====
  const addLine = (text, size = 12, color = [20, 20, 20], bold = false) => {
    doc.setFontSize(size)
    doc.setTextColor(...color)
    if (bold) doc.setFont('helvetica', 'bold')
    else doc.setFont('helvetica', 'normal')
    doc.text(text, 20, y)
    y += size * 0.6
  }

  const addGap = (gap = 8) => { y += gap }

  const addDivider = () => {
    doc.setDrawColor(220, 220, 220)
    doc.line(20, y, pageWidth - 20, y)
    y += 8
  }

  const checkNewPage = () => {
    if (y > 270) { doc.addPage(); y = 20 }
  }

  // ===== Background — white =====
  doc.setFillColor(255, 255, 255)
  doc.rect(0, 0, pageWidth, doc.internal.pageSize.getHeight(), 'F')

  // ===== Header =====
  // Top accent bar
  doc.setFillColor(0, 76, 109)
  doc.rect(0, 0, pageWidth, 14, 'F')

  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.text('BUILDIT — AI STARTUP VALIDATION REPORT', 20, 9)
  doc.text(`buildit.vercel.app`, pageWidth - 20, 9, { align: 'right' })

  y = 26

  // ===== Idea Title =====
  addLine(result.title, 22, [10, 10, 10], true)
  addGap(2)
  addLine(`Generated on ${result.date}`, 10, [120, 120, 120])
  addGap(6)
  addDivider()

  // ===== Summary =====
  addLine('IDEA SUMMARY', 9, [0, 76, 109], true)
  addGap(4)
  addLine(`Industry:         ${result.summary.industry}`, 11, [40, 40, 40])
  addGap(3)
  addLine(`Target Audience:  ${result.summary.targetAudience}`, 11, [40, 40, 40])
  addGap(3)
  addLine(`Current Stage:    ${result.stage}`, 11, [40, 40, 40])
  addGap(8)
  addDivider()

  // ===== Overall Score =====
  addLine('OVERALL SCORE', 9, [0, 76, 109], true)
  addGap(4)

  // Score box
  doc.setFillColor(245, 245, 245)
  doc.roundedRect(20, y, 80, 24, 3, 3, 'F')
  doc.setFontSize(22)
  doc.setTextColor(10, 10, 10)
  doc.setFont('helvetica', 'bold')
  doc.text(`${result.buildItScore} / 100`, 60, y + 15, { align: 'center' })

  // Risk badge
  const riskColors = {
    'Low': [0, 200, 150],
    'Medium': [245, 166, 35],
    'High': [255, 140, 0],
    'Very High': [255, 77, 77]
  }
  const riskColor = riskColors[result.riskLevel] || [100, 100, 100]
  doc.setFillColor(...riskColor)
  doc.roundedRect(110, y + 4, 50, 14, 3, 3, 'F')
  doc.setFontSize(10)
  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.text(`${result.riskLevel} Risk`, 135, y + 13, { align: 'center' })

  y += 32
  addGap(6)
  addDivider()

  // ===== Category Scores =====
  addLine('CATEGORY SCORES', 9, [0, 76, 109], true)
  addGap(6)

  const categories = [
    { label: 'Market Opportunity', value: result.categoryScores.marketOpportunity },
    { label: 'Competition Level', value: result.categoryScores.competitionLevel },
    { label: 'Feasibility', value: result.categoryScores.feasibility },
    { label: 'Monetization Potential', value: result.categoryScores.monetizationPotential },
  ]

  categories.forEach(({ label, value }) => {
    // Label + score
    doc.setFontSize(10)
    doc.setTextColor(40, 40, 40)
    doc.setFont('helvetica', 'normal')
    doc.text(label, 20, y)
    doc.setFont('helvetica', 'bold')
    doc.text(`${value}/10`, pageWidth - 20, y, { align: 'right' })

    // Progress bar background
    y += 4
    doc.setFillColor(230, 230, 230)
    doc.roundedRect(20, y, pageWidth - 40, 4, 2, 2, 'F')

    // Progress bar fill
    const fillWidth = ((value / 10) * (pageWidth - 40))
    doc.setFillColor(0, 76, 109)
    doc.roundedRect(20, y, fillWidth, 4, 2, 2, 'F')

    y += 10
    checkNewPage()
  })

  addGap(4)
  addDivider()

  // ===== Competitors =====
  addLine('COMPETITOR ANALYSIS', 9, [0, 76, 109], true)
  addGap(6)

  result.competitors.forEach((comp, i) => {
    // Competitor number circle
    doc.setFillColor(0, 76, 109)
    doc.circle(24, y - 1, 3, 'F')
    doc.setFontSize(7)
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.text(`${i + 1}`, 24, y + 1, { align: 'center' })

    // Name
    doc.setFontSize(11)
    doc.setTextColor(10, 10, 10)
    doc.setFont('helvetica', 'bold')
    doc.text(comp.name, 32, y + 1)
    y += 7

    // Description
    const descLines = doc.splitTextToSize(comp.description, pageWidth - 52)
    doc.setFontSize(10)
    doc.setTextColor(80, 80, 80)
    doc.setFont('helvetica', 'normal')
    doc.text(descLines, 32, y)
    y += descLines.length * 5 + 6
    checkNewPage()
  })

  addDivider()

  // ===== Risks =====
  addLine('TOP RISKS', 9, [200, 50, 50], true)
  addGap(6)

  result.risks.forEach((risk, i) => {
    doc.setFillColor(255, 230, 230)
    doc.roundedRect(20, y - 4, 4, 4, 1, 1, 'F')

    const lines = doc.splitTextToSize(`${i + 1}.  ${risk}`, pageWidth - 44)
    doc.setFontSize(10)
    doc.setTextColor(40, 40, 40)
    doc.setFont('helvetica', 'normal')
    doc.text(lines, 28, y)
    y += lines.length * 5 + 5
    checkNewPage()
  })

  addGap(4)

  // ===== Opportunities =====
  addLine('OPPORTUNITIES', 9, [0, 140, 100], true)
  addGap(6)

  result.opportunities.forEach((opp, i) => {
    const lines = doc.splitTextToSize(`${i + 1}.  ${opp}`, pageWidth - 44)
    doc.setFontSize(10)
    doc.setTextColor(40, 40, 40)
    doc.setFont('helvetica', 'normal')
    doc.text(lines, 28, y)
    y += lines.length * 5 + 5
    checkNewPage()
  })

  addDivider()

  // ===== Verdict =====
  addLine('FINAL VERDICT', 9, [0, 76, 109], true)
  addGap(6)

  const verdictLines = doc.splitTextToSize(result.verdict, pageWidth - 40)
  doc.setFontSize(11)
  doc.setTextColor(40, 40, 40)
  doc.setFont('helvetica', 'normal')
  doc.text(verdictLines, 20, y)
  y += verdictLines.length * 6 + 10

  checkNewPage()

  // ===== Footer =====
  const pageHeight = doc.internal.pageSize.getHeight()
  doc.setFillColor(245, 245, 245)
  doc.rect(0, pageHeight - 12, pageWidth, 12, 'F')
  doc.setFontSize(8)
  doc.setTextColor(150, 150, 150)
  doc.setFont('helvetica', 'normal')
  doc.text('Generated by Buildit — AI Startup Idea Validator', 20, pageHeight - 4)
  doc.text(`buildit.vercel.app`, pageWidth - 20, pageHeight - 4, { align: 'right' })

  // ===== Save =====
  doc.save(`buildit-report-${result.title.toLowerCase().replace(/\s+/g, '-')}.pdf`)
}