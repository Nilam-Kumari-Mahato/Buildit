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


      {/* CONTENT */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 pt-28 pb-20">

        <div className="glass w-full m-3 px-4 py-8">
            <p className="font-semibold text-m text-[#00ced1] mb-2">Validation Report</p>
            <div className="flex flex-row gap-4 py-2">
                <p className="md:text-3xl font-bold text-[#f5f5f5] ">{result.title}</p>
                <span className="flex items-center text-sm font-light text-[#00ced1] bg-[#004c6d] rounded-full pl-2 pr-2">{result.stage}</span>
            </div>
            <p className="text-lg font-semibold text-[#c0c0c0] ">{result.summary.industry}</p>

            <div className="mt-3 flex flex-row gap-7 ">
                <button className=" py-1 px-2 rounded-lg border border-[#c0c0c0] cursor-pointer text-[#f5f5f5]">Share</button>
                <button className=" py-1 px-2 rounded-lg border border-[#c0c0c0] cursor-pointer text-[#f5f5f5]">Download pdf</button>
            </div>

        </div>

        {/* We'll build each section here one by one */}
        <p className="text-white">Report loaded! ID: {id}</p>
        <pre className="text-white text-xs mt-4">
          {JSON.stringify(result, null, 2)}
        </pre>

      </div>
    </div>
  )
}