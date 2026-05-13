const CategoryScore = ({ label, score }) => {

  // Calculate bar fill percentage (score is out of 10)
  const percentage = (score / 10) * 100

  // Color based on score
  const getScoreColor = (score) => {
    if (score >= 8) return '#00c896'  // green — great
    if (score >= 6) return '#00ced1'  // accent — good
    if (score >= 4) return '#f5a623'  // warning — average
    return '#ff4d4d'                   // danger — low
  }

  const color = getScoreColor(score)

  return (
    <div className="glass p-4 flex flex-col gap-3">

      {/* Top row — label + score number */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-[#c0c0c0] font-medium">
          {label}
        </span>
        <span className="text-sm font-bold" style={{ color }}>
          {score}<span className="text-[#c0c0c0] font-normal text-xs">/10</span>
        </span>
      </div>

      {/* Big score number in center */}
      <div className="text-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {score}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full"
        style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div
          className="h-1.5 rounded-full transition-all duration-700"
          style={{
            width: `${percentage}%`,
            background: `linear-gradient(90deg, #004c6d, ${color})`
          }}
        />
      </div>

    </div>
  )
}

export default CategoryScore