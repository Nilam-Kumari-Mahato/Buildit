import { useState , useEffect, use } from "react"
import { validateIdea } from "../utils/gemini"
import { useNavigate } from "react-router-dom"
import { generateId } from "../utils/generateId"


export default function Validate() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [stage, setStage] = useState("")
    const [loading , setloading] = useState(false)
    const [error , setError] = useState("")

    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setError("")

        if(!title.trim()) return setError("Title is required")
        if(!description.trim()) return setError("Description is required")
        if(!stage) return setError("Please select a stage")

        try {
            setloading(true)

            const result =await validateIdea(title , description , stage)
            const id = generateId()

            console.log(result)
        }catch(err) {
            setError("Something went wrong. Please try again.")
            console.error(err)
        }finally{
            setloading(false)
        }

    }

    return (
        <div className="background min-h-screen w-full overflow-hidden">
            {/* ===== HEADER ===== */}
            <div className="flex flex-col items-center justify-center mt-20">
                <p className="font-bold text-xl md:text-6xl text-[#f5f5f5]">Validate Your Idea!!</p>
            </div>

            {/* ===== FORM ===== */}
            <div>
                <form 
                className="flex flex-col justify-center items-center"
                onSubmit={handleSubmit}
                >
                    <label className="flex flex-col gap-1 text-[#f5f5f5]">Idea Title 
                        <input 
                            className="h-10 w-80 rounded-xl px-4 border border-[#004c6d] focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50"
                            type="text" 
                            placeholder="Idea Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-[#f5f5f5]">Idea Description 
                         <textarea
                            className="w-80 h-32 rounded-xl px-4 py-3 border border-[#004c6d] focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50 resize-none align-top"
                            placeholder="Describe your idea ...."
                            rows={5}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-[#f5f5f5]">
                        Current Stage
                        {/* Wrapper for custom arrow */}
                        <div className="relative w-80">
                            <select
                            className="w-full rounded-xl px-4 py-3 border border-[#004c6d]
                            focus:outline-none focus:ring-2 focus:ring-[#00ced1]
                            focus:ring-opacity-50 appearance-none cursor-pointer"
                            style={{ background: '#0a0a0f', color: '#f5f5f5' }}
                            value={stage}
                            onChange={(e) => setStage(e.target.value)}
                            >
                            <option value="" disabled selected>Select your current stage...</option>
                            <option value="just-an-idea">💡 Just an Idea</option>
                            <option value="researching">🔍 Researching the Market</option>
                            <option value="have-a-plan">📋 Have a Plan</option>
                            <option value="building-prototype">🛠️ Building a Prototype</option>
                            <option value="already-launched">🚀 Already Launched</option>
                            </select>

                            {/* Custom arrow icon */}
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#00ced1]">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M2 4L6 8L10 4" stroke="#00ced1" strokeWidth="2" 
                                strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            </div>
                        </div>
                    </label>

                    <button 
                        className=" mt-4  text-white text-md font-semibold px-6 py-3 rounded-full transition-all duration-300 "
                        style={{background: 'linear-gradient(135deg, #004c6d, #00ced1)'}}
                    >
                        Validate!!
                    </button>
                </form>
            </div>
            
        </div>
    )
}