"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const [currentImage, setCurrentImage] = useState(0)

  // Using the provided images
  const images = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg", // smartphone
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg", // laptop
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg", // smartphone again for demo
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg", // laptop again for demo
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 flex flex-col">
      {/* Header with logo */}
      <header className="w-full py-6 px-6 md:px-10 flex items-center">
        <div className="relative h-12 w-12">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-wjDSju0zJt1TdulWpb6FPeZ235IGXT.png"
            alt="RamSphere Logo"
            fill
            className="object-contain"
          />
        </div>
        <h2 className="ml-3 text-xl font-semibold text-gray-800">RamSphere</h2>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10 md:py-16">
        <div className="max-w-6xl w-full mx-auto">
          {/* Hero section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Discover Premium Shopping <span className="text-[#DEA818]">Experience</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our curated collection of high-quality products with exclusive deals and personalized
              recommendations.
            </p>
          </div>

          {/* Featured products grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-16">
            {/* Main featured product */}
            <div className="md:col-span-2 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 transition-transform duration-300 hover:shadow-xl">
              <div className="relative aspect-[16/9] md:aspect-[16/10] w-full overflow-hidden">
                <Image
                  src={images[currentImage] || "/placeholder.svg"}
                  alt="Featured product"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6">
                  <span className="bg-[#DEA818] text-white px-3 py-1 rounded-full text-sm font-medium">Featured</span>
                  <h3 className="text-white text-xl md:text-2xl font-bold mt-2">Premium Tech Collection</h3>
                </div>
              </div>
            </div>

            {/* Side products */}
            <div className="flex flex-col gap-6">
              {[1, 2].map((offset) => (
                <div
                  key={offset}
                  className="rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 transition-transform duration-300 hover:shadow-xl"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <Image
                      src={images[(currentImage + offset) % images.length] || "/placeholder.svg"}
                      alt="Product"
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-white text-lg font-bold">Latest Arrivals</h3>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Promotional section */}
          <div className="bg-gradient-to-r from-[#001F3F] to-[#003366] rounded-2xl p-8 md:p-10 text-white mb-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0 md:mr-8">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Exclusive Deals, Only for You!</h2>
                <p className="text-gray-200 mb-6">
                  Sign up now and get access to limited-time offers, personalized recommendations, and early access to
                  new products.
                </p>
                <Button
                  onClick={onGetStarted}
                  className="bg-[#DEA818] hover:bg-[#c99616] text-white px-8 py-6 rounded-full text-lg font-medium transition-all duration-300 hover:shadow-lg flex items-center"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <div className="relative h-32 w-32 md:h-40 md:w-40">
                <div className="absolute inset-0 bg-[#DEA818] rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-3 bg-[#DEA818] rounded-full opacity-30"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-4xl md:text-5xl font-bold">50%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Features section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { title: "Free Shipping", description: "On orders over $50" },
              { title: "Secure Payments", description: "100% secure checkout" },
              { title: "24/7 Support", description: "Dedicated customer service" },
            ].map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-6 md:px-10 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} RamSphere. All rights reserved.</p>
      </footer>
    </div>
  )
}
