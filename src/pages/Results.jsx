import { useState , useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function Results() {
    const location = useLocation()
    const  result  = location.state?.result 
    console.log(result)

    return (
        <div className="background ">
            <h1 className="flex flex-col items-center justify-center h-screen text-2xl text-white">Results</h1>
        </div>
    )
}