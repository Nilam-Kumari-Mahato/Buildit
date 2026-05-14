import { useState } from 'react'

const ShareDialog = ({ url, onClose }) => {
  const [copied, setCopied] = useState(false)
  

  const handleCopy = async () => {
    await navigator.clipboard.writeText(url)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-center justify-center px-6"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
        onClick={onClose}
      >
        {/* Dialog */}
        <div
          className="glass w-full max-w-md p-6 flex flex-col gap-4"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <p className="text-[#f5f5f5] font-semibold text-base">
              Share Report 🔗
            </p>
            <button
              onClick={onClose}
              className="text-[#c0c0c0] hover:text-[#f5f5f5] transition-colors text-xl leading-none"
            >
              ✕
            </button>
          </div>

          {/* URL Box */}
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.05)', border: '0.5px solid rgba(255,255,255,0.1)' }}
          >
            <p className="text-[#c0c0c0] text-xs flex-1 truncate">{url}</p>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="w-full py-3 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
            style={{ background: copied ? 'linear-gradient(135deg, #00c896, #004c6d)' : 'linear-gradient(135deg, #004c6d, #00ced1)' }}
          >
            {copied ? '✓ Copied to Clipboard!' : 'Copy Link'}
          </button>

          <p className="text-[#c0c0c0] text-xs text-center">
            Anyone with this link can view this report
          </p>
        </div>
      </div>
    </>
  )
}

export default ShareDialog