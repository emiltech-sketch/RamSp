"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Bell, Grid3X3 } from "lucide-react"
import { useRouter } from "next/navigation"

// Main categories for the sidebar and main display
const mainCategories = [
  {
    name: "Home & Garden",
    path: "/category/home-garden",
    image: "/placeholder.svg?height=80&width=80&text=🏠",
    icon: "🏠",
  },
  {
    name: "Hair Extensions & Wigs",
    path: "/category/fashion",
    image: "/placeholder.svg?height=80&width=80&text=💇",
    icon: "💇‍♀️",
  },
  {
    name: "Men's Clothing",
    path: "/category/fashion",
    image: "/placeholder.svg?height=80&width=80&text=👔",
    icon: "👔",
  },
  {
    name: "Accessories",
    path: "/category/fashion",
    image: "/placeholder.svg?height=80&width=80&text=👜",
    icon: "👜",
  },
  {
    name: "Consumer Electronics",
    path: "/category/electronics",
    image: "/placeholder.svg?height=80&width=80&text=📱",
    icon: "📱",
  },
  {
    name: "Home Improvement",
    path: "/category/home-garden",
    image: "/placeholder.svg?height=80&width=80&text=🔧",
    icon: "🔧",
  },
  {
    name: "Home Appliances",
    path: "/category/home-garden",
    image: "/placeholder.svg?height=80&width=80&text=🏠",
    icon: "🏠",
  },
  {
    name: "Automotive",
    path: "/category/automotive",
    image: "/placeholder.svg?height=80&width=80&text=🚗",
    icon: "🚗",
  },
  {
    name: "Luggages & Bags",
    path: "/category/fashion",
    image: "/placeholder.svg?height=80&width=80&text=🎒",
    icon: "🎒",
  },
  {
    name: "Shoes",
    path: "/category/fashion",
    image: "/placeholder.svg?height=80&width=80&text=👟",
    icon: "👟",
  },
  {
    name: "Special Occasion",
    path: "/category/fashion",
    image: "/placeholder.svg?height=80&width=80&text=🎉",
    icon: "🎉",
  },
  {
    name: "Beauty & Health",
    path: "/category/beauty",
    image: "/placeholder.svg?height=80&width=80&text=💄",
    icon: "💄",
  },
]

export default function AllCategoriesPage() {
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
              placeholder="Search for products, brands and categories"
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
                className="flex items-center px-4 py-3 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-50"
              >
                <span className="text-lg mr-3">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-6">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Shop by Category</h1>
            <p className="text-gray-600">Discover amazing products in every category</p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {mainCategories.map((category, index) => (
              <Link
                href={category.path}
                key={index}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6 text-center">
                  {/* Category Icon/Image */}
                  <div className="w-16 h-16 mx-auto mb-4 bg-orange-50 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                    <span className="text-2xl">{category.icon}</span>
                  </div>

                  {/* Category Name */}
                  <h3 className="font-semibold text-gray-800 text-sm leading-tight group-hover:text-orange-600 transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>

          {/* Featured Categories Section */}
          <div className="mt-12">
            <h2 className="text-xl font-bold text-gray-800 mb-6">Popular Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mainCategories.slice(0, 6).map((category, index) => (
                <Link
                  href={category.path}
                  key={index}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100"
                >
                  <div className="flex items-center p-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center group-hover:bg-orange-100 transition-colors mr-4">
                      <span className="text-xl">{category.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 text-sm group-hover:text-orange-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">Explore products</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Promotional Banner */}
          <div className="mt-12">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-8 text-white">
              <div className="max-w-md">
                <h2 className="text-2xl font-bold mb-2">Special Offers</h2>
                <p className="text-orange-100 mb-4">
                  Discover amazing deals across all categories. Limited time offers!
                </p>
                <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-orange-50 transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
