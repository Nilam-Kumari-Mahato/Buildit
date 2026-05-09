export default function History() {
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
                >
                    <label className="flex flex-col gap-1 text-[#f5f5f5]">Idea Title 
                        <input 
                            className="h-10 w-80 rounded-xl px-4 border border-[#004c6d] focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50"
                            type="text" 
                            placeholder="Idea Title"
                        />
                    </label>
                    <label className="flex flex-col gap-1 text-[#f5f5f5]">Idea Description 
                         <textarea
                            className="w-80 h-32 rounded-xl px-4 py-3 border border-[#004c6d] focus:outline-none focus:ring-2 focus:ring-[#00ced1] focus:ring-opacity-50 resize-none align-top"
                            placeholder="Describe your idea ...."
                            rows={5}
                            
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