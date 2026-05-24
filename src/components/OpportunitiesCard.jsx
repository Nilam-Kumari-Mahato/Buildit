const OpportunitiesCard = ({ opportunities }) => {
  return (
    <div className="glass mt-4 p-4 flex flex-col gap-4">

      {/* Header */}
      <div className="flex items-center gap-2">
        <span className="text-[#4dff68] text-lg">✅</span>
        <p className="text-xs font-semibold tracking-widest text-[#4dff68] uppercase">
          opportunities 
        </p>
      </div>

      {/* Opportunities  List */}
      <div className="flex flex-col gap-3">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 rounded-xl"
            style={{ background: 'rgba(77, 255, 104, 0.06)', border: '0.5px solid rgba(77, 255, 104, 0.15)' }}
          >
            {/* Index number */}
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5"
              style={{ background: 'rgba(77, 255, 104, 0.2)', color: '#4dff68' }}
            >
              {index + 1}
            </div>

            {/* Opportunity text */}
            <p className="text-[#c0c0c0] text-sm md:text-m leading-relaxed">{opportunity}</p>
          </div>
        ))}
      </div>

    </div>
  )
}

export default OpportunitiesCard