import { useState, useEffect } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'



// Hello Test 

export default function Navbar() {
  const [shrunk, setShrunk] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setShrunk(true)
      } else {
        setShrunk(false)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar ${shrunk ? 'shrunk' : ''}`}>
      <a href="/">
        <img
          className={`navbar-logo-img ${shrunk ? 'logo-shrunk' : ''}`}
          src={logo}
          alt="RebarOptima Logo"
        />
      </a>
    </header>
  )
}
