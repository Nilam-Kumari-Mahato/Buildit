import { useState } from "react"
import { validateIdea } from "../utils/gemini"
import { useNavigate } from "react-router-dom"
import { generateId } from "../utils/generateId"
import LoadingScreen from "../components/LoadingScreen"

export default function Validate() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [stage, setStage] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [error, setError] = useState("")

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    if (!title.trim()) return setError("Title is required")
    if (!description.trim()) return setError("Description is required")
    if (!stage) return setError("Please select a stage")

    try {
      setLoading(true)

      // Step 1 — validating input
      setCurrentStep(1)
      await new Promise(r => setTimeout(r, 800))

      // Step 2 — sending to AI
      setCurrentStep(2)
      const result = await validateIdea(title, description, stage)

      // Step 3 — generating report
      setCurrentStep(3)
      await new Promise(r => setTimeout(r, 600))

      const id = generateId()

      localStorage.setItem(`result_${id}`, JSON.stringify({
        id,
        title,
        stage,
        date: new Date().toLocaleDateString(),
        ...result
      }))

      const history = JSON.parse(localStorage.getItem('history') || '[]')
      history.unshift({
        id,
        title,
        date: new Date().toLocaleDateString(),
        buildItScore: result.buildItScore,
        riskLevel: result.riskLevel,
        completed: true
      })
      localStorage.setItem('history', JSON.stringify(history))

      navigate(`/results/${id}`)

    } catch (err) {
      setError("Something went wrong. Please try again.")
      console.error(err)
    } finally {
      setLoading(false)
      setCurrentStep(1)
    }
  }

  return (
    <div className="background min-h-screen w-full overflow-hidden">

      {/* ===== HEADER ===== */}
      <div className="flex flex-col items-center justify-center mt-20">
        <p className="font-bold text-xl md:text-6xl text-[#f5f5f5]">
          Validate Your Idea!!
        </p>
      </div>

      {/* ===== FORM / LOADER ===== */}
      <div className="glass md:h-120 md:w-150 bg-black flex items-center justify-center rounded-2xl mt-10 mx-4 md:mx-auto p-2">

        {/* 👇 THIS IS THE KEY CHANGE — show loader OR form */}
        {loading ? (
          <LoadingScreen currentStep={currentStep} />
        ) : (
          <form
            className="flex flex-col gap-4 justify-center items-center"
            onSubmit={handleSubmit}
          >
            {/* Error Message */}
            {error && (
              <div className="text-sm text-[#ff4d4d] bg-[#ff4d4d]/10 border border-[#ff4d4d]/30 rounded-xl px-4 py-3 w-68 md:w-80">
                {error}
              </div>
            )}

            <label className="flex flex-col gap-1 text-sm md:text-lg font-bold text-[#f5f5f5]">
              Idea Title
              <input
                className="h-10 w-68 md:w-80 rounded-xl px-4 border border-[#004c6d] focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50 font-light"
                type="text"
                placeholder="Idea Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm md:text-lg font-bold text-[#f5f5f5]">
              Idea Description
              <textarea
                className="w-68 md:w-80 h-32 rounded-xl px-4 py-3 border border-[#004c6d] focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50 resize-none align-top font-light"
                placeholder="Describe your idea ...."
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>

            <label className="flex flex-col gap-1 text-sm md:text-lg font-bold text-[#f5f5f5]">
              Current Stage
              <div className="relative w-68 md:w-80">
                <select
                  className="w-full rounded-xl px-4 py-3 border border-[#004c6d] focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50 appearance-none cursor-pointer font-light"
                  style={{ background: '#0a0a0f', color: '#f5f5f5' }}
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                >
                  <option value="" disabled>Select your current stage...</option>
                  <option value="just-an-idea">💡 Just an Idea</option>
                  <option value="researching">🔍 Researching the Market</option>
                  <option value="have-a-plan">📋 Have a Plan</option>
                  <option value="building-prototype">🛠️ Building a Prototype</option>
                  <option value="already-launched">🚀 Already Launched</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="#00ced1" strokeWidth="2"
                      strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </label>

            <button
              type="submit"
              disabled={loading}
              className="mt-4 text-white text-md font-semibold px-6 py-3 rounded-full transition-all duration-300 cursor-pointer hover:scale-105 hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, #004c6d, #00ced1)' }}
            >
              Validate!!
            </button>
          </form>
        )}
      </div>
    </div>
  )
}