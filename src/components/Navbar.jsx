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
            style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.4)' }}
        >
            <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between"
            
            >

                {/* Logo */}
                <NavLink to="/" className="flex items-center  gap-2 group">
                    {/* logo text */}
                    <span className="text-xl font-bold tracking-tight transition-opacity duration-300 group-hover:opacity-80"
                    style={{
                    background: 'linear-gradient(90deg, #004c6d, #00ced1)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                    }}
                    >
                        Buildit
                    </span>
                </NavLink> 

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex items-center gap-6">
                        {navLinks.map(({to , label}) => (
                            <NavLink 
                                to={to} 
                                key={to} 
                                className={({isActive}) => 
                                    `relative text-sm font-medium transition-all duration-300 pb-1 ${isActive ? 'text-[#00ced1]' : 'text-[#c0c0c0] hover:text-[#f5f5f5]'}`
                                }
                            >
                                {({isActive}) =>(
                                    <>
                                        {label}

                                        <span className={`absolute bottom-0 left-0  h-1 rounded-full
                                        transition-all duration-300 ${isActive ? 'w-full' : 'w-0'}`}
                                        style={{background: 'linear-gradient(90deg, #00ced1, #004c6d)'}}
                                        ></span>
                                    </>
                                )}
                                
                            </NavLink>
                        ))}
                    </div>
                

                    {/*CTA Button */}
                    <NavLink
                    to="/validate"
                    className="relative px-5 py-2 rounded-full text-sm font-semiboldbold text-white overflow-hidden group transition-all duration-300"
                    style={{background: 'linear-gradient(135deg, #004c6d, #00ced1)'}}
                    >
                        <span className="relative z-10">Validate idea</span>
                        <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(135deg, #00ced1, #004c6d)' }}
                        />
                    </NavLink>
                </div>

                {/*mobile hamburger menu*/}
                    <button
                className="md:hidden flex flex-col gap-[5px] p-2"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
                >
                    <span className={`block w-6 h-[2px] bg-[#f5f5f5] rounded-full transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                    <span className={`block w-6 h-[2px] bg-[#f5f5f5] rounded-full transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
                    <span className={`block w-6 h-[2px] bg-[#f5f5f5] rounded-full transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                </button>

            </div>

            
            
            {/* Mobile Menu */}
            {menuOpen && (
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${
                    menuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                    style={{ backdropFilter: 'blur(12px)', background: 'rgba(0,0,0,0.4)' }}
                >
                    <div className="px-6 py-4 flex flex-col gap-4 border-t border-white/10">
                        {navLinks.map(({to ,label}) => (
                            <NavLink
                                to={to}
                                key={to}
                                className={({isActive}) => `text-sm font-medium transition-colors duration-300 ${isActive ? 'text-[#00ced1]': 'text-[#c0c0c0] hover:text-[#f5f5f5]'} `}
                            >
                                {label}
                            </NavLink>
                        ))}

                        <NavLink to="/validate" className="w-full text-center px-5 py-2 rounded-full text-sm font-semibold text-white mt-2" style={{background: 'linear-gradient(135deg, #004c6d, #00ced1)'}}>
                            <span className="relative z-10">Validate idea </span>
                        </NavLink>
                    </div>
                </div>
            )}


        </nav>
    )
}