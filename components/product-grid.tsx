"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Romantic Red Roses",
    price: "$85",
    image: "/red-roses-bouquet-premium-flowers.jpg",
    description: "Dozen premium red roses",
  },
  {
    id: 2,
    name: "Pastel Sunflowers",
    price: "$65",
    image: "/sunflowers-bouquet-arrangement.jpg",
    description: "Vibrant sunflower collection",
  },
  {
    id: 3,
    name: "Lavender Dreams",
    price: "$55",
    image: "/lavender-flowers-bouquet-elegant.jpg",
    description: "Calming lavender medley",
  },
  {
    id: 4,
    name: "Cherry Blossom Mix",
    price: "$75",
    image: "/cherry-blossom-pink-white-flowers.jpg",
    description: "Spring inspired arrangement",
  },
  {
    id: 5,
    name: "Tropical Paradise",
    price: "$95",
    image: "/tropical-flowers-birds-of-paradise.jpg",
    description: "Exotic flower selection",
  },
  {
    id: 6,
    name: "Minimalist White",
    price: "$70",
    image: "/white-flowers-peonies-lilies-elegant.jpg",
    description: "Pure elegance collection",
  },
]

export default function ProductGrid() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((fav) => fav !== id) : [...prev, id]))
  }

  return (
    <section id="flowers" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground mb-4">Our Collections</h2>
          <p className="text-foreground/70 text-lg">Handpicked flowers for every occasion and season</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-primary/50 transition-all duration-300"
            >
              <div className="relative overflow-hidden bg-muted aspect-square">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={() => toggleFavorite(product.id)}
                  className="absolute top-4 right-4 p-2 bg-white/90 rounded-full hover:bg-white transition"
                >
                  <Heart
                    size={20}
                    className={favorites.includes(product.id) ? "fill-accent text-accent" : "text-foreground"}
                  />
                </button>
              </div>

              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-1">{product.name}</h3>
                  <p className="text-foreground/60 text-sm">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-serif text-2xl font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
