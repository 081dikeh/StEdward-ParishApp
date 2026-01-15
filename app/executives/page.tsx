import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata = {
  title: "Parish Executives & Priests",
  description: "Meet the leadership team of St Edwards Parish",
}

interface Executive {
  name: string
  position: string
  zone?: string
  image?: string
}

const executives: Executive[] = [
  {
    name: "Rev. Fr. Chukwuemeka Okafor",
    position: "Parish Priest",
  },
  {
    name: "Rev. Fr. Ifeanyichukwu Okoro",
    position: "Assistant Priest",
  },
  {
    name: "Mr. Nkwachukwu Eze",
    position: "Parish Council Chairman",
  },
  {
    name: "Mrs. Amarachi Eze",
    position: "Women Guild President",
  },
  {
    name: "Mr. Emeka Obi",
    position: "Zone 1 Coordinator",
    zone: "Zone 1",
  },
  {
    name: "Mr. Chinedu Nwankwo",
    position: "Zone 2 Coordinator",
    zone: "Zone 2",
  },
  {
    name: "Mr. Chisom Agu",
    position: "Zone 3 Coordinator",
    zone: "Zone 3",
  },
  {
    name: "Mr. Kazeem Adebayo",
    position: "Zone 4 Coordinator",
    zone: "Zone 4",
  },
]

export default function ExecutivesPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">Parish Leadership</h1>
            <p className="text-lg text-slate-600">
              Meet the dedicated executives and priests serving St Edwards Parish
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((executive, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-slate-200"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{executive.name}</h3>
                <p className="text-emerald-600 font-medium mt-1">{executive.position}</p>
                {executive.zone && <p className="text-sm text-slate-500 mt-2">{executive.zone}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
