'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function FloatingFooter() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    function onScroll() {
      const currentScrollY = window.scrollY

      // Always show footer near top
      if (currentScrollY < 50) {
        setHidden(false)
      } 
      // Scrolling down → hide
      else if (currentScrollY > lastScrollY) {
        setHidden(true)
      } 
      // Scrolling up → show
      else {
        setHidden(false)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lastScrollY])

  return (
    <footer
      className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out
        ${hidden ? 'translate-y-full' : 'translate-y-0'}
      `}
    >
      <nav className="max-w-5xl mx-auto mb-2 px-4">
        <div className="flex justify-around items-center rounded-2xl bg-white shadow-lg border py-3 text-sm">
          <Link href="/" className="text-emerald-600 font-medium">
            Home
          </Link>
          <Link href="/updates" className="text-gray-600 hover:text-emerald-600">
            Updates
          </Link>
          <Link
            href="/laporan/iuran-2026"
            className="text-gray-600 hover:text-emerald-600"
          >
            Iuran 2026
          </Link>
          <Link
            href="/laporan/thr-2026"
            className="text-gray-600 hover:text-emerald-600"
          >
            THR 2026
          </Link>
          <Link
            href="/laporan/about"
            className="text-gray-600 hover:text-emerald-600"
          >
            About
          </Link>
        </div>
      </nav>
    </footer>
  )
}
