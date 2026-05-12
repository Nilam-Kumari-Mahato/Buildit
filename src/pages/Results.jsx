import { useState , useEffect } from "react"
import { useParams } from "react-router-dom"

export default function Results() {
    const { id } = useParams()
    const [result , setResult] = useState(null)
    const [loading , setLoading] = useState(true)
    const [error , setError] =useState(null)

    useEffect(() =>{
        const saved =localStorage.getItem(`result_${id}`)

        if(saved) {
            setResult(JSON.parse(saved))
        }else{
            setError("Report not found")
        }

        console.log(saved);
        setLoading(false);
    } , [id])



   if (loading) return (
    <div className="background min-h-screen flex items-center justify-center">
      <p className="text-[#f5f5f5] text-lg">Loading report...</p>
    </div>
  )

  if (error) return (
    <div className="background min-h-screen flex items-center justify-center">
      <p className="text-[#ff4d4d] text-lg">{error}</p>
    </div>
  )

  if (!result) return null

  return (
    <div className="background min-h-screen w-full overflow-hidden">

      {/* ORBS */}
      <div className="orb orb1" />
      <div className="orb orb2" />
      <div className="orb orb3" />
      <div className="orb orb4" />

      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">

        {/* We'll build each section here one by one */}
        <p className="text-white">Report loaded! ID: {id}</p>
        <pre className="text-white text-xs mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>

      </div>
    </div>
  )
}