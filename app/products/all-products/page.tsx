"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Mic, Camera, ArrowLeft, Filter } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function AllProductsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("categories")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("popularity")

  // Sample products
  const allProducts = [
    {
      id: 1,
      name: "Washing Machine",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
      price: "$499.99",
      rating: 4.5,
      reviews: 120,
    },
    {
      id: 2,
      name: "Smartphone",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
      price: "$299.99",
      rating: 4.2,
      reviews: 85,
    },
    {
      id: 3,
      name: "Laptop",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg",
      price: "$799.99",
      rating: 4.7,
      reviews: 210,
    },
    {
      id: 4,
      name: "Refrigerator",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
      price: "$899.99",
      rating: 4.3,
      reviews: 95,
    },
    {
      id: 5,
      name: "Microwave Oven",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
      price: "$149.99",
      rating: 4.0,
      reviews: 65,
    },
    {
      id: 6,
      name: "Blender",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
      price: "$79.99",
      rating: 4.1,
      reviews: 42,
    },
  ]

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "account") {
      router.push("/account")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const toggleFilters = () => {
    setShowFilters(!showFilters)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/category/all" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">All Products</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mt-3 relative flex items-center">
            <Input placeholder="Search for products..." className="pl-10 pr-16 py-2 rounded-full text-sm" />
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <div className="absolute right-3 flex space-x-3">
              <button>
                <Mic className="h-4 w-4 text-gray-400" />
              </button>
              <button>
                <Camera className="h-4 w-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Filters and Sort */}
      <div className="bg-white p-3 flex justify-between items-center">
        <button className="flex items-center text-sm" onClick={toggleFilters}>
          <Filter className="h-4 w-4 mr-1" />
          Filters
        </button>

        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-8 text-xs border-none shadow-none">
              <SelectValue placeholder="Popularity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="bg-white border-t border-gray-200 p-4">
          <h3 className="font-medium mb-3">Price Range</h3>
          <div className="flex space-x-2 mb-4">
            <Input placeholder="Min" className="text-sm" />
            <Input placeholder="Max" className="text-sm" />
          </div>

          <h3 className="font-medium mb-3">Brand</h3>
          <div className="space-y-2 mb-4">
            {["Samsung", "LG", "Sony", "Apple", "Philips"].map((brand) => (
              <div key={brand} className="flex items-center">
                <input type="checkbox" id={brand} className="mr-2" />
                <label htmlFor={brand} className="text-sm">
                  {brand}
                </label>
              </div>
            ))}
          </div>

          <h3 className="font-medium mb-3">Rating</h3>
          <div className="space-y-2 mb-4">
            {[4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center">
                <input type="checkbox" id={`rating-${rating}`} className="mr-2" />
                <label htmlFor={`rating-${rating}`} className="text-sm flex items-center">
                  {rating}+<span className="text-yellow-400 ml-1">★</span>
                </label>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              Reset
            </Button>
            <Button className="flex-1 bg-[#DEA818] hover:bg-[#c99616]">Apply</Button>
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="flex-1 p-4 pb-20">
        <div className="grid grid-cols-2 gap-3">
          {allProducts.map((product) => (
            <Link
              href={`/product/${product.id}`}
              key={product.id}
              className="bg-white rounded-lg overflow-hidden shadow-sm"
            >
              <div className="relative h-32 w-full">
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain p-2"
                />
              </div>
              <div className="p-2">
                <h3 className="font-medium text-sm line-clamp-2">{product.name}</h3>
                <p className="text-[#DEA818] font-bold text-sm">{product.price}</p>
                <div className="flex items-center mt-1">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-xs text-yellow-400">
                        {i < Math.floor(product.rating) ? "★" : i < product.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
