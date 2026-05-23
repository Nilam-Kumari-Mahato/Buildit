import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import HistoryCard from '../components/HistoryCard'

export default function History() {
  const [history, setHistory] = useState([])
  const [search, setSearch] = useState('')
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  // Load history from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('history') || '[]')
    setHistory(saved)
  }, [])

  // Filter by search
  const filtered = history.filter(item =>
    item.title.toLowerCase().includes(search.toLowerCase())
  )

  // Delete single item
  const handleDelete = (id) => {
    const updated = history.filter(item => item.id !== id)
    setHistory(updated)
    localStorage.setItem('history', JSON.stringify(updated))
    localStorage.removeItem(`result_${id}`)
  }

  // Clear all history
  const handleClearAll = () => {
    history.forEach(item => localStorage.removeItem(`result_${item.id}`))
    localStorage.removeItem('history')
    setHistory([])
    setShowConfirm(false)
  }

  return (
    <div className="background min-h-screen w-full overflow-hidden">

      {/* ORBS */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="orb orb4" />

      <div className="relative z-10 max-w-3xl mx-auto px-6 pt-28 pb-20">

        {/* ===== HEADER ===== */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-xs font-semibold tracking-widest text-[#00ced1] uppercase mb-1">
              Your Validations
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-[#f5f5f5]">
              History
            </h1>
          </div>

          {/* Clear All Button — only show if history exists */}
          {history.length > 0 && (
            <button
              onClick={() => setShowConfirm(true)}
              className="text-xs font-medium text-[#ff4d4d] px-4 py-2 rounded-full transition-all duration-300 hover:bg-[#ff4d4d]/10"
              style={{ border: '0.5px solid rgba(255,77,77,0.3)' }}
            >
              Clear All
            </button>
          )}
        </div>

        {/* ===== SEARCH BOX ===== */}
        {history.length > 0 && (
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Search your validations..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl border border-[#004c6d] bg-transparent text-[#f5f5f5] placeholder-[#c0c0c0]/50 focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50 transition-all"
            />
            {/* Search icon */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#c0c0c0]">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="7" cy="7" r="5" stroke="#c0c0c0" strokeWidth="1.5" />
                <path d="M11 11L14 14" stroke="#c0c0c0" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </div>
          </div>
        )}

        {/* ===== EMPTY STATE ===== */}
        {history.length === 0 && (
          <div className="glass flex flex-col items-center justify-center py-20 text-center gap-6">
            <div className="text-5xl">💡</div>
            <div>
              <p className="text-[#f5f5f5] font-semibold text-lg mb-2">
                No validations yet
              </p>
              <p className="text-[#c0c0c0] text-sm max-w-xs">
                You haven't validated any ideas yet. Start by validating your first startup idea!
              </p>
            </div>
            <button
              onClick={() => navigate('/validate')}
              className="px-8 py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #004c6d, #00ced1)' }}
            >
              Validate My First Idea →
            </button>
          </div>
        )}

        {/* ===== NO SEARCH RESULTS ===== */}
        {history.length > 0 && filtered.length === 0 && (
          <div className="glass flex flex-col items-center justify-center py-16 text-center gap-4">
            <div className="text-4xl">🔍</div>
            <p className="text-[#f5f5f5] font-semibold">No results found</p>
            <p className="text-[#c0c0c0] text-sm">
              No validations match "{search}"
            </p>
          </div>
        )}

        {/* ===== HISTORY LIST ===== */}
        <div className="flex flex-col gap-4">
          {filtered.map((item) => (
            <HistoryCard
              key={item.id}
              item={item}
              onDelete={handleDelete}
              onClick={() => navigate(`/results/${item.id}`)}
            />
          ))}
        </div>

        {/* ===== CONFIRM CLEAR ALL DIALOG ===== */}
        {showConfirm && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center px-6"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
          >
            <div className="glass w-full max-w-sm p-6 flex flex-col gap-4 text-center">
              <p className="text-[#f5f5f5] font-semibold text-lg">Clear All History?</p>
              <p className="text-[#c0c0c0] text-sm">
                This will permanently delete all your validation reports. This action cannot be undone.
              </p>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="flex-1 py-2.5 rounded-full text-sm font-medium text-[#f5f5f5] transition-all"
                  style={{ background: 'rgba(255,255,255,0.08)', border: '0.5px solid rgba(255,255,255,0.15)' }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearAll}
                  className="flex-1 py-2.5 rounded-full text-sm font-semibold text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #ff4d4d, #cc0000)' }}
                >
                  Yes, Clear All
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}