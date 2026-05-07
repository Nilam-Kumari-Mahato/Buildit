import { NavLink } from "react-router-dom"

const Landing = () => {

  const steps = [
    {
      number: "01",
      title: "Describe Your Idea",
      description: "Give your startup a title and describe it in your own words — no experience or technical knowledge needed.",
      icon: "✏️"
    },
    {
      number: "02", 
      title: "AI Analyzes It",
      description: "Our AI digs deep into your idea — scoring market potential, feasibility, competition level and monetization potential.",
      icon: "🤖"
    },
    {
      number: "03",
      title: "Get Your Report",
      description: "Receive a full validation report with scores, risk level, competitors, opportunities and a final verdict.",
      icon: "📊"
    }
  ]

  return (
    <div className="background relative min-h-screen w-full overflow-hidden">
        <div className="flex flex-col items-center justify-center min-h-screen px-6">
          <div className="glass max-w-6xl w-full  px-10 py-16 flex flex-col items-center gap-8 text-center">

          <div className=" flex flex-col gap-1 justify-center items-center">
            <h1 className="font-bold text-xl md:text-6xl text-[#f5f5f5]">Turn your raw idea into a full </h1>
            <span className="font-bold text-2xl md:text-6xl text-[#00ced1]">validation report</span>
          </div>
          

          <p className=" flex items-center justify-center text-sm md:text-xl sm:pl-5 font-semibold text-[#c0c0c0]">Describe your startup idea and get scores, competitors, risks and opportunities instantly.</p>

          <NavLink 
            to="/validate"
            className="  text-white text-md font-semibold px-6 py-3 rounded-full transition-all duration-300 "
            style={{background: 'linear-gradient(135deg, #004c6d, #00ced1)'}}
          >
            Start Validating →
          </NavLink>

        </div>
      </div>
      
        {/* ===== HOW IT WORKS SECTION ===== */}
      <div className="relative z-10 flex flex-col items-center px-6 pb-24">
        <div className="max-w-2xl w-full">

          {/* Section Header */}
          <div className="text-center mb-12">
            <p className="text-xs font-semibold tracking-widest text-[#00ced1] uppercase mb-3">
              How it works
            </p>
            <h2 className="text-2xl md:text-3xl font-bold text-[#f5f5f5]">
              Three steps to clarity
            </h2>
          </div>

          {/* Timeline */}
          <div className="flex flex-col">
            {steps.map((step, index) => (
              <div key={step.number} className="flex gap-6 relative">

                {/* Left — number + line */}
                <div className="flex flex-col items-center">
                  {/* Number circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 z-10"
                    style={{ background: 'linear-gradient(135deg, #004c6d, #00ced1)' }}
                  >
                    {step.number}
                  </div>
                  {/* Connector line — hide on last item */}
                  {index < steps.length - 1 && (
                    <div
                      className="w-[1px] flex-1 my-2"
                      style={{ background: 'linear-gradient(to bottom, #00ced1, transparent)' }}
                    />
                  )}
                </div>

                {/* Right — content card */}
                <div className={`glass flex-1 p-6 mb-6 ${index < steps.length - 1 ? 'mb-6' : ''}`}>
                  <p className="text-xs font-semibold text-[#00ced1] mb-2 tracking-wide">
                    STEP {step.number}
                  </p>
                  <h3 className="text-lg font-bold text-[#f5f5f5] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#c0c0c0] leading-relaxed">
                    {step.description}
                  </p>
                </div>

              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-6">
            <NavLink
              to="/validate"
              className="inline-block px-8 py-3.5 rounded-full text-sm font-semibold text-white transition-all duration-300 hover:scale-105"
              style={{ background: 'linear-gradient(135deg, #004c6d, #00ced1)' }}
            >
              Try It Now →
            </NavLink>
          </div>

        </div>
      </div>

      {/* ===== FOOTER ===== */}
      <div className="relative z-10 border-t border-white/10 py-6 text-center">
        <p className="text-xs text-[#c0c0c0]">
          © 2025 Buildit. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Landing