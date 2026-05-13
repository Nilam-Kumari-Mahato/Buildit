// CompetitorCard.jsx
const CompetitorCard = ({ name, description }) => {
  return (
    <div >
      <div className="flex items-start gap-3">
        {/* Dot indicator */}
        <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0"
          style={{ background: '#00ced1' }}
        />
        <div>
          <p className="text-[#f5f5f5] font-semibold text-sm">{name}</p>
          <p className="text-[#c0c0c0] text-xs mt-1 leading-relaxed">{description}</p>
        </div>
      </div>
    </div>
  )
}

export default CompetitorCard