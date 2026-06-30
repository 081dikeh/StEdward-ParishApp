import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata = {
  title: "Parish Executives & Priests",
  description: "Meet the leadership team of St William Parish",
}

interface Executive {
  name: string
  position: string
  role: "clergy" | "council" | "zone"
  zone?: string
}

const executives: Executive[] = [
  { name: "Rev. Fr. Chukwuemeka Okafor", position: "Parish Priest", role: "clergy" },
  { name: "Rev. Fr. Ifeanyichukwu Okoro", position: "Assistant Priest", role: "clergy" },
  { name: "Mr. Nkwachukwu Eze", position: "Parish Council Chairman", role: "council" },
  { name: "Mrs. Amarachi Eze", position: "Women Guild President", role: "council" },
  { name: "Mr. Emeka Obi", position: "Zone 1 Coordinator", role: "zone", zone: "Zone 1" },
  { name: "Mr. Chinedu Nwankwo", position: "Zone 2 Coordinator", role: "zone", zone: "Zone 2" },
  { name: "Mr. Chisom Agu", position: "Zone 3 Coordinator", role: "zone", zone: "Zone 3" },
  { name: "Mr. Kazeem Adebayo", position: "Zone 4 Coordinator", role: "zone", zone: "Zone 4" },
]

function getInitials(name: string) {
  return name
    .replace(/^(Rev\.|Fr\.|Mr\.|Mrs\.|Dr\.)\s+/, "")
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase()
}

const roleStyles: Record<Executive["role"], { avatar: string; badge: string; label: string }> = {
  clergy: {
    avatar: "bg-emerald-600 text-white",
    badge: "bg-emerald-100 text-emerald-800",
    label: "Clergy",
  },
  council: {
    avatar: "bg-blue-600 text-white",
    badge: "bg-blue-100 text-blue-800",
    label: "Parish Council",
  },
  zone: {
    avatar: "bg-slate-700 text-white",
    badge: "bg-slate-100 text-slate-700",
    label: "Zone",
  },
}

export default function ExecutivesPage() {
  const clergy = executives.filter((e) => e.role === "clergy")
  const council = executives.filter((e) => e.role === "council")
  const zones = executives.filter((e) => e.role === "zone")

  const Section = ({ title, items }: { title: string; items: Executive[] }) => (
    <div className="mb-12">
      <h2 className="text-xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-200">{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((exec, idx) => {
          const styles = roleStyles[exec.role]
          return (
            <div
              key={idx}
              className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 hover:shadow-md hover:border-slate-200 transition-all flex flex-col items-center text-center"
            >
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-4 ${styles.avatar} shadow-sm`}
              >
                {getInitials(exec.name)}
              </div>
              <h3 className="text-sm font-bold text-slate-900 leading-tight">{exec.name}</h3>
              <p className="text-sm text-slate-500 mt-1">{exec.position}</p>
              {exec.zone && (
                <span className={`mt-3 text-xs font-semibold px-2.5 py-1 rounded-full ${styles.badge}`}>
                  {exec.zone}
                </span>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )

  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Parish Leadership</h1>
            <p className="text-lg text-slate-500">
              The dedicated priests and executives serving St William Parish, Amawbia
            </p>
          </div>

          <Section title="Clergy" items={clergy} />
          <Section title="Parish Council" items={council} />
          <Section title="Zone Coordinators" items={zones} />
        </div>
      </section>

      <Footer />
    </main>
  )
}
