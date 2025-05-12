"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingCart, Star, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"

export default function WishlistPage() {
  const router = useRouter()
  const { addToCart } = useCart()
  const [activeTab, setActiveTab] = useState("account")

  // Sample wishlist items
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Washing Machine",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
      price: 499.99,
      rating: 4.5,
      reviews: 120,
      inStock: true,
    },
    {
      id: 2,
      name: "Smartphone",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
      price: 299.99,
      rating: 4.2,
      reviews: 85,
      inStock: true,
    },
    {
      id: 3,
      name: "Laptop",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg",
      price: 799.99,
      rating: 4.7,
      reviews: 210,
      inStock: false,
    },
  ])

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

  const removeFromWishlist = (id: number) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id))
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
    // Optionally remove from wishlist
    // removeFromWishlist(product.id)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">My Wishlist</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-16">
        {wishlistItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Heart className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-6">Items added to your wishlist will appear here</p>
            <Link href="/">
              <Button className="bg-[#DEA818] hover:bg-[#c99616]">Continue Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {wishlistItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="flex p-3">
                  <div className="relative h-20 w-20 bg-gray-100 rounded-md overflow-hidden mr-3">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-1" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <Link href={`/product/${item.id}`}>
                        <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                      </Link>
                      <button onClick={() => removeFromWishlist(item.id)} className="text-gray-400 hover:text-red-500">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 text-yellow-400"
                            fill={i < Math.floor(item.rating) ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({item.reviews})</span>
                    </div>

                    <p className="text-[#DEA818] font-bold text-sm mt-1">${item.price.toFixed(2)}</p>

                    <div className="mt-2">
                      {item.inStock ? (
                        <Button
                          size="sm"
                          className="w-full bg-[#DEA818] hover:bg-[#c99616] h-8 text-xs"
                          onClick={() => handleAddToCart(item)}
                        >
                          <ShoppingCart className="h-3 w-3 mr-1" />
                          Add to Cart
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="w-full bg-gray-300 text-gray-700 cursor-not-allowed h-8 text-xs"
                          disabled
                        >
                          Out of Stock
                        </Button>
                      )}
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
