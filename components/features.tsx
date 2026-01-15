import { Heart, Users, BookOpen, Music } from "lucide-react"

const features = [
  {
    icon: Heart,
    title: "Community",
    description: "A welcoming parish family united in faith and service to one another",
  },
  {
    icon: Users,
    title: "Spiritual Growth",
    description: "Sacraments, counseling, and programs for all ages and life stages",
  },
  {
    icon: BookOpen,
    title: "Religious Education",
    description: "Marriage courses, baptism preparation, and ongoing faith formation",
  },
  {
    icon: Music,
    title: "Vibrant Worship",
    description: "Inspiring liturgies and meaningful celebrations of our Catholic faith",
  },
]

export function Features() {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Parish Life</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Experience the warmth and support of our parish community
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => {
            const Icon = feature.icon
            return (
              <div key={idx} className="text-center space-y-4 p-6 rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex justify-center">
                  <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Icon size={32} className="text-emerald-600" />
                  </div>
                </div>
                <h3 className="font-semibold text-lg text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{feature.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
