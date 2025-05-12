"use client"

import type React from "react"

import { useState, useEffect, createContext, useContext } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, Mic, Camera, MessageSquare } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import MobileNavigation from "./mobile-navigation"
import CategoryNavigation from "./category-navigation"
import VoiceSearch from "./voice-search"
import CameraSearch from "./camera-search"
import AIChatSupport from "./ai-chat-support"
import CurrencySettings from "./currency-settings"
import { useCart } from "./cart-provider"

// Create currency context
interface CurrencyOption {
  code: string
  symbol: string
  name: string
}

const CurrencyContext = createContext<{
  currency: CurrencyOption
  setCurrency: (currency: CurrencyOption) => void
}>({
  currency: { code: "USD", symbol: "$", name: "US Dollar" },
  setCurrency: () => {},
})

export const useCurrency = () => useContext(CurrencyContext)

interface HomePageProps {
  username?: string
}

export default function HomePage({ username = "Guest" }: HomePageProps) {
  // Currency state
  const [currency, setCurrency] = useState<CurrencyOption>({ code: "USD", symbol: "$", name: "US Dollar" })
  const [isClient, setIsClient] = useState(false)
  const { cart } = useCart()

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Sample banner images
  const banners = [
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg",
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
  ]

  const [currentBanner, setCurrentBanner] = useState(0)
  useEffect(() => {
    if (!isClient) return

    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [banners.length, isClient])

  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")
  const [showVoiceSearch, setShowVoiceSearch] = useState(false)
  const [showCameraSearch, setShowCameraSearch] = useState(false)
  const [showChatSupport, setShowChatSupport] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "account") {
      router.push("/account")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  // Featured products data
  const featuredProducts = [
    {
      id: "1",
      name: "Wireless Earbuds",
      image: "/placeholder.svg?height=200&width=200&text=Earbuds",
      price: 49.99,
      discount: "20% OFF",
    },
    {
      id: "2",
      name: "Smart Watch",
      image: "/placeholder.svg?height=200&width=200&text=Smart+Watch",
      price: 129.99,
      discount: "15% OFF",
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      image: "/placeholder.svg?height=200&width=200&text=Speaker",
      price: 79.99,
      discount: "10% OFF",
    },
    {
      id: "4",
      name: "Smartphone",
      image: "/placeholder.svg?height=200&width=200&text=Smartphone",
      price: 499.99,
      discount: "5% OFF",
    },
    {
      id: "5",
      name: "Laptop",
      image: "/placeholder.svg?height=200&width=200&text=Laptop",
      price: 899.99,
      discount: "12% OFF",
    },
    {
      id: "6",
      name: "Tablet",
      image: "/placeholder.svg?height=200&width=200&text=Tablet",
      price: 349.99,
      discount: "8% OFF",
    },
  ]

  // Categories data
  const categories = [
    {
      name: "Electronics",
      image: "/placeholder.svg?height=100&width=100&text=Electronics",
      path: "/category/electronics",
    },
    {
      name: "Fashion",
      image: "/placeholder.svg?height=100&width=100&text=Fashion",
      path: "/category/fashion",
    },
    {
      name: "Home & Office",
      image: "/placeholder.svg?height=100&width=100&text=Home",
      path: "/category/home-office",
    },
    {
      name: "Beauty Care",
      image: "/placeholder.svg?height=100&width=100&text=Beauty",
      path: "/category/beautycare",
    },
    {
      name: "FoodMart",
      image: "/placeholder.svg?height=100&width=100&text=Food",
      path: "/category/foodmart",
    },
    {
      name: "Sports & Gears",
      image: "/placeholder.svg?height=100&width=100&text=Sports",
      path: "/category/sports-gears",
    },
    {
      name: "Phones & Tablets",
      image: "/placeholder.svg?height=100&width=100&text=Phones",
      path: "/category/phones-tablets",
    },
    {
      name: "Computers",
      image: "/placeholder.svg?height=100&width=100&text=Computers",
      path: "/category/computers-peripherals",
    },
  ]

  // Flash deals data
  const flashDeals = [
    {
      id: "101",
      name: "Wireless Headphones",
      image: "/placeholder.svg?height=200&width=200&text=Headphones",
      originalPrice: 99.99,
      discountedPrice: 59.99,
      discount: "40% OFF",
      timeLeft: "2h 15m",
    },
    {
      id: "102",
      name: "Coffee Maker",
      image: "/placeholder.svg?height=200&width=200&text=Coffee+Maker",
      originalPrice: 149.99,
      discountedPrice: 89.99,
      discount: "40% OFF",
      timeLeft: "3h 45m",
    },
    {
      id: "103",
      name: "Fitness Tracker",
      image: "/placeholder.svg?height=200&width=200&text=Fitness+Tracker",
      originalPrice: 79.99,
      discountedPrice: 49.99,
      discount: "38% OFF",
      timeLeft: "1h 30m",
    },
    {
      id: "104",
      name: "Smart TV",
      image: "/placeholder.svg?height=200&width=200&text=Smart+TV",
      originalPrice: 599.99,
      discountedPrice: 399.99,
      discount: "33% OFF",
      timeLeft: "4h 20m",
    },
    {
      id: "105",
      name: "Gaming Console",
      image: "/placeholder.svg?height=200&width=200&text=Gaming+Console",
      originalPrice: 499.99,
      discountedPrice: 349.99,
      discount: "30% OFF",
      timeLeft: "5h 10m",
    },
    {
      id: "106",
      name: "Digital Camera",
      image: "/placeholder.svg?height=200&width=200&text=Digital+Camera",
      originalPrice: 399.99,
      discountedPrice: 249.99,
      discount: "38% OFF",
      timeLeft: "2h 45m",
    },
  ]

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      <div className="min-h-screen bg-gray-50 pb-16">
        <header className="bg-[#40E0D0] p-4 sticky top-0 z-30">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-wjDSju0zJt1TdulWpb6FPeZ235IGXT.png"
                  alt="RamSphere Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg">RamSphere</span>
            </div>
            <div className="flex items-center space-x-2">
              <CurrencySettings currentCurrency={currency} onSelect={setCurrency} />
            </div>
          </div>

          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 pr-20 py-2 w-full rounded-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex space-x-2">
              <button type="button" onClick={() => setShowVoiceSearch(true)}>
                <Mic className="h-5 w-5 text-gray-400" />
              </button>
              <button type="button" onClick={() => setShowCameraSearch(true)}>
                <Camera className="h-5 w-5 text-gray-400" />
              </button>
            </div>
          </form>
        </header>

        <div className="sticky top-[73px] z-20 bg-white">
          <CategoryNavigation />
        </div>

        <main className="pb-4 bg-gray-50">
          {/* Amazon-style personalized greeting */}
          <div className="bg-white p-4 mb-2">
            <h2 className="text-lg font-medium">Hello, {username}</h2>
          </div>

          {/* Banner Carousel - Amazon Style */}
          <div className="relative mb-2">
            <div className="relative h-40 w-full">
              <Image src={banners[currentBanner] || "/placeholder.svg"} alt="Banner" fill className="object-cover" />
              <div className="absolute bottom-2 left-0 right-0 flex justify-center">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full mx-1 ${index === currentBanner ? "bg-white" : "bg-white/50"}`}
                    onClick={() => setCurrentBanner(index)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Amazon-style category grid */}
          <div className="bg-white p-4 mb-2">
            <h2 className="text-base font-medium mb-3">Shop by Category</h2>
            <div className="grid grid-cols-4 gap-3">
              {categories.slice(0, 8).map((category) => (
                <Link href={category.path} key={category.name} className="flex flex-col items-center">
                  <div className="relative h-14 w-14 mb-1 bg-gray-100 rounded-lg overflow-hidden">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover p-1"
                    />
                  </div>
                  <span className="text-xs text-center line-clamp-1">{category.name}</span>
                </Link>
              ))}
            </div>
            <Link href="/category/all" className="flex items-center justify-center mt-3 text-[#007185] text-sm">
              See all categories
            </Link>
          </div>

          {/* Deal of the Day - Amazon Style */}
          <div className="bg-white p-4 mb-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-medium">Deal of the Day</h2>
              <Link href="/products/sale" className="text-[#007185] text-sm">
                See all deals
              </Link>
            </div>
            <div className="relative h-48 w-full bg-gray-100 rounded-md overflow-hidden mb-3">
              <Image
                src="/placeholder.svg?height=300&width=500&text=Deal+of+the+Day"
                alt="Deal of the Day"
                fill
                className="object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-sm inline-block mb-1">
                  SAVE 40%
                </div>
                <h3 className="text-white font-bold text-lg">Premium Wireless Headphones</h3>
                <p className="text-white text-sm">Limited time offer</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-red-600 font-bold text-lg mr-2">{currency.symbol}59.99</span>
              <span className="text-gray-500 line-through text-sm">{currency.symbol}99.99</span>
              <span className="ml-auto bg-[#CC0C39] text-white text-xs px-2 py-1 rounded-sm">Ends in 12:45:30</span>
            </div>
          </div>

          {/* Continue Shopping - Amazon Style */}
          <div className="bg-white p-4 mb-2">
            <h2 className="text-base font-medium mb-3">Continue shopping</h2>
            <div className="grid grid-cols-3 gap-3">
              {featuredProducts.slice(0, 3).map((product) => (
                <Link href={`/product/${product.id}`} key={product.id} className="flex flex-col">
                  <div className="relative h-24 w-full bg-gray-100 rounded-md overflow-hidden mb-1">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-xs line-clamp-1">{product.name}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Recommended for You - Amazon Style */}
          <div className="bg-white p-4 mb-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-medium">Recommended for you</h2>
              <Link href="/products/recommended" className="text-[#007185] text-sm">
                See more
              </Link>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-3 pb-2 w-max">
                {featuredProducts.map((product) => (
                  <Link href={`/product/${product.id}`} key={product.id}>
                    <div className="w-32">
                      <div className="relative h-32 w-32 bg-gray-100 rounded-md overflow-hidden mb-1">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                        {product.discount && (
                          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded-sm">
                            {product.discount}
                          </div>
                        )}
                      </div>
                      <h3 className="text-xs line-clamp-2">{product.name}</h3>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className="text-yellow-400 text-xs">
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 ml-1">(120)</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <p className="text-[#B12704] font-bold text-sm">
                          {currency.symbol}
                          {product.price.toFixed(2)}
                        </p>
                        {product.originalPrice && (
                          <p className="text-gray-500 text-xs line-through ml-1">
                            {currency.symbol}
                            {product.originalPrice.toFixed(2)}
                          </p>
                        )}
                      </div>
                      <div className="text-xs text-[#007600] mt-1">In Stock</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* New Arrivals - Amazon Style */}
          <div className="bg-white p-4 mb-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-medium">New Arrivals</h2>
              <Link href="/products/new-arrivals" className="text-[#007185] text-sm">
                See all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-3 pb-2 w-max">
                {[...Array(6)].map((_, index) => (
                  <Link href={`/product/${300 + index}`} key={index}>
                    <div className="w-32">
                      <div className="relative h-32 w-32 bg-gray-100 rounded-md overflow-hidden mb-1">
                        <Image
                          src={`/placeholder.svg?height=150&width=150&text=New+${index + 1}`}
                          alt={`New Product ${index + 1}`}
                          fill
                          className="object-contain p-1"
                        />
                        <div className="absolute top-1 left-1 bg-blue-600 text-white text-xs px-1 py-0.5 rounded-sm">
                          NEW
                        </div>
                      </div>
                      <h3 className="text-xs line-clamp-2">New Product {index + 1}</h3>
                      <div className="flex items-center mt-1">
                        <p className="text-[#B12704] font-bold text-sm">
                          {currency.symbol}
                          {(29.99 + index * 10).toFixed(2)}
                        </p>
                      </div>
                      <div className="text-xs text-[#007600] mt-1">Prime Delivery</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Summer Sale - Amazon Style */}
          <div className="bg-white p-4 mb-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-medium">Summer Sale</h2>
              <Link href="/products/sale" className="text-[#007185] text-sm">
                See all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-3 pb-2 w-max">
                {flashDeals.map((deal) => (
                  <Link href={`/product/${deal.id}`} key={deal.id}>
                    <div className="w-32">
                      <div className="relative h-32 w-32 bg-gray-100 rounded-md overflow-hidden mb-1">
                        <Image
                          src={deal.image || "/placeholder.svg"}
                          alt={deal.name}
                          fill
                          className="object-contain p-1"
                        />
                        <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1 py-0.5 rounded-sm">
                          {deal.discount}
                        </div>
                        <div className="absolute bottom-1 right-1 bg-black bg-opacity-70 text-white text-xs px-1 py-0.5 rounded-sm">
                          {deal.timeLeft}
                        </div>
                      </div>
                      <h3 className="text-xs line-clamp-2">{deal.name}</h3>
                      <div className="flex items-center mt-1">
                        <p className="text-[#B12704] font-bold text-sm">
                          {currency.symbol}
                          {deal.discountedPrice.toFixed(2)}
                        </p>
                        <p className="text-gray-500 text-xs line-through ml-1">
                          {currency.symbol}
                          {deal.originalPrice.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Popular Brands - Amazon Style */}
          <div className="bg-white p-4 mb-2">
            <h2 className="text-base font-medium mb-3">Popular Brands</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { name: "Apple", logo: "/placeholder.svg?height=60&width=60&text=Apple" },
                { name: "Samsung", logo: "/placeholder.svg?height=60&width=60&text=Samsung" },
                { name: "Sony", logo: "/placeholder.svg?height=60&width=60&text=Sony" },
                { name: "Nike", logo: "/placeholder.svg?height=60&width=60&text=Nike" },
                { name: "Adidas", logo: "/placeholder.svg?height=60&width=60&text=Adidas" },
                { name: "LG", logo: "/placeholder.svg?height=60&width=60&text=LG" },
              ].map((brand, index) => (
                <Link href={`/brands/${brand.name.toLowerCase()}`} key={index}>
                  <div className="flex flex-col items-center">
                    <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden mb-1">
                      <Image
                        src={brand.logo || "/placeholder.svg"}
                        alt={brand.name}
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                    <span className="text-xs text-center">{brand.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Recently Viewed - Amazon Style */}
          <div className="bg-white p-4 mb-2">
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-medium">Recently Viewed</h2>
              <Link href="/account/recently-viewed" className="text-[#007185] text-sm">
                See all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <div className="flex space-x-3 pb-2 w-max">
                {[...Array(4)].map((_, index) => (
                  <Link href={`/product/${400 + index}`} key={index}>
                    <div className="w-32">
                      <div className="relative h-32 w-32 bg-gray-100 rounded-md overflow-hidden mb-1">
                        <Image
                          src={`/placeholder.svg?height=150&width=150&text=Product+${index + 1}`}
                          alt={`Product ${index + 1}`}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <h3 className="text-xs line-clamp-2">Viewed Product {index + 1}</h3>
                      <div className="flex items-center mt-1">
                        <p className="text-[#B12704] font-bold text-sm">
                          {currency.symbol}
                          {(19.99 + index * 10).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* Floating Chat Support Button */}
        <button
          onClick={() => setShowChatSupport(true)}
          className="fixed bottom-20 right-4 bg-[#DEA818] text-white rounded-full p-3 shadow-lg z-10"
        >
          <MessageSquare className="h-6 w-6" />
        </button>

        {/* Voice Search Modal */}
        {showVoiceSearch && <VoiceSearch onClose={() => setShowVoiceSearch(false)} />}

        {/* Camera Search Modal */}
        {showCameraSearch && <CameraSearch onClose={() => setShowCameraSearch(false)} />}

        {/* AI Chat Support Modal */}
        {showChatSupport && <AIChatSupport onClose={() => setShowChatSupport(false)} />}

        <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} cartItemCount={cart ? cart.length : 0} />
      </div>
    </CurrencyContext.Provider>
  )
}
