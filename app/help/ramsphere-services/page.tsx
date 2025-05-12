"use client"

import { useState } from "react"
import { ArrowLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function RamSphereServicesPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("all")

  const services = [
    {
      id: 1,
      name: "RamSphere Express",
      description: "Fast delivery within 24 hours for eligible products",
      icon: "🚚",
      category: "delivery",
    },
    {
      id: 2,
      name: "RamSphere Prime",
      description: "Premium membership with exclusive deals and free shipping",
      icon: "⭐",
      category: "membership",
    },
    {
      id: 3,
      name: "RamSphere Pay",
      description: "Secure payment solution with cashback rewards",
      icon: "💳",
      category: "payment",
    },
    {
      id: 4,
      name: "RamSphere Protect",
      description: "Extended warranty and protection plans for your purchases",
      icon: "🛡️",
      category: "protection",
    },
    {
      id: 5,
      name: "RamSphere Business",
      description: "B2B solutions for businesses of all sizes",
      icon: "💼",
      category: "business",
    },
    {
      id: 6,
      name: "RamSphere Global",
      description: "International shipping and customs handling",
      icon: "🌎",
      category: "delivery",
    },
    {
      id: 7,
      name: "RamSphere Rewards",
      description: "Earn points on every purchase and redeem for discounts",
      icon: "🎁",
      category: "membership",
    },
    {
      id: 8,
      name: "RamSphere Installments",
      description: "Buy now, pay later with flexible payment plans",
      icon: "📅",
      category: "payment",
    },
  ]

  const filteredServices = activeTab === "all" ? services : services.filter((service) => service.category === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">RamSphere Services</h1>
        </div>

        <div className="flex overflow-x-auto p-2 space-x-2 no-scrollbar">
          {["all", "delivery", "payment", "membership", "protection", "business"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full whitespace-nowrap text-sm ${
                activeTab === tab ? "bg-[#DEA818] text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="relative w-full h-40 rounded-lg overflow-hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg"
              alt="RamSphere Services"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h2 className="text-white text-2xl font-bold">Discover Our Services</h2>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-lg shadow p-4 flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-2xl mr-4">
                {service.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
