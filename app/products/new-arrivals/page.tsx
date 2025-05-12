"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Search, ArrowLeft, Filter, ShoppingCart, Heart, Star, Grid3X3, LayoutList, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NewArrivalsPage() {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("categories")
  const [showFilters, setShowFilters] = useState(false)
  const [sortBy, setSortBy] = useState("newest")
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState([])
  const [priceMin, setPriceMin] = useState("")
  const [priceMax, setPriceMax] = useState("")
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedTimeframes, setSelectedTimeframes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  // Sample new arrival products
  const newProducts = [
    {
      id: 201,
      name: "Smart Home Hub",
      image: "/placeholder.svg?height=200&width=200&text=Smart+Home+Hub",
      price: "$129.99",
      rating: 4.8,
      reviews: 24,
      dateAdded: "2 days ago",
      category: "Electronics",
      timeframe: "Last 3 days",
      discount: 15,
      originalPrice: "$152.99",
      brand: "TechHome",
      seller: "Official Store",
    },
    {
      id: 202,
      name: "Wireless Earbuds Pro",
      image: "/placeholder.svg?height=200&width=200&text=Wireless+Earbuds",
      price: "$89.99",
      rating: 4.7,
      reviews: 18,
      dateAdded: "3 days ago",
      category: "Electronics",
      timeframe: "Last 3 days",
      discount: 10,
      originalPrice: "$99.99",
      brand: "SoundMax",
      seller: "Official Store",
    },
    {
      id: 203,
      name: "Ultra HD Webcam",
      image: "/placeholder.svg?height=200&width=200&text=HD+Webcam",
      price: "$69.99",
      rating: 4.5,
      reviews: 12,
      dateAdded: "4 days ago",
      category: "Electronics",
      timeframe: "Last week",
      discount: 30,
      originalPrice: "$99.99",
      brand: "ViewTech",
      seller: "TechGadgets",
    },
    {
      id: 204,
      name: "Ergonomic Keyboard",
      image: "/placeholder.svg?height=200&width=200&text=Ergonomic+Keyboard",
      price: "$119.99",
      rating: 4.6,
      reviews: 9,
      dateAdded: "5 days ago",
      category: "Home & Office",
      timeframe: "Last week",
      discount: 20,
      originalPrice: "$149.99",
      brand: "ComfortType",
      seller: "Official Store",
    },
    {
      id: 205,
      name: "Portable SSD 1TB",
      image: "/placeholder.svg?height=200&width=200&text=Portable+SSD",
      price: "$149.99",
      rating: 4.9,
      reviews: 7,
      dateAdded: "1 week ago",
      category: "Electronics",
      timeframe: "Last week",
      discount: 25,
      originalPrice: "$199.99",
      brand: "DataSafe",
      seller: "StorageSolutions",
    },
    {
      id: 206,
      name: "Smart Water Bottle",
      image: "/placeholder.svg?height=200&width=200&text=Smart+Water+Bottle",
      price: "$39.99",
      rating: 4.3,
      reviews: 5,
      dateAdded: "1 week ago",
      category: "Sports",
      timeframe: "Last week",
      discount: 20,
      originalPrice: "$49.99",
      brand: "HydroTech",
      seller: "HealthyLiving",
    },
    {
      id: 207,
      name: "Fitness Tracker Watch",
      image: "/placeholder.svg?height=200&width=200&text=Fitness+Tracker",
      price: "$79.99",
      rating: 4.4,
      reviews: 32,
      dateAdded: "Today",
      category: "Sports",
      timeframe: "Today",
      discount: 20,
      originalPrice: "$99.99",
      brand: "FitPro",
      seller: "Official Store",
    },
    {
      id: 208,
      name: "Organic Face Cream",
      image: "/placeholder.svg?height=200&width=200&text=Face+Cream",
      price: "$24.99",
      rating: 4.7,
      reviews: 14,
      dateAdded: "Today",
      category: "Beauty",
      timeframe: "Today",
      discount: 17,
      originalPrice: "$29.99",
      brand: "NaturalGlow",
      seller: "BeautyEssentials",
    },
    {
      id: 209,
      name: "Bluetooth Headphones",
      image: "/placeholder.svg?height=200&width=200&text=Headphones",
      price: "$59.99",
      rating: 4.5,
      reviews: 47,
      dateAdded: "Yesterday",
      category: "Electronics",
      timeframe: "Last 3 days",
      discount: 25,
      originalPrice: "$79.99",
      brand: "SoundWave",
      seller: "AudioExperts",
    },
    {
      id: 210,
      name: "Smart LED Light Bulbs (4-Pack)",
      image: "/placeholder.svg?height=200&width=200&text=LED+Bulbs",
      price: "$34.99",
      rating: 4.6,
      reviews: 28,
      dateAdded: "Yesterday",
      category: "Home & Office",
      timeframe: "Last 3 days",
      discount: 30,
      originalPrice: "$49.99",
      brand: "BrightLife",
      seller: "SmartHome",
    },
    {
      id: 211,
      name: "Wireless Charging Pad",
      image: "/placeholder.svg?height=200&width=200&text=Charging+Pad",
      price: "$29.99",
      rating: 4.4,
      reviews: 36,
      dateAdded: "3 days ago",
      category: "Electronics",
      timeframe: "Last 3 days",
      discount: 25,
      originalPrice: "$39.99",
      brand: "PowerUp",
      seller: "Official Store",
    },
    {
      id: 212,
      name: "Smart Plant Sensor",
      image: "/placeholder.svg?height=200&width=200&text=Plant+Sensor",
      price: "$19.99",
      rating: 4.3,
      reviews: 19,
      dateAdded: "5 days ago",
      category: "Home & Office",
      timeframe: "Last week",
      discount: 20,
      originalPrice: "$24.99",
      brand: "GreenThumb",
      seller: "GardenTech",
    },
  ]

  // Initialize filtered products with all products
  useEffect(() => {
    setFilteredProducts(newProducts)
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Handle search and filtering
  useEffect(() => {
    let results = [...newProducts]

    // Apply search filter
    if (searchQuery) {
      results = results.filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // Apply category filters
    if (selectedCategories.length > 0) {
      results = results.filter((product) => selectedCategories.includes(product.category))
    }

    // Apply timeframe filters
    if (selectedTimeframes.length > 0) {
      results = results.filter((product) => selectedTimeframes.includes(product.timeframe))
    }

    // Apply price filters
    if (priceMin !== "") {
      const min = Number.parseFloat(priceMin)
      results = results.filter((product) => Number.parseFloat(product.price.replace("$", "")) >= min)
    }

    if (priceMax !== "") {
      const max = Number.parseFloat(priceMax)
      results = results.filter((product) => Number.parseFloat(product.price.replace("$", "")) <= max)
    }

    // Apply sorting
    switch (sortBy) {
      case "newest":
        // Already sorted by newest
        break
      case "price-low":
        results.sort(
          (a, b) => Number.parseFloat(a.price.replace("$", "")) - Number.parseFloat(b.price.replace("$", "")),
        )
        break
      case "price-high":
        results.sort(
          (a, b) => Number.parseFloat(b.price.replace("$", "")) - Number.parseFloat(a.price.replace("$", "")),
        )
        break
      case "popularity":
        results.sort((a, b) => b.reviews - a.reviews)
        break
      case "discount":
        results.sort((a, b) => b.discount - a.discount)
        break
      default:
        break
    }

    setFilteredProducts(results)
  }, [searchQuery, sortBy, selectedCategories, selectedTimeframes, priceMin, priceMax])

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

  const handleTimeframeChange = (timeframe) => {
    setSelectedTimeframes((prev) => {
      if (prev.includes(timeframe)) {
        return prev.filter((t) => t !== timeframe)
      } else {
        return [...prev, timeframe]
      }
    })
  }

  const resetFilters = () => {
    setPriceMin("")
    setPriceMax("")
    setSelectedCategories([])
    setSelectedTimeframes([])
    setSearchQuery("")
    setSortBy("newest")
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
      price: Number.parseFloat(product.price.replace("$", "")),
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
      {/* Jumia-style header */}
      <header className="bg-[#40E0D0] dark:bg-teal-800 shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">New Arrivals</span>
            </Link>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mt-3 relative flex items-center">
            <Input
              placeholder="Search new arrivals..."
              className="pl-10 pr-16 py-2 rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 h-4 w-4 text-gray-400" />
            <button type="submit" className="absolute right-3 text-xs text-[#40E0D0]">
              Search
            </button>
          </form>
        </div>
      </header>

      {/* Jumia-style category tabs */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <Tabs defaultValue="all">
          <TabsList className="w-full h-10 bg-white dark:bg-gray-800 overflow-x-auto flex-nowrap justify-start px-0">
            <TabsTrigger value="all" className="px-4 text-xs">
              All
            </TabsTrigger>
            <TabsTrigger value="electronics" className="px-4 text-xs">
              Electronics
            </TabsTrigger>
            <TabsTrigger value="fashion" className="px-4 text-xs">
              Fashion
            </TabsTrigger>
            <TabsTrigger value="home" className="px-4 text-xs">
              Home & Office
            </TabsTrigger>
            <TabsTrigger value="beauty" className="px-4 text-xs">
              Beauty
            </TabsTrigger>
            <TabsTrigger value="sports" className="px-4 text-xs">
              Sports
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
            {(selectedCategories.length > 0 || selectedTimeframes.length > 0 || priceMin || priceMax) && (
              <span className="ml-1 bg-[#40E0D0] text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                {selectedCategories.length + selectedTimeframes.length + (priceMin ? 1 : 0) + (priceMax ? 1 : 0)}
              </span>
            )}
          </button>

          <div className="flex items-center text-xs">
            <span className="mr-2 dark:text-white">SORT:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="h-7 text-xs border-none shadow-none dark:bg-gray-700 dark:text-white pl-0 pr-2">
                <SelectValue placeholder="Newest First" />
                <ChevronDown className="h-3.5 w-3.5" />
              </SelectTrigger>
              <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="popularity">Popularity</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="discount">Highest Discount</SelectItem>
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

          <h3 className="font-medium mb-2 dark:text-white text-sm">DATE ADDED</h3>
          <div className="space-y-2 mb-4">
            {["Today", "Last 3 days", "Last week", "Last month"].map((timeframe) => (
              <div key={timeframe} className="flex items-center">
                <input
                  type="checkbox"
                  id={`time-${timeframe}`}
                  className="mr-2 h-4 w-4 rounded border-gray-300"
                  checked={selectedTimeframes.includes(timeframe)}
                  onChange={() => handleTimeframeChange(timeframe)}
                />
                <label htmlFor={`time-${timeframe}`} className="text-sm dark:text-gray-300">
                  {timeframe}
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
              className="flex-1 bg-[#40E0D0] hover:bg-[#3bc9b9] dark:bg-teal-600 dark:hover:bg-teal-700 h-9 text-xs"
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
                      {product.discount > 0 && (
                        <div className="absolute top-0 left-0 bg-[#f68b1e] text-white text-xs px-1 py-0.5">
                          -{product.discount}%
                        </div>
                      )}
                      {/* New Tag */}
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 py-0.5">NEW</div>
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
                      <p className="text-sm font-bold dark:text-white">{product.price}</p>
                      {product.discount > 0 && (
                        <div className="flex items-center">
                          <p className="text-xs text-gray-500 dark:text-gray-400 line-through mr-1">
                            {product.originalPrice}
                          </p>
                          <p className="text-xs text-[#f68b1e]">-{product.discount}%</p>
                        </div>
                      )}
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
                      {product.seller === "Official Store" && (
                        <span className="bg-blue-600 text-white text-xs px-1 rounded-sm">Express</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        className="flex-1 bg-[#40E0D0] hover:bg-[#3bc9b9] dark:bg-teal-600 dark:hover:bg-teal-700 h-8 text-xs"
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
                      {product.discount > 0 && (
                        <div className="absolute top-0 left-0 bg-[#f68b1e] text-white text-xs px-1 py-0.5">
                          -{product.discount}%
                        </div>
                      )}
                      {/* New Tag */}
                      <div className="absolute top-0 right-0 bg-green-500 text-white text-xs px-1 py-0.5">NEW</div>
                    </Link>

                    <div className="p-2 flex-1">
                      {/* Brand */}
                      <div className="text-xs text-gray-500 dark:text-gray-400">{product.brand}</div>

                      <Link href={`/product/${product.id}`}>
                        <h3 className="text-xs font-medium dark:text-white mb-1">{product.name}</h3>
                      </Link>

                      {/* Price Section */}
                      <div className="mb-1">
                        <p className="text-sm font-bold dark:text-white">{product.price}</p>
                        {product.discount > 0 && (
                          <div className="flex items-center">
                            <p className="text-xs text-gray-500 dark:text-gray-400 line-through mr-1">
                              {product.originalPrice}
                            </p>
                            <p className="text-xs text-[#f68b1e]">-{product.discount}%</p>
                          </div>
                        )}
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
                        {product.seller === "Official Store" && (
                          <span className="bg-blue-600 text-white text-xs px-1 rounded-sm">Express</span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col p-2 gap-1 justify-center">
                      <Button
                        size="sm"
                        className="bg-[#40E0D0] hover:bg-[#3bc9b9] dark:bg-teal-600 dark:hover:bg-teal-700 h-8 text-xs w-full"
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
              className="bg-[#40E0D0] hover:bg-[#3bc9b9] dark:bg-teal-600 dark:hover:bg-teal-700"
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
