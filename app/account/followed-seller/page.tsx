"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Store, UserMinus } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"

export default function FollowedSellerPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  // Sample followed sellers
  const [sellers, setSellers] = useState([
    {
      id: 1,
      name: "ElectroTech Store",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
      rating: 4.8,
      reviews: 1250,
      products: 156,
      followers: 3420,
    },
    {
      id: 2,
      name: "Fashion Hub",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
      rating: 4.5,
      reviews: 876,
      products: 324,
      followers: 2150,
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

  const unfollowSeller = (id: number) => {
    setSellers(sellers.filter((seller) => seller.id !== id))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Followed Sellers</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-16">
        {sellers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Store className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No followed sellers</h2>
            <p className="text-gray-500 mb-6">Sellers you follow will appear here</p>
            <Link href="/">
              <Button className="bg-[#DEA818] hover:bg-[#c99616]">Explore Stores</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {sellers.map((seller) => (
              <div key={seller.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-3">
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 bg-gray-100 rounded-full overflow-hidden mr-3">
                      <Image src={seller.image || "/placeholder.svg"} alt={seller.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link href={`/seller/${seller.id}`}>
                          <h3 className="font-medium">{seller.name}</h3>
                        </Link>
                      </div>

                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs ml-1">{seller.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 mx-2">•</span>
                        <span className="text-xs text-gray-500">{seller.reviews} reviews</span>
                      </div>

                      <div className="flex text-xs text-gray-500 mt-1">
                        <span>{seller.products} products</span>
                        <span className="mx-2">•</span>
                        <span>{seller.followers} followers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 mr-2 h-8 text-xs"
                      onClick={() => router.push(`/seller/${seller.id}`)}
                    >
                      Visit Store
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 h-8 text-xs text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                      onClick={() => unfollowSeller(seller.id)}
                    >
                      <UserMinus className="h-3 w-3 mr-1" />
                      Unfollow
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Suggested Sellers */}
        <div className="mt-6 mb-16">
          <h2 className="text-lg font-semibold mb-3">Suggested Sellers For You</h2>
          <div className="grid grid-cols-1 gap-3">
            {[
              {
                id: 3,
                name: "TechGadgets",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
                rating: 4.7,
                reviews: 950,
                products: 210,
                followers: 2800,
                category: "Electronics",
              },
              {
                id: 4,
                name: "HomeDecor Plus",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
                rating: 4.6,
                reviews: 720,
                products: 185,
                followers: 1950,
                category: "Home & Living",
              },
              {
                id: 5,
                name: "SportsFanatic",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
                rating: 4.9,
                reviews: 1100,
                products: 150,
                followers: 3100,
                category: "Sports & Outdoors",
              },
            ].map((seller) => (
              <div key={seller.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-3">
                  <div className="flex items-center">
                    <div className="relative h-16 w-16 bg-gray-100 rounded-full overflow-hidden mr-3">
                      <Image src={seller.image || "/placeholder.svg"} alt={seller.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <Link href={`/seller/${seller.id}`}>
                          <h3 className="font-medium">{seller.name}</h3>
                        </Link>
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                          {seller.category}
                        </span>
                      </div>

                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <Star className="h-3 w-3 text-yellow-400 fill-current" />
                          <span className="text-xs ml-1">{seller.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 mx-2">•</span>
                        <span className="text-xs text-gray-500">{seller.reviews} reviews</span>
                      </div>

                      <div className="flex text-xs text-gray-500 mt-1">
                        <span>{seller.products} products</span>
                        <span className="mx-2">•</span>
                        <span>{seller.followers} followers</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex mt-3">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 mr-2 h-8 text-xs"
                      onClick={() => router.push(`/seller/${seller.id}`)}
                    >
                      Visit Store
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 h-8 text-xs bg-[#40E0D0] hover:bg-[#3bc9bb] text-white"
                      onClick={() => {
                        setSellers([...sellers, seller])
                        // Remove from suggested sellers in a real app
                      }}
                    >
                      Follow
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
