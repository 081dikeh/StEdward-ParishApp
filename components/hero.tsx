import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          {/* Text side */}
          <div className="flex flex-col justify-center px-6 py-16 sm:px-10 lg:px-16 xl:px-20 order-2 lg:order-1">
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">
              Amawbia, Anambra State
            </p>
            <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              St Edwards
              <span className="block text-emerald-600">Parish</span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-md">
              A vibrant Catholic community rooted in faith, sacramental life, and service to
              our neighbours — from baptism to marriage and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 shadow-md" asChild>
                <Link href="/registrations">Join Our Parish</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-slate-300 text-slate-700 hover:bg-slate-50 bg-transparent"
              >
                <Link href="/about">Our Story</Link>
              </Button>
            </div>

            {/* Quick stats */}
            <div className="mt-12 flex gap-8">
              <div>
                <p className="text-3xl font-extrabold text-emerald-600">4</p>
                <p className="text-sm text-slate-500 mt-0.5">Parish Zones</p>
              </div>
              <div className="border-l border-slate-200 pl-8">
                <p className="text-3xl font-extrabold text-emerald-600">4+</p>
                <p className="text-sm text-slate-500 mt-0.5">Services Online</p>
              </div>
              <div className="border-l border-slate-200 pl-8">
                <p className="text-3xl font-extrabold text-emerald-600">∞</p>
                <p className="text-sm text-slate-500 mt-0.5">Faith &amp; Community</p>
              </div>
            </div>
          </div>

          {/* Image side */}
          <div className="relative order-1 lg:order-2 h-64 sm:h-80 lg:h-auto">
            <Image
              src="/white-flowers-peonies-lilies-elegant.jpg"
              alt="Elegant flowers representing the beauty of parish sacraments"
              fill
              className="object-cover"
              priority
            />
            {/* Gradient overlay so text on left reads cleanly on small screens */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/5 lg:hidden" />
            {/* Decorative side gradient blending into white */}
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white to-transparent hidden lg:block" />
          </div>
        </div>
      </div>
    </section>
  )
}
