import { useState ,useEffect } from "react"
import { NavLink , useLocation } from "react-router-dom"


export default function Navbar() {
    const [scrolled , setScrolled] = useState(false);
    const [menuOpen , setMenuOpen] = useState(false);
    const location =useLocation();

    useEffect(() =>{
        setMenuOpen(false);
    } , [location]);

    const navLinks = [
        {to: "/" , label: "Home"},
        {to: "/history" , label: "History"}
    ]

    return(
        <nav 
            className="fixed top-0 left-0 right-0 z-50 bg-primary "
        >
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">

                {/* Logo */}
                <NavLink to="/" className="flex items-center justify-center gap-2">
                    {/* logo icon */}
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'linear-gradient(135deg, #00ced1, #004c6d)'}}
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M3 13L8 3L13 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M5 9H11" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </div>
                    {/* logo text */}
                    <span className="text-xl font-bold tracking-tight transition-opacity duration-300 group-hover:opacity-80"
                    style={{
                    background: 'linear-gradient(90deg, #f5f5f5, #00ced1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                    }}
                    >
                        Buildit
                    </span>
                </NavLink> 

            </div>


        </nav>
    )
}