"use client"

import Link from "next/link"
import { ShoppingCart, Menu } from "lucide-react"
import { useState } from "react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">🌸</span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground">Bloom & Blossom</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="#flowers" className="text-foreground hover:text-primary transition">
              Shop
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition">
              About
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-foreground hover:text-primary transition">
              <ShoppingCart size={20} />
              <span className="absolute top-1 right-1 w-4 h-4 bg-accent rounded-full text-xs text-accent-foreground flex items-center justify-center font-bold">
                0
              </span>
            </button>
            <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={20} className="text-foreground" />
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            <Link href="#flowers" className="text-foreground hover:text-primary transition py-2">
              Shop
            </Link>
            <Link href="#about" className="text-foreground hover:text-primary transition py-2">
              About
            </Link>
            <Link href="#contact" className="text-foreground hover:text-primary transition py-2">
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
