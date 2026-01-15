import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-3">
            <h3 className="font-bold text-lg">St Edwards Parish</h3>
            <p className="text-slate-400 text-sm">Amawbia, Nigeria</p>
            <p className="text-slate-400 text-sm">A vibrant Catholic community</p>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-slate-100 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/executives" className="hover:text-slate-100 transition">
                  Leadership
                </Link>
              </li>
              <li>
                <Link href="/registrations" className="hover:text-slate-100 transition">
                  Registrations
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/courses" className="hover:text-slate-100 transition">
                  Marriage Courses
                </Link>
              </li>
              <li>
                <Link href="/registrations" className="hover:text-slate-100 transition">
                  Baptism Registration
                </Link>
              </li>
              <li>
                <Link href="/donate" className="hover:text-slate-100 transition">
                  Donate / Pay Tithe
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Email: info@stedwardsparish.org</li>
              <li>Phone: +234 XXX XXXX XXX</li>
              <li>Location: Amawbia, Anambra State</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-sm text-slate-400">
          <p>&copy; 2025 St Edwards Parish, Amawbia. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
