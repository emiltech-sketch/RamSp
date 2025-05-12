"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ShoppingCart, Clock, Trash2, Star, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"

export default function RecentlyViewedPage() {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("account")
  const [isLoading, setIsLoading] = useState(true)

  // Sample recently viewed items
  const [recentItems, setRecentItems] = useState([
    {
      id: 1,
      name: "Samsung 55-inch 4K Smart TV",
      image: "/placeholder.svg?height=200&width=200&text=Smart+TV",
      price: 499.99,
      originalPrice: 649.99,
      discount: 23,
      viewedAt: "Today, 10:30 AM",
      rating: 4.7,
      reviews: 243,
      brand: "Samsung",
      seller: "Official Store",
      express: true,
    },
    {
      id: 2,
      name: "iPhone 15 Pro Max - 256GB - Titanium",
      image: "/placeholder.svg?height=200&width=200&text=iPhone",
      price: 1299.99,
      originalPrice: 1299.99,
      discount: 0,
      viewedAt: "Today, 9:15 AM",
      rating: 4.9,
      reviews: 578,
      brand: "Apple",
      seller: "Official Store",
      express: true,
    },
    {
      id: 3,
      name: "Lenovo ThinkPad X1 Carbon - 16GB RAM - 512GB SSD",
      image: "/placeholder.svg?height=200&width=200&text=Laptop",
      price: 1299.99,
      originalPrice: 1499.99,
      discount: 13,
      viewedAt: "Yesterday, 3:45 PM",
      rating: 4.8,
      reviews: 156,
      brand: "Lenovo",
      seller: "TechStore",
      express: false,
    },
    {
      id: 4,
      name: "LG 24 cu. ft. Smart French Door Refrigerator",
      image: "/placeholder.svg?height=200&width=200&text=Refrigerator",
      price: 1299.99,
      originalPrice: 1699.99,
      discount: 24,
      viewedAt: "Yesterday, 2:20 PM",
      rating: 4.6,
      reviews: 89,
      brand: "LG",
      seller: "HomeAppliances",
      express: false,
    },
    {
      id: 5,
      name: "Samsung 1.1 cu. ft. Countertop Microwave",
      image: "/placeholder.svg?height=200&width=200&text=Microwave",
      price: 149.99,
      originalPrice: 199.99,
      discount: 25,
      viewedAt: "Mar 14, 2025",
      rating: 4.5,
      reviews: 134,
      brand: "Samsung",
      seller: "Official Store",
      express: true,
    },
  ])

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const removeFromRecent = (id: number) => {
    setRecentItems(recentItems.filter((item) => item.id !== id))
    toast({
      title: "Item removed",
      description: "Item removed from recently viewed",
    })
  }

  const clearAllRecent = () => {
    setRecentItems([])
    toast({
      title: "All items cleared",
      description: "All items removed from recently viewed",
    })
  }

  const handleAddToCart = (item) => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      price: item.price,
      description: "",
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Recently Viewed</span>
            </Link>

            {recentItems.length > 0 && (
              <button className="text-white text-sm" onClick={clearAllRecent}>
                Clear All
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 px-2 py-3 pb-16">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-3">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-3 animate-pulse">
                <div className="flex">
                  <div className="relative h-20 w-20 bg-gray-200 rounded mr-3"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                    <div className="h-6 bg-gray-200 rounded w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : recentItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Clock className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No recently viewed items</h2>
            <p className="text-gray-500 mb-6">Products you view will appear here</p>
            <Link href="/">
              <Button className="bg-[#40E0D0] hover:bg-[#3bc9b9]">Browse Products</Button>
            </Link>
          </div>
        ) : (
          // Jumia style recently viewed items
          <div className="space-y-2">
            {recentItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-sm">
                <div className="p-3">
                  <div className="flex">
                    <Link
                      href={`/product/${item.id}`}
                      className="relative h-24 w-24 bg-gray-50 rounded overflow-hidden mr-3 flex-shrink-0"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                      {item.discount > 0 && (
                        <div className="absolute top-0 left-0 bg-[#f68b1e] text-white text-xs px-1 py-0.5">
                          -{item.discount}%
                        </div>
                      )}
                    </Link>

                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="text-xs text-gray-500 mb-1">{item.brand}</div>
                          <Link href={`/product/${item.id}`}>
                            <h3 className="text-sm font-medium line-clamp-2">{item.name}</h3>
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromRecent(item.id)}
                          className="text-gray-400 hover:text-red-500 ml-1 flex-shrink-0"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="mt-1">
                        <p className="text-[#3bc9b9] font-bold text-sm">${item.price.toFixed(2)}</p>
                        {item.discount > 0 && (
                          <div className="flex items-center">
                            <p className="text-xs text-gray-500 line-through mr-1">${item.originalPrice.toFixed(2)}</p>
                            <p className="text-xs text-[#f68b1e]">-{item.discount}%</p>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(item.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                      </div>

                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">{item.viewedAt}</span>
                        </div>
                        {item.express && (
                          <span className="bg-blue-600 text-white text-xs px-1 rounded-sm">Express</span>
                        )}
                      </div>

                      <div className="mt-2 flex gap-2">
                        <Button
                          size="sm"
                          className="flex-1 bg-[#40E0D0] hover:bg-[#3bc9b9] h-8 text-xs"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                        <Link href={`/product/${item.id}`}>
                          <Button size="sm" variant="outline" className="h-8 text-xs border-[#40E0D0] text-[#40E0D0]">
                            View
                            <ChevronRight className="h-3 w-3 ml-1" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
