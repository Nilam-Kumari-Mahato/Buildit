import { getRiskLevel } from '../utils/scoreHelpers'

const HistoryCard = ({ item, onDelete, onClick }) => {
  const { label, color } = getRiskLevel(item.buildItScore)

  return (
    <div
      className="glass w-full px-6 py-5 flex items-center justify-between gap-4 cursor-pointer transition-all duration-300 hover:scale-[1.01]"
      style={{ borderLeft: `3px solid ${color}` }}
      onClick={onClick}
    >

      {/* Left — title + date + status */}
      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <p className="text-[#f5f5f5] font-semibold text-base truncate">
          {item.title}
        </p>
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-[#c0c0c0] text-xs">{item.date}</span>
          {/* Status badge */}
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              background: item.completed ? 'rgba(0,200,150,0.1)' : 'rgba(245,166,35,0.1)',
              color: item.completed ? '#00c896' : '#f5a623',
              border: `0.5px solid ${item.completed ? 'rgba(0,200,150,0.3)' : 'rgba(245,166,35,0.3)'}`
            }}
          >
            {item.completed ? '✓ Completed' : '⏳ In Progress'}
          </span>
        </div>
      </div>

      {/* Center — score */}
      <div className="flex flex-col items-center flex-shrink-0">
        <span className="text-2xl font-bold text-[#f5f5f5]">
          {item.buildItScore}
        </span>
        <span className="text-[#c0c0c0] text-xs">/ 100</span>
      </div>

      {/* Right — risk badge + delete */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full hidden sm:block"
          style={{
            background: `${color}18`,
            color: color,
            border: `0.5px solid ${color}40`
          }}
        >
          {label}
        </span>

        {/* Delete button */}
        <button
          onClick={(e) => {
            e.stopPropagation() // prevent card click
            onDelete(item.id)
          }}
          className="text-[#c0c0c0] hover:text-[#ff4d4d] transition-colors duration-200 p-1.5 rounded-lg hover:bg-[#ff4d4d]/10"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 2L12 12M12 2L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </button>
      </div>

    </div>
  )
}

export default HistoryCard