"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Heart, Share2, Star, ShoppingCart, Truck, Shield, RotateCcw, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/hooks/use-toast"
import MobileNavigation from "@/components/mobile-navigation"

// Mock product data - this would typically come from an API
const products = [
  {
    id: "1",
    name: "Wireless Earbuds",
    description: "Premium wireless earbuds with noise cancellation and long battery life.",
    price: 49.99,
    originalPrice: 59.99,
    discount: "20% OFF",
    rating: 4.5,
    reviews: 120,
    images: [
      "/placeholder.svg?height=400&width=400&text=Earbuds+1",
      "/placeholder.svg?height=400&width=400&text=Earbuds+2",
      "/placeholder.svg?height=400&width=400&text=Earbuds+3",
    ],
    colors: ["Black", "White", "Blue"],
    inStock: true,
    specifications: [
      { name: "Battery Life", value: "Up to 8 hours" },
      { name: "Connectivity", value: "Bluetooth 5.0" },
      { name: "Water Resistance", value: "IPX4" },
      { name: "Noise Cancellation", value: "Yes" },
    ],
    seller: {
      id: "seller1",
      name: "AudioTech",
      rating: 4.8,
    },
    tag: "BESTSELLER",
  },
  {
    id: "2",
    name: "Smart Watch",
    description: "Feature-rich smartwatch with health monitoring and notifications.",
    price: 129.99,
    originalPrice: 149.99,
    discount: "15% OFF",
    rating: 4.3,
    reviews: 85,
    images: [
      "/placeholder.svg?height=400&width=400&text=SmartWatch+1",
      "/placeholder.svg?height=400&width=400&text=SmartWatch+2",
      "/placeholder.svg?height=400&width=400&text=SmartWatch+3",
    ],
    colors: ["Black", "Silver", "Rose Gold"],
    inStock: true,
    specifications: [
      { name: "Display", value: "1.4 inch AMOLED" },
      { name: "Battery Life", value: "Up to 7 days" },
      { name: "Water Resistance", value: "5 ATM" },
      { name: "Sensors", value: "Heart rate, SpO2, Accelerometer" },
    ],
    seller: {
      id: "seller2",
      name: "WearableTech",
      rating: 4.6,
    },
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with 360° sound and waterproof design.",
    price: 79.99,
    originalPrice: 89.99,
    discount: "10% OFF",
    rating: 4.7,
    reviews: 210,
    images: [
      "/placeholder.svg?height=400&width=400&text=Speaker+1",
      "/placeholder.svg?height=400&width=400&text=Speaker+2",
      "/placeholder.svg?height=400&width=400&text=Speaker+3",
    ],
    colors: ["Black", "Blue", "Red"],
    inStock: true,
    specifications: [
      { name: "Battery Life", value: "Up to 12 hours" },
      { name: "Connectivity", value: "Bluetooth 5.1" },
      { name: "Water Resistance", value: "IPX7" },
      { name: "Power Output", value: "20W" },
    ],
    seller: {
      id: "seller3",
      name: "SoundMasters",
      rating: 4.9,
    },
    tag: "HOT DEAL",
  },
  {
    id: "4",
    name: "Smartphone",
    description: "High-performance smartphone with advanced camera system and fast processor.",
    price: 499.99,
    originalPrice: 529.99,
    discount: "5% OFF",
    rating: 4.6,
    reviews: 320,
    images: [
      "/placeholder.svg?height=400&width=400&text=Smartphone+1",
      "/placeholder.svg?height=400&width=400&text=Smartphone+2",
      "/placeholder.svg?height=400&width=400&text=Smartphone+3",
    ],
    colors: ["Black", "Silver", "Blue"],
    inStock: true,
    specifications: [
      { name: "Display", value: "6.5 inch AMOLED" },
      { name: "Processor", value: "Octa-core 2.8GHz" },
      { name: "RAM", value: "8GB" },
      { name: "Storage", value: "128GB" },
      { name: "Camera", value: "48MP + 12MP + 8MP" },
      { name: "Battery", value: "4500mAh" },
    ],
    seller: {
      id: "seller4",
      name: "MobileTech",
      rating: 4.7,
    },
  },
  {
    id: "5",
    name: "Laptop",
    description: "Powerful laptop for work and entertainment with long battery life.",
    price: 899.99,
    originalPrice: 999.99,
    discount: "12% OFF",
    rating: 4.4,
    reviews: 150,
    images: [
      "/placeholder.svg?height=400&width=400&text=Laptop+1",
      "/placeholder.svg?height=400&width=400&text=Laptop+2",
      "/placeholder.svg?height=400&width=400&text=Laptop+3",
    ],
    colors: ["Silver", "Space Gray"],
    inStock: true,
    specifications: [
      { name: "Processor", value: "Intel Core i7" },
      { name: "RAM", value: "16GB" },
      { name: "Storage", value: "512GB SSD" },
      { name: "Display", value: "15.6 inch Full HD" },
      { name: "Graphics", value: "NVIDIA GeForce RTX 3050" },
      { name: "Battery Life", value: "Up to 10 hours" },
    ],
    seller: {
      id: "seller5",
      name: "ComputerWorld",
      rating: 4.5,
    },
    tag: "LIMITED",
  },
  {
    id: "6",
    name: "Tablet",
    description: "Versatile tablet for productivity and entertainment on the go.",
    price: 349.99,
    originalPrice: 379.99,
    discount: "8% OFF",
    rating: 4.2,
    reviews: 95,
    images: [
      "/placeholder.svg?height=400&width=400&text=Tablet+1",
      "/placeholder.svg?height=400&width=400&text=Tablet+2",
      "/placeholder.svg?height=400&width=400&text=Tablet+3",
    ],
    colors: ["Silver", "Gold", "Space Gray"],
    inStock: true,
    specifications: [
      { name: "Display", value: "10.9 inch Retina" },
      { name: "Processor", value: "A14 Bionic" },
      { name: "Storage", value: "128GB" },
      { name: "Battery Life", value: "Up to 10 hours" },
      { name: "Camera", value: "12MP rear, 7MP front" },
    ],
    seller: {
      id: "seller6",
      name: "TabletZone",
      rating: 4.3,
    },
  },
  // Flash deals products
  {
    id: "101",
    name: "Wireless Headphones",
    description: "Premium wireless headphones with active noise cancellation and high-fidelity sound.",
    price: 59.99,
    originalPrice: 99.99,
    discount: "40% OFF",
    rating: 4.6,
    reviews: 180,
    images: [
      "/placeholder.svg?height=400&width=400&text=Headphones+1",
      "/placeholder.svg?height=400&width=400&text=Headphones+2",
      "/placeholder.svg?height=400&width=400&text=Headphones+3",
    ],
    colors: ["Black", "Silver", "Blue"],
    inStock: true,
    timeLeft: "2h 15m",
    specifications: [
      { name: "Battery Life", value: "Up to 30 hours" },
      { name: "Connectivity", value: "Bluetooth 5.0" },
      { name: "Noise Cancellation", value: "Active" },
      { name: "Foldable Design", value: "Yes" },
    ],
    seller: {
      id: "seller7",
      name: "AudioElite",
      rating: 4.7,
    },
  },
  // Add more products as needed
]

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const { addToCart } = useCart()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // Mark that we're coming from a product page when navigating back
    try {
      sessionStorage.setItem("fromProduct", "true")
    } catch (error) {
      console.error("Error setting sessionStorage:", error)
    }

    // Find product by ID
    const foundProduct = products.find((p) => p.id === params.id)
    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedColor(foundProduct.colors[0])
    }
    setLoading(false)
  }, [params.id])

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity,
        color: selectedColor,
      })
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    }
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push("/checkout")
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: `${product?.name} has been ${isWishlisted ? "removed from" : "added to"} your wishlist.`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#40E0D0]"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <Button onClick={() => router.push("/")}>Back to Home</Button>
      </div>
    )
  }

  return (
    <div className="pb-16">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-950 border-b">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="flex items-center">
            <ChevronLeft className="h-6 w-6" />
            <span className="ml-2">Back</span>
          </button>
          <div className="flex space-x-4">
            <button onClick={toggleWishlist}>
              <Heart className={`h-6 w-6 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
            </button>
            <button>
              <Share2 className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Images */}
      <div className="relative aspect-square bg-gray-100 dark:bg-gray-800">
        <Image
          src={product.images[selectedImage] || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-contain"
        />
        {product.discount && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {product.discount}
          </div>
        )}
        {product.tag && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white px-2 py-1 rounded-md text-sm font-medium">
            {product.tag}
          </div>
        )}
      </div>

      {/* Thumbnail Images */}
      {product.images.length > 1 && (
        <div className="flex p-2 space-x-2 overflow-x-auto">
          {product.images.map((image: string, index: number) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative w-16 h-16 border-2 rounded-md overflow-hidden ${
                selectedImage === index ? "border-[#40E0D0]" : "border-transparent"
              }`}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Product Info */}
      <div className="p-4 space-y-4">
        <div>
          <h1 className="text-xl font-bold">{product.name}</h1>
          <div className="flex items-center mt-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>

        <div className="flex items-center">
          <span className="text-2xl font-bold text-[#DEA818]">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="ml-2 text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
          )}
          {product.discount && <span className="ml-2 text-black text-sm font-medium">{product.discount}</span>}
        </div>

        {/* Color Selection */}
        {product.colors && product.colors.length > 0 && (
          <div>
            <h3 className="text-sm font-medium mb-2">Color</h3>
            <div className="flex space-x-2">
              {product.colors.map((color: string) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-3 py-1 border rounded-full text-sm ${
                    selectedColor === color
                      ? "border-[#40E0D0] bg-[#40E0D0]/10 text-[#40E0D0]"
                      : "border-gray-300 text-gray-700 dark:text-gray-300"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Quantity */}
        <div>
          <h3 className="text-sm font-medium mb-2">Quantity</h3>
          <div className="flex items-center">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-l-md"
            >
              -
            </button>
            <div className="w-12 h-8 flex items-center justify-center border-t border-b border-gray-300">
              {quantity}
            </div>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-r-md"
            >
              +
            </button>
            <span className="ml-2 text-sm text-gray-500">{product.inStock ? "In Stock" : "Out of Stock"}</span>
          </div>
        </div>

        {/* Seller Info */}
        <div className="flex items-center justify-between py-2 border-t border-b">
          <div className="flex items-center">
            <span className="text-sm">Sold by:</span>
            <Link href={`/seller/${product.seller.id}`} className="ml-1 text-sm font-medium text-[#40E0D0]">
              {product.seller.name}
            </Link>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
            <span className="ml-1 text-sm">{product.seller.rating}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="outline"
            className="border-[#40E0D0] text-[#40E0D0] hover:bg-[#40E0D0]/10"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart
          </Button>
          <Button className="bg-[#DEA818] hover:bg-[#DEA818]/90" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mt-6">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <p className="text-sm text-gray-700 dark:text-gray-300">{product.description}</p>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="space-y-2">
              {product.specifications.map((spec: any, index: number) => (
                <div key={index} className="flex justify-between py-2 border-b border-gray-100 dark:border-gray-800">
                  <span className="text-sm text-gray-600 dark:text-gray-400">{spec.name}</span>
                  <span className="text-sm font-medium">{spec.value}</span>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center">
                  <span className="text-3xl font-bold">{product.rating}</span>
                  <span className="text-sm text-gray-500 ml-1">/ 5</span>
                </div>
                <div className="flex mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 mt-1">{product.reviews} reviews</div>
              </div>
              <Link href={`/products/${product.id}/review`}>
                <Button size="sm" variant="outline" className="text-sm">
                  <MessageCircle className="h-4 w-4 mr-1" />
                  Write a Review
                </Button>
              </Link>
            </div>
            <div className="space-y-4">
              {/* Sample reviews */}
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border-b pb-4">
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-xs font-medium">U{i + 1}</span>
                      </div>
                      <div className="ml-2">
                        <div className="text-sm font-medium">User{i + 1}</div>
                        <div className="flex">
                          {[...Array(5)].map((_, j) => (
                            <Star
                              key={j}
                              className={`h-3 w-3 ${
                                j < 4 + (i % 2) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      {new Date(Date.now() - i * 86400000).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm mt-2">
                    {i === 0
                      ? `Great product! Exactly as described and works perfectly. Very happy with my purchase.`
                      : i === 1
                        ? `Good quality and fast shipping. Would recommend to others.`
                        : `Decent product for the price. Shipping was a bit slow but overall satisfied.`}
                  </p>
                </div>
              ))}
              <Button variant="ghost" className="w-full text-[#40E0D0]">
                View All Reviews
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Shipping & Returns */}
        <div className="space-y-3 mt-6">
          <div className="flex items-start">
            <Truck className="h-5 w-5 mr-3 text-[#40E0D0] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">Free Shipping</h3>
              <p className="text-xs text-gray-500">Free standard shipping on orders over $35</p>
            </div>
          </div>
          <div className="flex items-start">
            <Shield className="h-5 w-5 mr-3 text-[#40E0D0] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">Warranty</h3>
              <p className="text-xs text-gray-500">1 year manufacturer warranty</p>
            </div>
          </div>
          <div className="flex items-start">
            <RotateCcw className="h-5 w-5 mr-3 text-[#40E0D0] flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium">30-Day Returns</h3>
              <p className="text-xs text-gray-500">Return or exchange within 30 days</p>
            </div>
          </div>
        </div>
      </div>

      <MobileNavigation activeTab="home" onTabChange={() => {}} cartItemCount={0} />
    </div>
  )
}
