"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, LayoutDashboard, LogOut, Shield } from "lucide-react"
import { useState } from "react"
import { useSession, signOut } from "next-auth/react"

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { data: session } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  const user = session?.user
  const isAdmin = user?.isAdmin

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/executives", label: "Executives" },
    { href: "/registrations", label: "Registrations" },
    { href: "/courses", label: "Courses" },
    { href: "/donate", label: "Donate" },
  ]

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push("/")
    router.refresh()
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href)

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-9 h-9 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-base">✦</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-slate-900 leading-tight">St Edwards Parish</p>
              <p className="text-xs text-slate-500">Amawbia</p>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-0.5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-emerald-700 bg-emerald-50 font-semibold"
                    : "text-slate-600 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {user ? (
              <div className="hidden sm:flex items-center gap-2">
                {isAdmin && (
                  <Button variant="ghost" size="sm" asChild className="text-purple-700 hover:bg-purple-50">
                    <Link href="/admin" className="flex items-center gap-1.5">
                      <Shield size={14} /> Admin
                    </Link>
                  </Button>
                )}
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/protected/dashboard" className="flex items-center gap-1.5">
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <LogOut size={14} /> Logout
                </Button>
              </div>
            ) : (
              <div className="hidden sm:flex gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/auth/login">Login</Link>
                </Button>
                <Button size="sm" asChild className="bg-emerald-600 hover:bg-emerald-700">
                  <Link href="/auth/sign-up">Sign Up</Link>
                </Button>
              </div>
            )}

            <button
              className="md:hidden p-2 rounded-md hover:bg-slate-100 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 pt-2 space-y-1 border-t border-slate-100 mt-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                  isActive(item.href)
                    ? "text-emerald-700 bg-emerald-50 font-semibold"
                    : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-purple-700 hover:bg-purple-50 rounded-md"
                    >
                      <Shield size={14} /> Admin Panel
                    </Link>
                  )}
                  <Link
                    href="/protected/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-md"
                  >
                    <LayoutDashboard size={14} /> Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setIsOpen(false) }}
                    className="flex items-center gap-2 w-full px-3 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md"
                  >
                    <LogOut size={14} /> Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-2 px-1">
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/auth/login" onClick={() => setIsOpen(false)}>Login</Link>
                  </Button>
                  <Button size="sm" className="w-full bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href="/auth/sign-up" onClick={() => setIsOpen(false)}>Sign Up</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
