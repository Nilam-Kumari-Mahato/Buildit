const steps = [
  { id: 1, label: "Validating your input" },
  { id: 2, label: "Sending to AI engine" },
  { id: 3, label: "Generating your report" }
]

const LoadingScreen = ({ currentStep = 1 }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-20">

      {/* Animated dots */}
      <div className="flex items-center gap-3">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full"
            style={{
              background: i === 0 ? '#004c6d' : i === 1 ? '#00aaaa' : '#00ced1',
              animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite`
            }}
          />
        ))}
      </div>

      {/* Title */}
      <p className="text-[#f5f5f5] text-lg font-semibold">
        Analyzing your idea...
      </p>

      {/* Step indicators */}
      <div className="flex flex-col gap-3 w-72">
        {steps.map((step) => {
          const isDone = step.id < currentStep
          const isActive = step.id === currentStep
          const isPending = step.id > currentStep

          return (
            <div
              key={step.id}
              className="flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-500"
              style={{
                background: isActive
                  ? 'rgba(0, 206, 209, 0.08)'
                  : 'rgba(255,255,255,0.04)',
                border: isActive
                  ? '0.5px solid rgba(0,206,209,0.2)'
                  : '0.5px solid rgba(255,255,255,0.08)'
              }}
            >
              {/* Step dot */}
              <div
                className="w-2 h-2 rounded-full flex-shrink-0"
                style={{
                  background: isDone
                    ? '#00c896'
                    : isActive
                    ? '#00ced1'
                    : 'rgba(255,255,255,0.2)',
                  animation: isActive ? 'pulse 1s ease-in-out infinite' : 'none'
                }}
              />

              {/* Step label */}
              <span
                className="text-sm flex-1"
                style={{
                  color: isDone
                    ? '#00c896'
                    : isActive
                    ? '#00ced1'
                    : '#c0c0c0'
                }}
              >
                {step.label}
              </span>

              {/* Checkmark for done steps */}
              {isDone && (
                <span className="text-[#00c896] text-xs">✓</span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default LoadingScreen