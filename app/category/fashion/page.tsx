"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Bell, Grid3X3 } from "lucide-react"
import { useRouter } from "next/navigation"

// Subcategories for Fashion
const subcategories = [
  {
    title: "Women's Fashion",
    items: [
      {
        name: "Dresses",
        image: "/placeholder.svg?height=80&width=80&text=👗",
        path: "/category/fashion/womens",
        icon: "👗",
      },
      {
        name: "Tops & Blouses",
        image: "/placeholder.svg?height=80&width=80&text=👚",
        path: "/category/fashion/womens",
        icon: "👚",
      },
      {
        name: "Pants & Jeans",
        image: "/placeholder.svg?height=80&width=80&text=👖",
        path: "/category/fashion/womens",
        icon: "👖",
      },
      {
        name: "Skirts",
        image: "/placeholder.svg?height=80&width=80&text=👗",
        path: "/category/fashion/womens",
        icon: "👗",
      },
      {
        name: "Lingerie",
        image: "/placeholder.svg?height=80&width=80&text=👙",
        path: "/category/fashion/womens",
        icon: "👙",
      },
      {
        name: "Outerwear",
        image: "/placeholder.svg?height=80&width=80&text=🧥",
        path: "/category/fashion/womens",
        icon: "🧥",
      },
    ],
  },
  {
    title: "Men's Fashion",
    items: [
      {
        name: "Shirts",
        image: "/placeholder.svg?height=80&width=80&text=👔",
        path: "/category/fashion/mens",
        icon: "👔",
      },
      {
        name: "T-shirts",
        image: "/placeholder.svg?height=80&width=80&text=👕",
        path: "/category/fashion/mens",
        icon: "👕",
      },
      {
        name: "Pants",
        image: "/placeholder.svg?height=80&width=80&text=👖",
        path: "/category/fashion/mens",
        icon: "👖",
      },
      {
        name: "Shorts",
        image: "/placeholder.svg?height=80&width=80&text=🩳",
        path: "/category/fashion/mens",
        icon: "🩳",
      },
      {
        name: "Suits",
        image: "/placeholder.svg?height=80&width=80&text=🤵",
        path: "/category/fashion/mens",
        icon: "🤵",
      },
      {
        name: "Activewear",
        image: "/placeholder.svg?height=80&width=80&text=🏃",
        path: "/category/fashion/mens",
        icon: "🏃",
      },
    ],
  },
  {
    title: "Shoes & Footwear",
    items: [
      {
        name: "Women's Shoes",
        image: "/placeholder.svg?height=80&width=80&text=👠",
        path: "/category/fashion/shoes",
        icon: "👠",
      },
      {
        name: "Men's Shoes",
        image: "/placeholder.svg?height=80&width=80&text=👞",
        path: "/category/fashion/shoes",
        icon: "👞",
      },
      {
        name: "Sneakers",
        image: "/placeholder.svg?height=80&width=80&text=👟",
        path: "/category/fashion/shoes",
        icon: "👟",
      },
      {
        name: "Boots",
        image: "/placeholder.svg?height=80&width=80&text=🥾",
        path: "/category/fashion/shoes",
        icon: "🥾",
      },
    ],
  },
  {
    title: "Accessories",
    items: [
      {
        name: "Jewelry",
        image: "/placeholder.svg?height=80&width=80&text=💍",
        path: "/category/fashion/accessories",
        icon: "💍",
      },
      {
        name: "Watches",
        image: "/placeholder.svg?height=80&width=80&text=⌚",
        path: "/category/fashion/accessories",
        icon: "⌚",
      },
      {
        name: "Handbags",
        image: "/placeholder.svg?height=80&width=80&text=👜",
        path: "/category/fashion/accessories",
        icon: "👜",
      },
      {
        name: "Sunglasses",
        image: "/placeholder.svg?height=80&width=80&text=🕶️",
        path: "/category/fashion/accessories",
        icon: "🕶️",
      },
      {
        name: "Hats",
        image: "/placeholder.svg?height=80&width=80&text=👒",
        path: "/category/fashion/accessories",
        icon: "👒",
      },
      {
        name: "Belts",
        image: "/placeholder.svg?height=80&width=80&text=👔",
        path: "/category/fashion/accessories",
        icon: "👔",
      },
    ],
  },
]

// Main categories for the sidebar
const mainCategories = [
  { name: "Home & Garden", path: "/category/home-garden", icon: "🏠" },
  { name: "Hair Extensions & Wigs", path: "/category/fashion", active: true, icon: "💇‍♀️" },
  { name: "Men's Clothing", path: "/category/fashion", active: true, icon: "👔" },
  { name: "Accessories", path: "/category/fashion", active: true, icon: "👜" },
  { name: "Consumer Electronics", path: "/category/electronics", icon: "📱" },
  { name: "Home Improvement", path: "/category/home-improvement", icon: "🔧" },
  { name: "Home Appliances", path: "/category/home-appliances", icon: "🏠" },
  { name: "Automotive", path: "/category/automotive", icon: "🚗" },
  { name: "Luggages & Bags", path: "/category/luggage", icon: "🎒" },
  { name: "Shoes", path: "/category/shoes", active: true, icon: "👟" },
  { name: "Special Occasion", path: "/category/special-occasion", icon: "🎉" },
]

export default function FashionPage() {
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
              placeholder="Search in Fashion"
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
              <span className="text-orange-600 font-medium">Fashion</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Fashion & Style</h1>
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
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl p-8 text-white">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-2">Fashion Week</h2>
                <p className="text-pink-100 mb-4">
                  Discover the latest fashion trends and styles. Get up to 70% off on selected fashion items!
                </p>
                <button className="bg-white text-pink-600 px-6 py-2 rounded-lg font-semibold hover:bg-pink-50 transition-colors">
                  Shop Fashion
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
