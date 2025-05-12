"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Search, Bell } from "lucide-react"
import { useRouter } from "next/navigation"

// Subcategories for Fashion
const subcategories = [
  {
    title: "Women's Fashion",
    items: [
      {
        name: "Dresses",
        image: "/placeholder.svg?height=100&width=100&text=Dresses",
        path: "/category/fashion/womens",
      },
      {
        name: "Tops",
        image: "/placeholder.svg?height=100&width=100&text=Tops",
        path: "/category/fashion/womens",
      },
      {
        name: "Bottoms",
        image: "/placeholder.svg?height=100&width=100&text=Bottoms",
        path: "/category/fashion/womens",
      },
      {
        name: "Lingerie",
        image: "/placeholder.svg?height=100&width=100&text=Lingerie",
        path: "/category/fashion/womens",
      },
      {
        name: "Swimwear",
        image: "/placeholder.svg?height=100&width=100&text=Swimwear",
        path: "/category/fashion/womens",
      },
      {
        name: "Outerwear",
        image: "/placeholder.svg?height=100&width=100&text=Outerwear",
        path: "/category/fashion/womens",
      },
    ],
  },
  {
    title: "Men's Fashion",
    items: [
      {
        name: "Shirts",
        image: "/placeholder.svg?height=100&width=100&text=Shirts",
        path: "/category/fashion/mens",
      },
      {
        name: "T-shirts",
        image: "/placeholder.svg?height=100&width=100&text=T-shirts",
        path: "/category/fashion/mens",
      },
      {
        name: "Pants",
        image: "/placeholder.svg?height=100&width=100&text=Pants",
        path: "/category/fashion/mens",
      },
      {
        name: "Shorts",
        image: "/placeholder.svg?height=100&width=100&text=Shorts",
        path: "/category/fashion/mens",
      },
      {
        name: "Suits",
        image: "/placeholder.svg?height=100&width=100&text=Suits",
        path: "/category/fashion/mens",
      },
      {
        name: "Activewear",
        image: "/placeholder.svg?height=100&width=100&text=Activewear",
        path: "/category/fashion/mens",
      },
    ],
  },
  {
    title: "Shoes",
    items: [
      {
        name: "Women's Shoes",
        image: "/placeholder.svg?height=100&width=100&text=Women+Shoes",
        path: "/category/fashion/shoes",
      },
      {
        name: "Men's Shoes",
        image: "/placeholder.svg?height=100&width=100&text=Men+Shoes",
        path: "/category/fashion/shoes",
      },
      {
        name: "Sneakers",
        image: "/placeholder.svg?height=100&width=100&text=Sneakers",
        path: "/category/fashion/shoes",
      },
      {
        name: "Boots",
        image: "/placeholder.svg?height=100&width=100&text=Boots",
        path: "/category/fashion/shoes",
      },
    ],
  },
  {
    title: "Accessories",
    items: [
      {
        name: "Jewelry",
        image: "/placeholder.svg?height=100&width=100&text=Jewelry",
        path: "/category/fashion/accessories",
      },
      {
        name: "Watches",
        image: "/placeholder.svg?height=100&width=100&text=Watches",
        path: "/category/fashion/accessories",
      },
      {
        name: "Bags",
        image: "/placeholder.svg?height=100&width=100&text=Bags",
        path: "/category/fashion/accessories",
      },
      {
        name: "Sunglasses",
        image: "/placeholder.svg?height=100&width=100&text=Sunglasses",
        path: "/category/fashion/accessories",
      },
      {
        name: "Hats",
        image: "/placeholder.svg?height=100&width=100&text=Hats",
        path: "/category/fashion/accessories",
      },
      {
        name: "Belts",
        image: "/placeholder.svg?height=100&width=100&text=Belts",
        path: "/category/fashion/accessories",
      },
    ],
  },
  {
    title: "Hair Extensions & Wigs",
    items: [
      {
        name: "Human Hair Wigs",
        image: "/placeholder.svg?height=100&width=100&text=Human+Wigs",
        path: "/category/fashion/hair",
      },
      {
        name: "Synthetic Wigs",
        image: "/placeholder.svg?height=100&width=100&text=Synthetic",
        path: "/category/fashion/hair",
      },
      {
        name: "Hair Extensions",
        image: "/placeholder.svg?height=100&width=100&text=Extensions",
        path: "/category/fashion/hair",
      },
      {
        name: "Hair Accessories",
        image: "/placeholder.svg?height=100&width=100&text=Accessories",
        path: "/category/fashion/hair",
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
  { name: "Consumer Electronics", path: "/category/electronics" },
  { name: "Home Improvement & Lighting", path: "/category/home-improvement" },
  { name: "Home Appliances", path: "/category/home-appliances" },
  { name: "Automotive & Motorcycle", path: "/category/automotive" },
  { name: "Luggages & Bags", path: "/category/luggage" },
  { name: "Shoes", path: "/category/shoes" },
  { name: "Special Occasion", path: "/category/special-occasion" },
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
              placeholder="Search in Fashion"
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
              className={`block px-4 py-3 text-sm hover:bg-white ${
                category.name === "Men's Clothing" ||
                category.name === "Hair Extensions & Wigs" ||
                category.name === "Accessories" ||
                category.name === "Shoes"
                  ? "text-red-500 font-medium"
                  : ""
              }`}
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
