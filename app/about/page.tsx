import { Navigation } from "@/components/navigation"
import Footer from "@/components/footer"

export const metadata = {
  title: "About St Edwards Parish",
  description: "Learn about our parish history, mission, and community",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navigation />

      <section className="py-16 md:py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">About St Edwards Parish</h1>

          <div className="space-y-8 text-slate-700 text-lg leading-relaxed">
            <p>
              St Edwards Parish, located in the heart of Amawbia, stands as a beacon of faith and community service. Our
              parish has a rich history of spiritual leadership and dedication to the Catholic faith.
            </p>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h2>
              <p>
                To foster spiritual growth, strengthen family bonds, and serve our community with love and compassion.
                We are committed to living out the Gospel message through active participation in sacramental life and
                charitable works.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Our History</h2>
              <p>
                Founded on the principles of Catholic faith and community unity, St Edwards Parish has grown into a
                vibrant spiritual home for thousands of faithful. Over the years, our parish has evolved to meet the
                spiritual and social needs of our members.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Parish Structure</h2>
              <p>
                Our parish is divided into four zones to ensure better pastoral care and community engagement. Each zone
                has dedicated leaders and coordinators who work tirelessly to serve our members.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
