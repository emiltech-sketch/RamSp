"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCart } from "@/components/cart-provider"
import { Star, StarHalf, Filter, ChevronDown, ChevronUp, ShoppingCart, Heart, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  brand: string
  category: string
  discount?: number
  freeShipping?: boolean
  officialStore?: boolean
}

interface CategoryPageProps {
  title: string
  products: Product[]
}

export default function CategoryPage({ title, products }: CategoryPageProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products)
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [sortOption, setSortOption] = useState<string>("popularity")
  const [showFilters, setShowFilters] = useState(false)
  const [showBrandFilter, setShowBrandFilter] = useState(true)
  const [showPriceFilter, setShowPriceFilter] = useState(true)
  const [showRatingFilter, setShowRatingFilter] = useState(true)
  const [showShippingFilter, setShowShippingFilter] = useState(true)
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [freeShippingOnly, setFreeShippingOnly] = useState(false)
  const [officialStoreOnly, setOfficialStoreOnly] = useState(false)

  // Extract unique brands from products
  const brands = [...new Set(products.map((product) => product.brand))]

  useEffect(() => {
    let result = [...products]

    // Apply price filter
    result = result.filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])

    // Apply brand filter
    if (selectedBrands.length > 0) {
      result = result.filter((product) => selectedBrands.includes(product.brand))
    }

    // Apply rating filter
    if (selectedRating !== null) {
      result = result.filter((product) => product.rating >= selectedRating)
    }

    // Apply free shipping filter
    if (freeShippingOnly) {
      result = result.filter((product) => product.freeShipping)
    }

    // Apply official store filter
    if (officialStoreOnly) {
      result = result.filter((product) => product.officialStore)
    }

    // Apply sorting
    switch (sortOption) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price)
        break
      case "price-desc":
        result.sort((a, b) => b.price - a.price)
        break
      case "rating":
        result.sort((a, b) => b.rating - a.rating)
        break
      case "discount":
        result.sort((a, b) => (b.discount || 0) - (a.discount || 0))
        break
      default: // popularity
        // Keep original order which is assumed to be by popularity
        break
    }

    setFilteredProducts(result)
  }, [products, priceRange, selectedBrands, sortOption, selectedRating, freeShippingOnly, officialStoreOnly])

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]))
  }

  const renderRatingStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-orange-500 text-orange-500" />)
    }

    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-orange-500 text-orange-500" />)
    }

    const emptyStars = 5 - stars.length
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />)
    }

    return stars
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">{title}</h1>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Mobile Filter Toggle */}
        <div className="md:hidden mb-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-between"
            onClick={() => setShowFilters(!showFilters)}
          >
            <span className="flex items-center">
              <Filter className="mr-2 h-4 w-4" />
              Filter Products
            </span>
            {showFilters ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
        </div>

        {/* Sidebar Filters */}
        <div className={`w-full md:w-64 ${showFilters ? "block" : "hidden md:block"}`}>
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="border-b pb-2 mb-3">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowPriceFilter(!showPriceFilter)}
              >
                <h3 className="font-semibold">PRICE (₦)</h3>
                {showPriceFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {showPriceFilter && (
                <div className="mt-3">
                  <Slider
                    defaultValue={[priceRange[0], priceRange[1]]}
                    max={1000}
                    step={10}
                    onValueChange={(value) => setPriceRange(value as [number, number])}
                    className="my-6"
                  />
                  <div className="flex justify-between text-sm">
                    <span>₦{priceRange[0]}</span>
                    <span>₦{priceRange[1]}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="border-b pb-2 mb-3">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowBrandFilter(!showBrandFilter)}
              >
                <h3 className="font-semibold">BRAND</h3>
                {showBrandFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {showBrandFilter && (
                <div className="mt-3 max-h-48 overflow-y-auto">
                  {brands.map((brand) => (
                    <div key={brand} className="flex items-center space-x-2 mb-2">
                      <Checkbox
                        id={`brand-${brand}`}
                        checked={selectedBrands.includes(brand)}
                        onCheckedChange={() => toggleBrand(brand)}
                      />
                      <label htmlFor={`brand-${brand}`} className="text-sm cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b pb-2 mb-3">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowRatingFilter(!showRatingFilter)}
              >
                <h3 className="font-semibold">CUSTOMER RATINGS</h3>
                {showRatingFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {showRatingFilter && (
                <div className="mt-3">
                  {[4, 3, 2, 1].map((rating) => (
                    <div
                      key={rating}
                      className="flex items-center space-x-2 mb-2 cursor-pointer"
                      onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}
                    >
                      <div className="flex items-center">
                        {Array(rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                          ))}
                        {Array(5 - rating)
                          .fill(0)
                          .map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-gray-300" />
                          ))}
                        <span className="ml-1 text-sm">{`& Up`}</span>
                      </div>
                      {selectedRating === rating && <Check className="w-4 h-4 text-orange-500" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pb-2">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setShowShippingFilter(!showShippingFilter)}
              >
                <h3 className="font-semibold">SHIPPED FROM</h3>
                {showShippingFilter ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </div>

              {showShippingFilter && (
                <div className="mt-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <Checkbox
                      id="free-shipping"
                      checked={freeShippingOnly}
                      onCheckedChange={(checked) => setFreeShippingOnly(checked === true)}
                    />
                    <label htmlFor="free-shipping" className="text-sm cursor-pointer">
                      Free Shipping
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="official-store"
                      checked={officialStoreOnly}
                      onCheckedChange={(checked) => setOfficialStoreOnly(checked === true)}
                    />
                    <label htmlFor="official-store" className="text-sm cursor-pointer">
                      Official Store
                    </label>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="bg-white rounded-lg shadow-md p-4 mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <p className="text-sm text-gray-600 mb-2 sm:mb-0">{filteredProducts.length} products found</p>
              <div className="flex items-center">
                <span className="text-sm mr-2">Sort by:</span>
                <select
                  className="border rounded-md p-1 text-sm"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Rating</option>
                  <option value="discount">Discount</option>
                </select>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link href={`/product/${product.id}`}>
                  <div className="relative h-40 sm:h-48">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                    {product.discount && (
                      <div className="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
                        -{product.discount}%
                      </div>
                    )}
                    {product.officialStore && (
                      <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
                        Official
                      </div>
                    )}
                  </div>
                </Link>
                <div className="p-3">
                  <Link href={`/product/${product.id}`}>
                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2 h-10 mb-1">{product.name}</h3>
                  </Link>
                  <div className="flex items-center mb-1">{renderRatingStars(product.rating)}</div>
                  <div className="mb-2">
                    <span className="font-bold text-orange-500">₦{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-xs text-gray-500 line-through ml-2">
                        ₦{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  {product.freeShipping && <div className="text-xs text-green-600 mb-2">Free Shipping</div>}
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      <span className="text-xs">Add</span>
                    </Button>
                    <Button size="sm" variant="outline" className="px-2">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-semibold mb-2">No products found</h3>
              <p className="text-gray-600">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
