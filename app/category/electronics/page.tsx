"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

// Subcategories for Consumer Electronics
const subcategories = [
  {
    title: "Mobile Phones & Accessories",
    items: [
      {
        name: "Smartphones",
        image: "/placeholder.svg?height=100&width=100&text=Smartphones",
        path: "/category/electronics/phones",
      },
      {
        name: "Phone Cases",
        image: "/placeholder.svg?height=100&width=100&text=Cases",
        path: "/category/electronics/phones",
      },
      {
        name: "Screen Protectors",
        image: "/placeholder.svg?height=100&width=100&text=Protectors",
        path: "/category/electronics/phones",
      },
      {
        name: "Power Banks",
        image: "/placeholder.svg?height=100&width=100&text=Power+Banks",
        path: "/category/electronics/phones",
      },
      {
        name: "Chargers & Cables",
        image: "/placeholder.svg?height=100&width=100&text=Chargers",
        path: "/category/electronics/phones",
      },
      {
        name: "Selfie Sticks",
        image: "/placeholder.svg?height=100&width=100&text=Selfie",
        path: "/category/electronics/phones",
      },
    ],
  },
  {
    title: "Computer & Office",
    items: [
      {
        name: "Laptops",
        image: "/placeholder.svg?height=100&width=100&text=Laptops",
        path: "/category/electronics/computers",
      },
      {
        name: "Tablets",
        image: "/placeholder.svg?height=100&width=100&text=Tablets",
        path: "/category/electronics/computers",
      },
      {
        name: "Computer Components",
        image: "/placeholder.svg?height=100&width=100&text=Components",
        path: "/category/electronics/computers",
      },
      {
        name: "Mice & Keyboards",
        image: "/placeholder.svg?height=100&width=100&text=Keyboards",
        path: "/category/electronics/computers",
      },
      {
        name: "Monitors",
        image: "/placeholder.svg?height=100&width=100&text=Monitors",
        path: "/category/electronics/computers",
      },
      {
        name: "Printers",
        image: "/placeholder.svg?height=100&width=100&text=Printers",
        path: "/category/electronics/computers",
      },
    ],
  },
  {
    title: "Audio & Video",
    items: [
      {
        name: "Headphones",
        image: "/placeholder.svg?height=100&width=100&text=Headphones",
        path: "/category/electronics/audio",
      },
      {
        name: "Bluetooth Speakers",
        image: "/placeholder.svg?height=100&width=100&text=Speakers",
        path: "/category/electronics/audio",
      },
      {
        name: "Microphones",
        image: "/placeholder.svg?height=100&width=100&text=Microphones",
        path: "/category/electronics/audio",
      },
      {
        name: "Projectors",
        image: "/placeholder.svg?height=100&width=100&text=Projectors",
        path: "/category/electronics/audio",
      },
    ],
  },
  {
    title: "Cameras & Photography",
    items: [
      {
        name: "Digital Cameras",
        image: "/placeholder.svg?height=100&width=100&text=Cameras",
        path: "/category/electronics/cameras",
      },
      {
        name: "Action Cameras",
        image: "/placeholder.svg?height=100&width=100&text=Action+Cam",
        path: "/category/electronics/cameras",
      },
      {
        name: "Camera Lenses",
        image: "/placeholder.svg?height=100&width=100&text=Lenses",
        path: "/category/electronics/cameras",
      },
      {
        name: "Tripods",
        image: "/placeholder.svg?height=100&width=100&text=Tripods",
        path: "/category/electronics/cameras",
      },
    ],
  },
  {
    title: "Smart Devices",
    items: [
      {
        name: "Smart Watches",
        image: "/placeholder.svg?height=100&width=100&text=Watches",
        path: "/category/electronics/smart",
      },
      {
        name: "Smart Home",
        image: "/placeholder.svg?height=100&width=100&text=Smart+Home",
        path: "/category/electronics/smart",
      },
      {
        name: "Fitness Trackers",
        image: "/placeholder.svg?height=100&width=100&text=Fitness",
        path: "/category/electronics/smart",
      },
      {
        name: "VR Headsets",
        image: "/placeholder.svg?height=100&width=100&text=VR",
        path: "/category/electronics/smart",
      },
    ],
  },
]

// Main categories for the sidebar
const mainCategories = [
  { name: "Home & Garden", path: "/category/home-garden" },
  { name: "Hair Extensions & Wigs", path: "/category/hair-extensions" },
  { name: "Men's Clothing", path: "/category/mens-clothing" },
  { name: "Accessories", path: "/category/accessories" },
  { name: "Consumer Electronics", path: "/category/electronics", active: true },
  { name: "Home Improvement & Lighting", path: "/category/home-improvement" },
  { name: "Home Appliances", path: "/category/home-appliances" },
  { name: "Automotive & Motorcycle", path: "/category/automotive" },
  { name: "Luggages & Bags", path: "/category/luggage" },
  { name: "Shoes", path: "/category/shoes" },
  { name: "Special Occasion", path: "/category/special-occasion" },
]

export default function ElectronicsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header with search bar */}
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-2">
        <div className="flex items-center">
          <button onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </button>

          <form
            onSubmit={handleSearch}
            className="flex-1 flex items-center bg-gray-100 rounded-full overflow-hidden border border-gray-300"
          >
            <input
              type="text"
              placeholder="Search in Electronics"
              className="flex-1 py-2 px-4 bg-transparent outline-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="button" className="p-2">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </form>

          <div className="ml-2 relative">
            <Bell className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              28
            </span>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar with main categories */}
        <div className="w-[172px] bg-gray-100 overflow-y-auto">
          {mainCategories.map((category, index) => (
            <Link
              href={category.path}
              key={index}
              className={`block px-4 py-3 text-sm hover:bg-white ${category.active ? "text-red-500 font-medium" : ""}`}
            >
              {category.name}
            </Link>
          ))}
        </div>

        {/* Main content with subcategories */}
        <div className="flex-1 overflow-y-auto">
          {subcategories.map((group, groupIndex) => (
            <div key={groupIndex} className="mb-6">
              <h2 className="text-xl font-bold px-4 py-2">{group.title}</h2>

              <div className="grid grid-cols-3 gap-4 px-4">
                {group.items.map((item, itemIndex) => (
                  <Link href={item.path} key={itemIndex} className="flex flex-col items-center">
                    <div className="relative w-20 h-20 mb-2">
                      <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                    </div>
                    <span className="text-center text-xs">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
