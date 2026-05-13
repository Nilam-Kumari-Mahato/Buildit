const RiskCard = ({ risks }) => {
  return (
    <div className="glass mt-2 p-4 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-[#ff4d4d] text-lg">⚠</span>
        <p className="text-xs font-semibold tracking-widest text-[#ff4d4d] uppercase">
          Top Risks
        </p>
      </div>

      {/* Risks List */}
      <div className="flex flex-col gap-3">
        {risks.map((risk, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 rounded-xl"
            style={{ background: 'rgba(255, 77, 77, 0.06)', border: '0.5px solid rgba(255, 77, 77, 0.15)' }}
          >
            {/* Index number */}
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(255, 77, 77, 0.2)', color: '#ff4d4d' }}
            >
              {index + 1}
            </div>

            {/* Risk text */}
            <p className="text-[#c0c0c0] text-sm leading-relaxed">{risk}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default RiskCard