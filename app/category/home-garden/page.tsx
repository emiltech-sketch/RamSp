"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Bell, Grid3X3 } from "lucide-react"
import { useRouter } from "next/navigation"

// Subcategories for Home & Garden
const subcategories = [
  {
    title: "Kitchen & Dining",
    items: [
      {
        name: "Cookware",
        image: "/placeholder.svg?height=80&width=80&text=🍳",
        path: "/category/home-garden/kitchen",
        icon: "🍳",
      },
      {
        name: "Kitchen Tools",
        image: "/placeholder.svg?height=80&width=80&text=🔪",
        path: "/category/home-garden/kitchen",
        icon: "🔪",
      },
      {
        name: "Dinnerware",
        image: "/placeholder.svg?height=80&width=80&text=🍽️",
        path: "/category/home-garden/kitchen",
        icon: "🍽️",
      },
      {
        name: "Storage",
        image: "/placeholder.svg?height=80&width=80&text=📦",
        path: "/category/home-garden/kitchen",
        icon: "📦",
      },
      {
        name: "Small Appliances",
        image: "/placeholder.svg?height=80&width=80&text=⚡",
        path: "/category/home-garden/kitchen",
        icon: "⚡",
      },
      {
        name: "Drinkware",
        image: "/placeholder.svg?height=80&width=80&text=🥤",
        path: "/category/home-garden/kitchen",
        icon: "🥤",
      },
    ],
  },
  {
    title: "Home Decor",
    items: [
      {
        name: "Wall Art",
        image: "/placeholder.svg?height=80&width=80&text=🖼️",
        path: "/category/home-garden/decor",
        icon: "🖼️",
      },
      {
        name: "Lighting",
        image: "/placeholder.svg?height=80&width=80&text=💡",
        path: "/category/home-garden/decor",
        icon: "💡",
      },
      {
        name: "Cushions",
        image: "/placeholder.svg?height=80&width=80&text=🛋️",
        path: "/category/home-garden/decor",
        icon: "🛋️",
      },
      {
        name: "Candles",
        image: "/placeholder.svg?height=80&width=80&text=🕯️",
        path: "/category/home-garden/decor",
        icon: "🕯️",
      },
    ],
  },
  {
    title: "Garden & Outdoor",
    items: [
      {
        name: "Garden Tools",
        image: "/placeholder.svg?height=80&width=80&text=🌱",
        path: "/category/home-garden/garden",
        icon: "🌱",
      },
      {
        name: "Outdoor Furniture",
        image: "/placeholder.svg?height=80&width=80&text=🪑",
        path: "/category/home-garden/garden",
        icon: "🪑",
      },
      {
        name: "Plants & Seeds",
        image: "/placeholder.svg?height=80&width=80&text=🌿",
        path: "/category/home-garden/garden",
        icon: "🌿",
      },
      {
        name: "Watering",
        image: "/placeholder.svg?height=80&width=80&text=💧",
        path: "/category/home-garden/garden",
        icon: "💧",
      },
    ],
  },
]

// Main categories for the sidebar
const mainCategories = [
  { name: "Home & Garden", path: "/category/home-garden", active: true, icon: "🏠" },
  { name: "Hair Extensions & Wigs", path: "/category/fashion", icon: "💇‍♀️" },
  { name: "Men's Clothing", path: "/category/fashion", icon: "👔" },
  { name: "Accessories", path: "/category/fashion", icon: "👜" },
  { name: "Consumer Electronics", path: "/category/electronics", icon: "📱" },
  { name: "Home Improvement", path: "/category/home-improvement", icon: "🔧" },
  { name: "Home Appliances", path: "/category/home-appliances", icon: "🏠" },
  { name: "Automotive", path: "/category/automotive", icon: "🚗" },
  { name: "Luggages & Bags", path: "/category/luggage", icon: "🎒" },
  { name: "Shoes", path: "/category/shoes", icon: "👟" },
  { name: "Special Occasion", path: "/category/special-occasion", icon: "🎉" },
]

export default function HomeGardenPage() {
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
              placeholder="Search in Home & Garden"
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
              <span className="text-orange-600 font-medium">Home & Garden</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Home & Garden</h1>
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
            <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-xl p-8 text-white">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-2">Home & Garden Deals</h2>
                <p className="text-green-100 mb-4">
                  Transform your space with our amazing home and garden products. Special discounts available!
                </p>
                <button className="bg-white text-green-600 px-6 py-2 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                  Shop Deals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
