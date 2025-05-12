"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Heart, Filter, Grid, List, UserMinus, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample seller data
const sellers = [
  {
    id: "1",
    name: "ElectroTech Store",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
    banner: "/placeholder.svg?height=200&width=600&text=ElectroTech+Store",
    rating: 4.8,
    reviews: 1250,
    products: 156,
    followers: 3420,
    description:
      "Your one-stop shop for all electronics and gadgets. We offer the latest technology at competitive prices with excellent customer service.",
    categories: ["Electronics", "Gadgets", "Accessories", "Smart Home"],
    joinedDate: "Jan 2020",
  },
  {
    id: "2",
    name: "Fashion Hub",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.15.08-pMG7hwWiIlLbFdv0hIKZH3a93QKU9N.png",
    banner: "/placeholder.svg?height=200&width=600&text=Fashion+Hub",
    rating: 4.5,
    reviews: 876,
    products: 324,
    followers: 2150,
    description:
      "Trendy fashion for all seasons. We curate the best styles from around the world to bring you the latest in fashion.",
    categories: ["Clothing", "Shoes", "Accessories", "Jewelry"],
    joinedDate: "Mar 2021",
  },
]

// Sample products data
const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    image: "/placeholder.svg?height=200&width=200&text=Earbuds",
    price: 49.99,
    discount: "20% OFF",
    rating: 4.5,
    reviews: 120,
  },
  {
    id: 2,
    name: "Smart Watch",
    image: "/placeholder.svg?height=200&width=200&text=Smart+Watch",
    price: 129.99,
    discount: "15% OFF",
    rating: 4.2,
    reviews: 85,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    image: "/placeholder.svg?height=200&width=200&text=Speaker",
    price: 79.99,
    discount: "10% OFF",
    rating: 4.7,
    reviews: 210,
  },
  {
    id: 4,
    name: "Smartphone",
    image: "/placeholder.svg?height=200&width=200&text=Smartphone",
    price: 499.99,
    discount: "5% OFF",
    rating: 4.6,
    reviews: 320,
  },
  {
    id: 5,
    name: "Laptop",
    image: "/placeholder.svg?height=200&width=200&text=Laptop",
    price: 899.99,
    discount: "12% OFF",
    rating: 4.8,
    reviews: 150,
  },
  {
    id: 6,
    name: "Tablet",
    image: "/placeholder.svg?height=200&width=200&text=Tablet",
    price: 349.99,
    discount: "8% OFF",
    rating: 4.4,
    reviews: 95,
  },
]

export default function SellerPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isFollowing, setIsFollowing] = useState(true)
  const [activeStoreTab, setActiveStoreTab] = useState("all")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "account") {
      router.push("/account")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const seller = sellers.find((s) => s.id === params.id) || sellers[0]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account/followed-seller" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Seller Store</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        {/* Seller Banner */}
        <div className="relative h-40 w-full">
          <Image src={seller.banner || "/placeholder.svg"} alt={seller.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Seller Info */}
        <div className="bg-white p-4 relative">
          <div className="flex items-start">
            <div className="relative h-20 w-20 bg-white rounded-full overflow-hidden border-4 border-white -mt-10 mr-3 shadow-md">
              <Image src={seller.image || "/placeholder.svg"} alt={seller.name} fill className="object-cover" />
            </div>
            <div className="flex-1 pt-2">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-xl font-bold">{seller.name}</h1>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm ml-1">{seller.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500 mx-2">•</span>
                    <span className="text-sm text-gray-500">{seller.reviews} reviews</span>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant={isFollowing ? "outline" : "default"}
                  className={isFollowing ? "border-red-200 text-red-500" : "bg-[#40E0D0]"}
                  onClick={() => setIsFollowing(!isFollowing)}
                >
                  {isFollowing ? (
                    <>
                      <UserMinus className="h-4 w-4 mr-1" /> Unfollow
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-1" /> Follow
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <p className="text-sm text-gray-600">{seller.description}</p>
          </div>

          <div className="flex justify-between mt-4 pt-4 border-t border-gray-100 text-sm text-gray-500">
            <div>
              <div className="font-medium">{seller.products}</div>
              <div>Products</div>
            </div>
            <div>
              <div className="font-medium">{seller.followers}</div>
              <div>Followers</div>
            </div>
            <div>
              <div className="font-medium">{seller.rating}</div>
              <div>Rating</div>
            </div>
            <div>
              <div className="font-medium">{seller.joinedDate}</div>
              <div>Joined</div>
            </div>
          </div>
        </div>

        {/* Store Tabs */}
        <div className="bg-white mt-2 sticky top-[57px] z-10">
          <Tabs defaultValue="all" onValueChange={(value) => setActiveStoreTab(value)}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="popular">Popular</TabsTrigger>
              <TabsTrigger value="sale">Sale</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Filter and View Options */}
        <div className="flex justify-between items-center p-4">
          <Button variant="outline" size="sm" className="text-xs">
            <Filter className="h-3 w-3 mr-1" /> Filter
          </Button>
          <div className="flex space-x-2">
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1 rounded ${viewMode === "grid" ? "bg-gray-200" : ""}`}
            >
              <Grid className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1 rounded ${viewMode === "list" ? "bg-gray-200" : ""}`}
            >
              <List className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Products */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-2 gap-3 p-4">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="relative h-36 w-full">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                        {product.discount}
                      </div>
                    )}
                    <button className="absolute top-2 right-2 bg-white bg-opacity-70 rounded-full p-1">
                      <Heart className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm line-clamp-1">{product.name}</h3>
                    <p className="text-[#DEA818] font-bold mt-1">${product.price.toFixed(2)}</p>
                    <div className="mt-1 flex items-center">
                      <div className="flex">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {products.map((product) => (
              <Link href={`/product/${product.id}`} key={product.id}>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden flex">
                  <div className="relative h-24 w-24 flex-shrink-0">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                    {product.discount && (
                      <div className="absolute top-1 left-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded">
                        {product.discount}
                      </div>
                    )}
                  </div>
                  <div className="p-3 flex-1">
                    <h3 className="font-medium text-sm">{product.name}</h3>
                    <p className="text-[#DEA818] font-bold mt-1">${product.price.toFixed(2)}</p>
                    <div className="mt-1 flex items-center">
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  </div>
                  <button className="p-3">
                    <Heart className="h-5 w-5 text-gray-400" />
                  </button>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
