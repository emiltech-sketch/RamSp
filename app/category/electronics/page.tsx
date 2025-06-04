"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Bell, Grid3X3 } from "lucide-react"
import { useRouter } from "next/navigation"

// Subcategories for Consumer Electronics
const subcategories = [
  {
    title: "Mobile Phones & Accessories",
    items: [
      {
        name: "Smartphones",
        image: "/placeholder.svg?height=80&width=80&text=📱",
        path: "/category/electronics/phones",
        icon: "📱",
      },
      {
        name: "Phone Cases",
        image: "/placeholder.svg?height=80&width=80&text=📱",
        path: "/category/electronics/phones",
        icon: "🛡️",
      },
      {
        name: "Screen Protectors",
        image: "/placeholder.svg?height=80&width=80&text=📱",
        path: "/category/electronics/phones",
        icon: "🔒",
      },
      {
        name: "Power Banks",
        image: "/placeholder.svg?height=80&width=80&text=🔋",
        path: "/category/electronics/phones",
        icon: "🔋",
      },
      {
        name: "Chargers & Cables",
        image: "/placeholder.svg?height=80&width=80&text=🔌",
        path: "/category/electronics/phones",
        icon: "🔌",
      },
      {
        name: "Wireless Chargers",
        image: "/placeholder.svg?height=80&width=80&text=⚡",
        path: "/category/electronics/phones",
        icon: "⚡",
      },
    ],
  },
  {
    title: "Computer & Office",
    items: [
      {
        name: "Laptops",
        image: "/placeholder.svg?height=80&width=80&text=💻",
        path: "/category/electronics/computers",
        icon: "💻",
      },
      {
        name: "Tablets",
        image: "/placeholder.svg?height=80&width=80&text=📱",
        path: "/category/electronics/computers",
        icon: "📱",
      },
      {
        name: "Keyboards",
        image: "/placeholder.svg?height=80&width=80&text=⌨️",
        path: "/category/electronics/computers",
        icon: "⌨️",
      },
      {
        name: "Mice",
        image: "/placeholder.svg?height=80&width=80&text=🖱️",
        path: "/category/electronics/computers",
        icon: "🖱️",
      },
      {
        name: "Monitors",
        image: "/placeholder.svg?height=80&width=80&text=🖥️",
        path: "/category/electronics/computers",
        icon: "🖥️",
      },
      {
        name: "Printers",
        image: "/placeholder.svg?height=80&width=80&text=🖨️",
        path: "/category/electronics/computers",
        icon: "🖨️",
      },
    ],
  },
  {
    title: "Audio & Video",
    items: [
      {
        name: "Headphones",
        image: "/placeholder.svg?height=80&width=80&text=🎧",
        path: "/category/electronics/audio",
        icon: "🎧",
      },
      {
        name: "Speakers",
        image: "/placeholder.svg?height=80&width=80&text=🔊",
        path: "/category/electronics/audio",
        icon: "🔊",
      },
      {
        name: "Microphones",
        image: "/placeholder.svg?height=80&width=80&text=🎤",
        path: "/category/electronics/audio",
        icon: "🎤",
      },
      {
        name: "Projectors",
        image: "/placeholder.svg?height=80&width=80&text=📽️",
        path: "/category/electronics/audio",
        icon: "📽️",
      },
    ],
  },
  {
    title: "Smart Devices",
    items: [
      {
        name: "Smart Watches",
        image: "/placeholder.svg?height=80&width=80&text=⌚",
        path: "/category/electronics/smart",
        icon: "⌚",
      },
      {
        name: "Smart Home",
        image: "/placeholder.svg?height=80&width=80&text=🏠",
        path: "/category/electronics/smart",
        icon: "🏠",
      },
      {
        name: "Fitness Trackers",
        image: "/placeholder.svg?height=80&width=80&text=💪",
        path: "/category/electronics/smart",
        icon: "💪",
      },
      {
        name: "VR Headsets",
        image: "/placeholder.svg?height=80&width=80&text=🥽",
        path: "/category/electronics/smart",
        icon: "🥽",
      },
    ],
  },
]

// Main categories for the sidebar
const mainCategories = [
  { name: "Home & Garden", path: "/category/home-garden", icon: "🏠" },
  { name: "Hair Extensions & Wigs", path: "/category/fashion", icon: "💇‍♀️" },
  { name: "Men's Clothing", path: "/category/fashion", icon: "👔" },
  { name: "Accessories", path: "/category/fashion", icon: "👜" },
  { name: "Consumer Electronics", path: "/category/electronics", active: true, icon: "📱" },
  { name: "Home Improvement", path: "/category/home-improvement", icon: "🔧" },
  { name: "Home Appliances", path: "/category/home-appliances", icon: "🏠" },
  { name: "Automotive", path: "/category/automotive", icon: "🚗" },
  { name: "Luggages & Bags", path: "/category/luggage", icon: "🎒" },
  { name: "Shoes", path: "/category/shoes", icon: "👟" },
  { name: "Special Occasion", path: "/category/special-occasion", icon: "🎉" },
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
    <div className="min-h-screen bg-gray-50">
      {/* Jumia-style Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center px-4 py-3">
          <button onClick={() => router.back()} className="mr-3">
            <ArrowLeft className="h-6 w-6 text-gray-700" />
          </button>

          <form onSubmit={handleSearch} className="flex-1 relative">
            <input
              type="text"
              placeholder="Search in Electronics"
              className="w-full py-2.5 px-4 pr-12 bg-gray-100 rounded-lg text-sm border-0 focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-500" />
            </button>
          </form>

          <div className="ml-3 relative">
            <Bell className="h-6 w-6 text-gray-700" />
            <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
              3
            </span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Jumia-style Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center text-gray-800">
              <Grid3X3 className="h-5 w-5 mr-2 text-orange-500" />
              <span className="font-semibold">All Categories</span>
            </div>
          </div>

          <div className="py-2">
            {mainCategories.map((category, index) => (
              <Link
                href={category.path}
                key={index}
                className={`flex items-center px-4 py-3 text-sm transition-colors border-b border-gray-50 ${
                  category.active
                    ? "bg-orange-50 text-orange-600 border-r-2 border-r-orange-500"
                    : "text-gray-700 hover:bg-orange-50 hover:text-orange-600"
                }`}
              >
                <span className="text-lg mr-3">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <Link href="/" className="hover:text-orange-600">
                Home
              </Link>
              <span className="mx-2">/</span>
              <span className="text-orange-600 font-medium">Electronics</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Consumer Electronics</h1>
          </div>

          {/* Categories Sections */}
          {subcategories.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-10">
              <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-200">{section.title}</h2>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {section.items.map((item, itemIndex) => (
                  <Link
                    href={item.path}
                    key={itemIndex}
                    className="group bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                  >
                    <div className="p-4 text-center">
                      {/* Category Icon */}
                      <div className="w-12 h-12 mx-auto mb-3 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                        <span className="text-xl">{item.icon}</span>
                      </div>

                      {/* Category Name */}
                      <h3 className="font-medium text-gray-800 text-sm leading-tight group-hover:text-orange-600 transition-colors">
                        {item.name}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Featured Products Banner */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-8 text-white">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-2">Tech Deals</h2>
                <p className="text-blue-100 mb-4">
                  Discover the latest electronics and gadgets. Get up to 50% off on selected items!
                </p>
                <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                  Shop Electronics
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
