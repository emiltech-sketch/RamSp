"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  ArrowLeft,
  Filter,
  ShoppingCart,
  Heart,
  Percent,
  Clock,
  Star,
  ChevronDown,
  Grid3X3,
  LayoutList,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function SummerSalePage() {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("categories")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("discount")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedDiscounts, setSelectedDiscounts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Sample sale products
  const saleProducts = [
    {
      id: 301,
      name: "Premium Bluetooth Headphones with Noise Cancellation",
      image: "/placeholder.svg?height=200&width=200&text=Headphones",
      originalPrice: "$199.99",
      salePrice: "$99.99",
      discount: 50,
      discountCategory: "50% and above",
      rating: 4.8,
      reviews: 156,
      daysLeft: 3,
      endDate: "June 15, 2025",
      category: "Electronics",
      brand: "SoundCore",
      seller: "Official Store",
      express: true,
    },
    {
      id: 302,
      name: "Smart Fitness Watch with Heart Rate Monitor",
      image: "/placeholder.svg?height=200&width=200&text=Fitness+Watch",
      originalPrice: "$149.99",
      salePrice: "$89.99",
      discount: 40,
      discountCategory: "30-49%",
      rating: 4.6,
      reviews: 89,
      daysLeft: 5,
      endDate: "June 17, 2025",
      category: "Electronics",
      brand: "FitBit",
      seller: "Official Store",
      express: true,
    },
    {
      id: 303,
      name: "Summer Beach Dress - Floral Print",
      image: "/placeholder.svg?height=200&width=200&text=Beach+Dress",
      originalPrice: "$59.99",
      salePrice: "$29.99",
      discount: 50,
      discountCategory: "50% and above",
      rating: 4.5,
      reviews: 42,
      daysLeft: 7,
      endDate: "June 19, 2025",
      category: "Fashion",
      brand: "SummerChic",
      seller: "FashionHub",
      express: false,
    },
    {
      id: 304,
      name: "Portable Bluetooth Speaker Waterproof",
      image: "/placeholder.svg?height=200&width=200&text=Speaker",
      originalPrice: "$89.99",
      salePrice: "$59.99",
      discount: 33,
      discountCategory: "30-49%",
      rating: 4.3,
      reviews: 67,
      daysLeft: 2,
      endDate: "June 14, 2025",
      category: "Electronics",
      brand: "JBL",
      seller: "AudioWorld",
      express: false,
    },
    {
      id: 305,
      name: "Men's Summer Shorts - Quick Dry",
      image: "/placeholder.svg?height=200&width=200&text=Shorts",
      originalPrice: "$45.99",
      salePrice: "$29.99",
      discount: 35,
      discountCategory: "30-49%",
      rating: 4.2,
      reviews: 38,
      daysLeft: 4,
      endDate: "June 16, 2025",
      category: "Fashion",
      brand: "SportyWear",
      seller: "MensOutfitters",
      express: false,
    },
    {
      id: 306,
      name: "Sunscreen SPF 50 - Water Resistant",
      image: "/placeholder.svg?height=200&width=200&text=Sunscreen",
      originalPrice: "$24.99",
      salePrice: "$14.99",
      discount: 40,
      discountCategory: "30-49%",
      rating: 4.7,
      reviews: 112,
      daysLeft: 6,
      endDate: "June 18, 2025",
      category: "Beauty",
      brand: "SunGuard",
      seller: "HealthyYou",
      express: false,
    },
    {
      id: 307,
      name: "Beach Umbrella with Sand Anchor",
      image: "/placeholder.svg?height=200&width=200&text=Beach+Umbrella",
      originalPrice: "$79.99",
      salePrice: "$39.99",
      discount: 50,
      discountCategory: "50% and above",
      rating: 4.4,
      reviews: 29,
      daysLeft: 3,
      endDate: "June 15, 2025",
      category: "Sports",
      brand: "BeachLife",
      seller: "OutdoorEssentials",
      express: false,
    },
    {
      id: 308,
      name: "Tower Fan with Remote Control",
      image: "/placeholder.svg?height=200&width=200&text=Cooling+Fan",
      originalPrice: "$69.99",
      salePrice: "$34.99",
      discount: 50,
      discountCategory: "50% and above",
      rating: 4.5,
      reviews: 76,
      daysLeft: 5,
      endDate: "June 17, 2025",
      category: "Home & Office",
      brand: "CoolBreeze",
      seller: "HomeComfort",
      express: true,
    },
    {
      id: 309,
      name: "Inflatable Swimming Pool - Family Size",
      image: "/placeholder.svg?height=200&width=200&text=Swimming+Pool",
      originalPrice: "$129.99",
      salePrice: "$79.99",
      discount: 38,
      discountCategory: "30-49%",
      rating: 4.3,
      reviews: 54,
      daysLeft: 4,
      endDate: "June 16, 2025",
      category: "Sports",
      brand: "SummerFun",
      seller: "Official Store",
      express: true,
    },
    {
      id: 310,
      name: "Portable Air Conditioner - 8000 BTU",
      image: "/placeholder.svg?height=200&width=200&text=Air+Conditioner",
      originalPrice: "$349.99",
      salePrice: "$249.99",
      discount: 29,
      discountCategory: "10-29%",
      rating: 4.4,
      reviews: 87,
      daysLeft: 6,
      endDate: "June 18, 2025",
      category: "Home & Office",
      brand: "CoolAir",
      seller: "Official Store",
      express: true,
    },
    {
      id: 311,
      name: "Ice Cream Maker Machine",
      image: "/placeholder.svg?height=200&width=200&text=Ice+Cream+Maker",
      originalPrice: "$89.99",
      salePrice: "$59.99",
      discount: 33,
      discountCategory: "30-49%",
      rating: 4.6,
      reviews: 42,
      daysLeft: 7,
      endDate: "June 19, 2025",
      category: "Home & Office",
      brand: "SweetTreats",
      seller: "KitchenGadgets",
      express: false,
    },
    {
      id: 312,
      name: "Patio Furniture Set - 4 Pieces",
      image: "/placeholder.svg?height=200&width=200&text=Patio+Set",
      originalPrice: "$599.99",
      salePrice: "$299.99",
      discount: 50,
      discountCategory: "50% and above",
      rating: 4.5,
      reviews: 63,
      daysLeft: 3,
      endDate: "June 15, 2025",
      category: "Home & Office",
      brand: "OutdoorLiving",
      seller: "FurnitureExpo",
      express: false,
    },
  ]

  // Initialize filtered products with all products
  useEffect(() => {
    setFilteredProducts(saleProducts)
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Handle search and filtering
  useEffect(() => {
    let results = [...saleProducts]

    // Apply search filter
    if (searchQuery) {
      results = results.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      results = results.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply discount filters
    if (selectedDiscounts.length > 0) {
      results = results.filter((product) => selectedDiscounts.includes(product.discountCategory))
    }

    // Apply price filters
    if (priceMin !== "") {
      const min = Number.parseFloat(priceMin)
      results = results.filter((product) => Number.parseFloat(product.salePrice.replace("$", "")) >= min)
    }

    if (priceMax !== "") {
      const max = Number.parseFloat(priceMax)
      results = results.filter((product) => Number.parseFloat(product.salePrice.replace("$", "")) <= max)
    }

    // Apply sorting
    switch (sortBy) {
      case "discount":
        results.sort((a, b) => b.discount - a.discount)
        break
      case "price-low":
        results.sort(
          (a, b) => Number.parseFloat(a.salePrice.replace("$", "")) - Number.parseFloat(b.salePrice.replace("$", "")),
        )
        break
      case "price-high":
        results.sort(
          (a, b) => Number.parseFloat(b.salePrice.replace("$", "")) - Number.parseFloat(a.salePrice.replace("$", "")),
        )
        break
      case "ending-soon":
        results.sort((a, b) => a.daysLeft - b.daysLeft)
        break
      case "popularity":
        results.sort((a, b) => b.reviews - a.reviews)
        break
      default:
        break
    }

    setFilteredProducts(results)
  }, [searchQuery, sortBy, selectedCategories, selectedDiscounts, priceMin, priceMax])

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

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      if (prev.includes(category)) {
        return prev.filter((c) => c !== category)
      } else {
        return [...prev, category]
      }
    })
  }

  const handleDiscountChange = (discount) => {
    setSelectedDiscounts((prev) => {
      if (prev.includes(discount)) {
        return prev.filter((d) => d !== discount)
      } else {
        return [...prev, discount]
      }
    })
  }

  const resetFilters = () => {
    setPriceMin("")
    setPriceMax("")
    setSelectedCategories([])
    setSelectedDiscounts([])
    setSearchQuery("")
    setSortBy("discount")
  }

  const applyFilters = () => {
    // Filters are already applied via useEffect
    setShowFilters(false)
    toast({
      title: "Filters applied",
      description: `Showing ${filteredProducts.length} products`,
    })
  }

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      image: product.image,
      price: Number.parseFloat(product.salePrice.replace("$", "")),
      description: "",
      quantity: 1,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart`,
    })
  }

  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already applied via useEffect
    toast({
      title: "Search results",
      description: `Found ${filteredProducts.length} products`,
    })
  }

  const toggleViewMode = () => {
    setViewMode((prev) => (prev === "grid" ? "list" : "grid"))
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Jumia-style header - with summer sale themed colors */}
      <header className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-700 dark:to-red-700 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Summer Sale</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-3 relative flex items-center">
            <Input
              placeholder="Search sale items..."
              className="pl-10 pr-16 py-2 rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <button type="submit" className="absolute right-3 text-xs text-orange-500">
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Sale Banner */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 dark:from-orange-700 dark:to-red-700 p-3 text-white text-center">
        <h2 className="font-bold text-lg mb-1">SUMMER MEGA SALE</h2>
        <p className="text-sm">Up to 50% OFF on popular items! Sale ends soon!</p>
      </div>

      {/* Jumia-style category tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <Tabs defaultValue="all">
          <TabsList className="w-full h-10 bg-white dark:bg-gray-800 overflow-x-auto flex-nowrap justify-start px-0">
            <TabsTrigger value="all" className="px-4 text-xs">
              All Deals
            </TabsTrigger>
            <TabsTrigger value="top" className="px-4 text-xs">
              Top Deals
            </TabsTrigger>
            <TabsTrigger value="50" className="px-4 text-xs">
              50% Off
            </TabsTrigger>
            <TabsTrigger value="electronics" className="px-4 text-xs">
              Electronics
            </TabsTrigger>
            <TabsTrigger value="home" className="px-4 text-xs">
              Home
            </TabsTrigger>
            <TabsTrigger value="fashion" className="px-4 text-xs">
              Fashion
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Sort and Filter Bar - Jumia Style */}
      <div className="bg-white dark:bg-gray-800 p-3 flex justify-between items-center shadow-sm">
        <div className="flex items-center">
          <button
            className="flex items-center text-xs dark:text-white mr-4 border-r border-gray-200 pr-4"
            onClick={toggleFilters}
          >
            <Filter className="h-3.5 w-3.5 mr-1" />
            <span>FILTER</span>
            {(selectedCategories.length > 0 || selectedDiscounts.length > 0 || priceMin || priceMax) && (
              <span className="ml-1 bg-orange-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {selectedCategories.length + selectedDiscounts.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="flex items-center text-xs">
            <span className="mr-2 dark:text-white">SORT:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-7 text-xs border-none shadow-none dark:bg-gray-700 dark:text-white pl-0 pr-2">
                <SelectValue placeholder="Highest Discount" />
                <ChevronDown className="h-3.5 w-3.5" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="discount">Highest Discount</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="ending-soon">Ending Soon</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <button onClick={toggleViewMode} className="flex items-center text-xs dark:text-white">
          {viewMode === "grid" ? <LayoutList className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
        </button>
      </div>

      {/* Filter Panel - Jumia Style */}
      {showFilters && (
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-sm">
          <h3 className="font-medium mb-3 dark:text-white text-sm">PRICE RANGE</h3>
          <div className="flex space-x-2 mb-4">
            <Input
              placeholder="Min"
              className="text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white h-9"
              type="number"
              value={priceMin}
              onChange={(e) => setPriceMin(e.target.value)}
            />
            <Input
              placeholder="Max"
              className="text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white h-9"
              type="number"
              value={priceMax}
              onChange={(e) => setPriceMax(e.target.value)}
            />
          </div>

          <h3 className="font-medium mb-2 dark:text-white text-sm">CATEGORY</h3>
          <div className="space-y-2 mb-4">
            {["Electronics", "Home & Office", "Fashion", "Beauty", "Sports"].map((category) => (
              <div key={category} className="flex items-center">
                <input
                  type="checkbox"
                  id={category}
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                  checked={selectedCategories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                />
                <label htmlFor={category} className="text-sm dark:text-gray-300">
                  {category}
                </label>
              </div>
            ))}
          </div>

          <h3 className="font-medium mb-2 dark:text-white text-sm">DISCOUNT</h3>
          <div className="space-y-2 mb-4">
            {["50% and above", "30-49%", "10-29%"].map((discount) => (
              <div key={discount} className="flex items-center">
                <input
                  type="checkbox"
                  id={`discount-${discount}`}
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                  checked={selectedDiscounts.includes(discount)}
                  onChange={() => handleDiscountChange(discount)}
                />
                <label htmlFor={`discount-${discount}`} className="text-sm dark:text-gray-300">
                  {discount}
                </label>
              </div>
            ))}
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1 dark:border-gray-600 dark:text-gray-300 h-9 text-xs"
              onClick={resetFilters}
            >
              CLEAR
            </Button>
            <Button
              className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 h-9 text-xs"
              onClick={applyFilters}
            >
              APPLY
            </Button>
          </div>
        </div>
      )}

      {/* Product Grid - Jumia Style */}
      <div className="flex-1 p-2 pb-20">
        {isLoading ? (
          // Loading skeleton
          <div className="grid grid-cols-2 gap-2">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded overflow-hidden shadow-sm p-2">
                <div className="h-32 w-full bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 animate-pulse mt-2 rounded"></div>
                <div className="h-4 w-1/4 bg-gray-200 dark:bg-gray-700 animate-pulse mt-2 rounded"></div>
                <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 animate-pulse mt-2 rounded"></div>
                <div className="h-8 w-full bg-gray-200 dark:bg-gray-700 animate-pulse mt-2 rounded"></div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length > 0 ? (
          viewMode === "grid" ? (
            // Grid View - Jumia Style
            <div className="grid grid-cols-2 gap-2">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded overflow-hidden shadow-sm relative">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative h-36 w-full bg-gray-50">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-2"
                      />
                      {/* Discount Tag */}
                      <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs px-1 py-0.5 flex items-center">
                        <Percent className="h-3 w-3 mr-0.5" />
                        {product.discount}%
                      </div>

                      {/* Countdown Tag */}
                      <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-1 py-0.5 flex items-center">
                        <Clock className="h-3 w-3 mr-0.5" />
                        {product.daysLeft}d left
                      </div>
                    </div>
                  </Link>
                  <div className="p-2">
                    {/* Brand */}
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{product.brand}</div>

                    <Link href={`/product/${product.id}`}>
                      <h3 className="text-xs line-clamp-2 font-medium dark:text-white mb-1">{product.name}</h3>
                    </Link>

                    {/* Price Section */}
                    <div className="mb-1">
                      <p className="text-sm font-bold text-orange-500">{product.salePrice}</p>
                      <div className="flex items-center">
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-through mr-1">
                          {product.originalPrice}
                        </p>
                        <p className="text-xs text-orange-500">-{product.discount}%</p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 fill-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
                    </div>

                    {/* Seller & Express Tag */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-500 dark:text-gray-400">{product.seller}</span>
                      {product.express && (
                        <span className="bg-blue-600 text-white text-xs px-1 rounded-sm">Express</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        className="flex-1 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 h-8 text-xs"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        ADD
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 flex items-center justify-center"
                        onClick={() =>
                          toast({
                            title: "Added to wishlist",
                            description: `${product.name} has been added to your wishlist`,
                          })
                        }
                      >
                        <Heart className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // List View - Jumia Style
            <div className="space-y-2">
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white dark:bg-gray-800 rounded overflow-hidden shadow-sm">
                  <div className="flex">
                    <Link href={`/product/${product.id}`} className="relative h-24 w-24 bg-gray-50 flex-shrink-0">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-contain p-1"
                      />
                      {/* Discount Tag */}
                      <div className="absolute top-0 left-0 bg-orange-500 text-white text-xs px-1 py-0.5 flex items-center">
                        <Percent className="h-3 w-3 mr-0.5" />
                        {product.discount}%
                      </div>
                      {/* Countdown Tag */}
                      <div className="absolute bottom-0 right-0 bg-black/60 text-white text-xs px-1 py-0.5 flex items-center">
                        <Clock className="h-3 w-3 mr-0.5" />
                        {product.daysLeft}d
                      </div>
                    </Link>

                    <div className="p-2 flex-1">
                      {/* Brand */}
                      <div className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</div>

                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-xs font-medium dark:text-white mb-1">{product.name}</h3>
                      </Link>

                      {/* Price Section */}
                      <div className="mb-1">
                        <p className="text-sm font-bold text-orange-500">{product.salePrice}</p>
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-through mr-1">
                            {product.originalPrice}
                          </p>
                          <p className="text-xs text-orange-500">-{product.discount}%</p>
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300 fill-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">({product.reviews})</span>
                      </div>

                      {/* Seller & Express Tag */}
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">{product.seller}</span>
                        {product.express && (
                          <span className="bg-blue-600 text-white text-xs px-1 rounded-sm">Express</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col p-2 gap-1 justify-center">
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 h-8 text-xs w-full"
                        onClick={() => handleAddToCart(product)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        ADD
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-full text-xs"
                        onClick={() =>
                          toast({
                            title: "Added to wishlist",
                            description: `${product.name} has been added to your wishlist`,
                          })
                        }
                      >
                        <Heart className="h-3 w-3 mr-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-gray-500 dark:text-gray-400 mb-4">No products found</p>
            <Button
              onClick={resetFilters}
              className="bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
