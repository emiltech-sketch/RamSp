"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

// Main categories for the sidebar and main display
const mainCategories = [
  {
    name: "Home & Garden",
    path: "/category/home-garden",
    image: "/placeholder.svg?height=100&width=100&text=Home+Garden",
  },
  {
    name: "Hair Extensions & Wigs",
    path: "/category/fashion",
    image: "/placeholder.svg?height=100&width=100&text=Hair",
  },
  {
    name: "Men's Clothing",
    path: "/category/fashion",
    image: "/placeholder.svg?height=100&width=100&text=Men",
  },
  {
    name: "Accessories",
    path: "/category/fashion",
    image: "/placeholder.svg?height=100&width=100&text=Accessories",
  },
  {
    name: "Consumer Electronics",
    path: "/category/electronics",
    image: "/placeholder.svg?height=100&width=100&text=Electronics",
  },
  {
    name: "Home Improvement & Lighting",
    path: "/category/home-garden",
    image: "/placeholder.svg?height=100&width=100&text=Improvement",
  },
  {
    name: "Home Appliances",
    path: "/category/home-garden",
    image: "/placeholder.svg?height=100&width=100&text=Appliances",
  },
  {
    name: "Automotive & Motorcycle",
    path: "/category/automotive",
    image: "/placeholder.svg?height=100&width=100&text=Automotive",
  },
  {
    name: "Luggages & Bags",
    path: "/category/fashion",
    image: "/placeholder.svg?height=100&width=100&text=Luggage",
  },
  {
    name: "Shoes",
    path: "/category/fashion",
    image: "/placeholder.svg?height=100&width=100&text=Shoes",
  },
  {
    name: "Special Occasion",
    path: "/category/fashion",
    image: "/placeholder.svg?height=100&width=100&text=Special",
  },
]

// Featured categories
const featuredCategories = [
  {
    title: "Popular Categories",
    items: mainCategories.slice(0, 6),
  },
  {
    title: "Trending Now",
    items: [
      {
        name: "Smart Watches",
        path: "/category/electronics",
        image: "/placeholder.svg?height=100&width=100&text=Watches",
      },
      {
        name: "Wireless Earbuds",
        path: "/category/electronics",
        image: "/placeholder.svg?height=100&width=100&text=Earbuds",
      },
      {
        name: "Summer Dresses",
        path: "/category/fashion",
        image: "/placeholder.svg?height=100&width=100&text=Dresses",
      },
      {
        name: "Kitchen Gadgets",
        path: "/category/home-garden",
        image: "/placeholder.svg?height=100&width=100&text=Kitchen",
      },
    ],
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
              placeholder="Search in All Categories"
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
            <Link href={category.path} key={index} className="block px-4 py-3 text-sm hover:bg-white">
              {category.name}
            </Link>
          ))}
        </div>

        {/* Main content with featured categories */}
        <div className="flex-1 overflow-y-auto">
          {/* Banner */}
          <div className="px-4 py-3">
            <div className="bg-gradient-to-r from-[#40E0D0] to-[#20B2AA] rounded-lg p-4 text-white">
              <h2 className="text-lg font-bold mb-1">Explore All Categories</h2>
              <p className="text-sm opacity-90">Find everything you need in our extensive catalog</p>
            </div>
          </div>

          {/* Featured categories */}
          {featuredCategories.map((group, groupIndex) => (
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

          {/* All categories */}
          <div className="mb-6">
            <h2 className="text-xl font-bold px-4 py-2">All Categories</h2>

            <div className="grid grid-cols-3 gap-4 px-4">
              {mainCategories.map((item, itemIndex) => (
                <Link href={item.path} key={itemIndex} className="flex flex-col items-center">
                  <div className="relative w-20 h-20 mb-2">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain" />
                  </div>
                  <span className="text-center text-xs">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
