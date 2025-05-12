"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

// Subcategories for Home & Garden
const subcategories = [
  {
    title: "Kitchen",
    items: [
      {
        name: "Mug Thermos",
        image: "/placeholder.svg?height=100&width=100&text=Mug+Thermos",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Basket",
        image: "/placeholder.svg?height=100&width=100&text=Basket",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Waterproof Wall Sticker",
        image: "/placeholder.svg?height=100&width=100&text=Wall+Sticker",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Home Brewing",
        image: "/placeholder.svg?height=100&width=100&text=Brewing",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Table Decoration",
        image: "/placeholder.svg?height=100&width=100&text=Table+Decor",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Wok",
        image: "/placeholder.svg?height=100&width=100&text=Wok",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Mug Beer",
        image: "/placeholder.svg?height=100&width=100&text=Beer+Mug",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Hook",
        image: "/placeholder.svg?height=100&width=100&text=Hook",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Coffeeware Teaware",
        image: "/placeholder.svg?height=100&width=100&text=Coffee+Tea",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Measuring Tools",
        image: "/placeholder.svg?height=100&width=100&text=Measuring",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Drinkware",
        image: "/placeholder.svg?height=100&width=100&text=Drinkware",
        path: "/category/home-garden/kitchen",
      },
      {
        name: "Coffee Brewer",
        image: "/placeholder.svg?height=100&width=100&text=Coffee+Brewer",
        path: "/category/home-garden/kitchen",
      },
    ],
  },
  {
    title: "Home Office",
    items: [
      {
        name: "Fabric & Lace",
        image: "/placeholder.svg?height=100&width=100&text=Fabric",
        path: "/category/home-garden/home-office",
      },
      {
        name: "Needle Arts & Craft",
        image: "/placeholder.svg?height=100&width=100&text=Craft",
        path: "/category/home-garden/home-office",
      },
      {
        name: "Home Fragrance",
        image: "/placeholder.svg?height=100&width=100&text=Fragrance",
        path: "/category/home-garden/home-office",
      },
    ],
  },
  {
    title: "Garden & Outdoor",
    items: [
      {
        name: "Garden Tools",
        image: "/placeholder.svg?height=100&width=100&text=Garden+Tools",
        path: "/category/home-garden/garden",
      },
      {
        name: "Outdoor Furniture",
        image: "/placeholder.svg?height=100&width=100&text=Outdoor",
        path: "/category/home-garden/garden",
      },
      {
        name: "Plants & Seeds",
        image: "/placeholder.svg?height=100&width=100&text=Plants",
        path: "/category/home-garden/garden",
      },
      {
        name: "Patio Umbrellas",
        image: "/placeholder.svg?height=100&width=100&text=Umbrellas",
        path: "/category/home-garden/garden",
      },
    ],
  },
  {
    title: "Home Decor",
    items: [
      {
        name: "Wall Art",
        image: "/placeholder.svg?height=100&width=100&text=Wall+Art",
        path: "/category/home-garden/decor",
      },
      {
        name: "Cushions & Covers",
        image: "/placeholder.svg?height=100&width=100&text=Cushions",
        path: "/category/home-garden/decor",
      },
      {
        name: "Artificial Plants",
        image: "/placeholder.svg?height=100&width=100&text=Plants",
        path: "/category/home-garden/decor",
      },
      {
        name: "Candles & Holders",
        image: "/placeholder.svg?height=100&width=100&text=Candles",
        path: "/category/home-garden/decor",
      },
    ],
  },
]

// Main categories for the sidebar
const mainCategories = [
  { name: "Home & Garden", path: "/category/home-garden", active: true },
  { name: "Hair Extensions & Wigs", path: "/category/hair-extensions" },
  { name: "Men's Clothing", path: "/category/mens-clothing" },
  { name: "Accessories", path: "/category/accessories" },
  { name: "Consumer Electronics", path: "/category/electronics" },
  { name: "Home Improvement & Lighting", path: "/category/home-improvement" },
  { name: "Home Appliances", path: "/category/home-appliances" },
  { name: "Automotive & Motorcycle", path: "/category/automotive" },
  { name: "Luggages & Bags", path: "/category/luggage" },
  { name: "Shoes", path: "/category/shoes" },
  { name: "Special Occasion", path: "/category/special-occasion" },
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
              placeholder="Search in Home & Garden"
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
