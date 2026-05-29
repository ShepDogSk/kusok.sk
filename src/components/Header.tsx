"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-leather-950 text-leather-100">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="font-serif text-xl font-semibold tracking-wide text-leather-100 hover:text-white transition-colors">
            kusok.sk
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm text-leather-300 hover:text-white transition-colors">
              Domov
            </Link>
            <Link href="/produkty" className="text-sm text-leather-300 hover:text-white transition-colors">
              Produkty
            </Link>
            <Link href="/kontakt" className="text-sm text-leather-300 hover:text-white transition-colors">
              Kontakt
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-leather-300 hover:text-white"
            aria-label="Otvoriť menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-leather-300 hover:text-white hover:bg-leather-900 rounded">
              Domov
            </Link>
            <Link href="/produkty" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-leather-300 hover:text-white hover:bg-leather-900 rounded">
              Produkty
            </Link>
            <Link href="/kontakt" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-leather-300 hover:text-white hover:bg-leather-900 rounded">
              Kontakt
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
