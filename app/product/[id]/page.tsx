"use client"

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Heart,
  Share2,
  ShoppingCart,
  Star,
  ChevronRight,
  Truck,
  MessageCircle,
  Plus,
  Minus,
  Store,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

// Mock product data
const products = [
  {
    id: "1",
    name: "Wireless Bluetooth Earbuds",
    price: 49.99,
    originalPrice: 79.99,
    discount: 38,
    rating: 4.8,
    reviews: 1245,
    sold: 5000,
    images: [
      "/placeholder.svg?height=500&width=500&text=Earbuds+1",
      "/placeholder.svg?height=500&width=500&text=Earbuds+2",
      "/placeholder.svg?height=500&width=500&text=Earbuds+3",
    ],
    colors: ["Black", "White", "Blue"],
    description:
      "High-quality wireless earbuds with noise cancellation, touch controls, and long battery life. Perfect for workouts and daily use.",
    specifications: [
      { name: "Battery Life", value: "Up to 24 hours with charging case" },
      { name: "Bluetooth Version", value: "5.2" },
      { name: "Water Resistance", value: "IPX7" },
      { name: "Noise Cancellation", value: "Active Noise Cancellation" },
      { name: "Charging", value: "USB-C and Wireless" },
    ],
    seller: {
      name: "AudioTech Official Store",
      rating: 4.9,
      followers: 25000,
      responseRate: 98,
      shipOnTime: 97,
    },
  },
  {
    id: "2",
    name: "Smart Fitness Watch",
    price: 89.99,
    originalPrice: 129.99,
    discount: 31,
    rating: 4.6,
    reviews: 876,
    sold: 3200,
    images: [
      "/placeholder.svg?height=500&width=500&text=Watch+1",
      "/placeholder.svg?height=500&width=500&text=Watch+2",
      "/placeholder.svg?height=500&width=500&text=Watch+3",
    ],
    colors: ["Black", "Silver", "Rose Gold"],
    description:
      "Track your fitness goals with this advanced smartwatch. Features heart rate monitoring, sleep tracking, and multiple sport modes.",
    specifications: [
      { name: "Display", value: "1.4 inch AMOLED" },
      { name: "Battery Life", value: "Up to 7 days" },
      { name: "Water Resistance", value: "5 ATM" },
      { name: "Sensors", value: "Heart Rate, SpO2, Accelerometer" },
      { name: "Compatibility", value: "iOS 10.0+ / Android 5.0+" },
    ],
    seller: {
      name: "FitGear Official Store",
      rating: 4.7,
      followers: 18000,
      responseRate: 95,
      shipOnTime: 96,
    },
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    price: 39.99,
    originalPrice: 59.99,
    discount: 33,
    rating: 4.5,
    reviews: 632,
    sold: 2800,
    images: [
      "/placeholder.svg?height=500&width=500&text=Speaker+1",
      "/placeholder.svg?height=500&width=500&text=Speaker+2",
      "/placeholder.svg?height=500&width=500&text=Speaker+3",
    ],
    colors: ["Black", "Blue", "Red"],
    description:
      "Powerful portable speaker with rich bass and clear sound. Waterproof design makes it perfect for outdoor activities.",
    specifications: [
      { name: "Battery Life", value: "Up to 12 hours" },
      { name: "Bluetooth Version", value: "5.0" },
      { name: "Water Resistance", value: "IPX7" },
      { name: "Power Output", value: "20W" },
      { name: "Charging", value: "USB-C" },
    ],
    seller: {
      name: "SoundWave Electronics",
      rating: 4.6,
      followers: 15000,
      responseRate: 94,
      shipOnTime: 95,
    },
  },
  {
    id: "4",
    name: "Ultra HD Smart TV",
    price: 499.99,
    originalPrice: 699.99,
    discount: 29,
    rating: 4.7,
    reviews: 423,
    sold: 1500,
    images: [
      "/placeholder.svg?height=500&width=500&text=TV+1",
      "/placeholder.svg?height=500&width=500&text=TV+2",
      "/placeholder.svg?height=500&width=500&text=TV+3",
    ],
    colors: ["Black"],
    description:
      "Experience stunning visuals with this 4K Ultra HD Smart TV. Features built-in streaming apps and voice control.",
    specifications: [
      { name: "Screen Size", value: "55 inches" },
      { name: "Resolution", value: "4K Ultra HD (3840 x 2160)" },
      { name: "Smart Features", value: "Built-in Wi-Fi, Voice Control" },
      { name: "Refresh Rate", value: "120Hz" },
      { name: "Connectivity", value: "4 HDMI, 2 USB, Ethernet" },
    ],
    seller: {
      name: "ElectroVision Store",
      rating: 4.8,
      followers: 22000,
      responseRate: 97,
      shipOnTime: 98,
    },
  },
  {
    id: "5",
    name: "Professional DSLR Camera",
    price: 899.99,
    originalPrice: 1199.99,
    discount: 25,
    rating: 4.9,
    reviews: 312,
    sold: 980,
    images: [
      "/placeholder.svg?height=500&width=500&text=Camera+1",
      "/placeholder.svg?height=500&width=500&text=Camera+2",
      "/placeholder.svg?height=500&width=500&text=Camera+3",
    ],
    colors: ["Black"],
    description:
      "Capture stunning photos and videos with this professional DSLR camera. Includes multiple lenses and accessories.",
    specifications: [
      { name: "Sensor", value: "24.2MP APS-C CMOS" },
      { name: "Video Resolution", value: "4K UHD" },
      { name: "ISO Range", value: "100-25600 (expandable to 51200)" },
      { name: "Autofocus", value: "45-point all cross-type AF system" },
      { name: "Connectivity", value: "Wi-Fi, Bluetooth, NFC" },
    ],
    seller: {
      name: "PhotoPro Official Store",
      rating: 4.9,
      followers: 19000,
      responseRate: 99,
      shipOnTime: 99,
    },
  },
  {
    id: "6",
    name: "Gaming Laptop",
    price: 1299.99,
    originalPrice: 1599.99,
    discount: 19,
    rating: 4.7,
    reviews: 287,
    sold: 850,
    images: [
      "/placeholder.svg?height=500&width=500&text=Laptop+1",
      "/placeholder.svg?height=500&width=500&text=Laptop+2",
      "/placeholder.svg?height=500&width=500&text=Laptop+3",
    ],
    colors: ["Black", "Silver"],
    description:
      "Powerful gaming laptop with high-performance graphics and fast processor. Perfect for gaming and content creation.",
    specifications: [
      { name: "Processor", value: "Intel Core i7-11800H" },
      { name: "Graphics", value: "NVIDIA GeForce RTX 3070" },
      { name: "RAM", value: "16GB DDR4" },
      { name: "Storage", value: "1TB NVMe SSD" },
      { name: "Display", value: "15.6-inch Full HD 144Hz" },
    ],
    seller: {
      name: "GameTech Solutions",
      rating: 4.8,
      followers: 21000,
      responseRate: 96,
      shipOnTime: 97,
    },
  },
]

export default function ProductDetailPage() {
  const router = useRouter()
  const params = useParams()
  const { toast } = useToast()
  const [product, setProduct] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // In a real app, this would fetch product data from an API
    const productId = params?.id as string
    const foundProduct = products.find((p) => p.id === productId)

    if (foundProduct) {
      setProduct(foundProduct)
      setSelectedColor(foundProduct.colors[0])
    }

    setLoading(false)

    // Mark that we're coming from a product page
    sessionStorage.setItem("fromProduct", "true")
  }, [params])

  const handleAddToCart = () => {
    if (!product) return

    try {
      // Get existing cart items from localStorage
      const existingCartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")

      // Add new item to cart
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        color: selectedColor,
        quantity,
      }

      // Check if item already exists in cart
      const existingItemIndex = existingCartItems.findIndex(
        (item: any) => item.id === newItem.id && item.color === newItem.color,
      )

      if (existingItemIndex >= 0) {
        // Update quantity if item already exists
        existingCartItems[existingItemIndex].quantity += quantity
      } else {
        // Add new item if it doesn't exist
        existingCartItems.push(newItem)
      }

      // Save updated cart to localStorage
      localStorage.setItem("cartItems", JSON.stringify(existingCartItems))

      toast({
        title: "Added to cart",
        description: `${quantity} x ${product.name} (${selectedColor})`,
      })
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error",
        description: "Could not add item to cart",
        variant: "destructive",
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
      description: product?.name,
    })
  }

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#40E0D0]"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 p-4 flex flex-col items-center justify-center">
        <h1 className="text-xl font-semibold mb-4">Product not found</h1>
        <Button onClick={() => router.push("/")} className="bg-[#40E0D0] hover:bg-[#40E0D0]/90">
          Return to Home
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <header className="bg-[#40E0D0] text-white sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <button onClick={() => router.back()} className="flex items-center">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div className="flex space-x-4">
            <button onClick={toggleWishlist}>
              <Heart className={`h-6 w-6 ${isWishlisted ? "fill-white" : ""}`} />
            </button>
            <button>
              <Share2 className="h-6 w-6" />
            </button>
            <Link href="/cart">
              <ShoppingCart className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </header>

      {/* Product Images */}
      <div className="bg-white">
        <div className="relative aspect-square">
          <Image
            src={product.images[selectedImage] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div className="flex p-2 overflow-x-auto">
          {product.images.map((image: string, index: number) => (
            <button
              key={index}
              className={`min-w-[60px] h-[60px] relative border-2 rounded mr-2 ${
                selectedImage === index ? "border-[#40E0D0]" : "border-gray-200"
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${product.name} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Product Info */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center mb-2">
          <span className="text-2xl font-bold text-[#DEA818]">${product.price.toFixed(2)}</span>
          <span className="text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
          <span className="ml-2 bg-[#DEA818] text-white text-xs px-2 py-0.5 rounded">{product.discount}% OFF</span>
        </div>

        <h1 className="text-xl font-semibold mb-2">{product.name}</h1>

        <div className="flex items-center text-sm mb-4">
          <div className="flex items-center text-[#DEA818]">
            <Star className="h-4 w-4 fill-[#DEA818]" />
            <span className="ml-1">{product.rating}</span>
          </div>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-500">{product.reviews} Reviews</span>
          <span className="mx-2 text-gray-300">|</span>
          <span className="text-gray-500">{product.sold} Sold</span>
        </div>
      </div>

      {/* Color Selection */}
      <div className="bg-white mt-2 p-4">
        <h2 className="font-medium mb-3">Color</h2>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((color: string) => (
            <button
              key={color}
              onClick={() => setSelectedColor(color)}
              className={`px-4 py-2 border rounded-full ${
                selectedColor === color
                  ? "border-[#40E0D0] text-[#40E0D0] bg-[#40E0D0]/10"
                  : "border-gray-300 text-gray-700"
              }`}
            >
              {color}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity */}
      <div className="bg-white mt-2 p-4">
        <h2 className="font-medium mb-3">Quantity</h2>
        <div className="flex items-center">
          <button
            onClick={decreaseQuantity}
            className="w-10 h-10 border border-gray-300 rounded-l-lg flex items-center justify-center"
          >
            <Minus className="h-4 w-4" />
          </button>
          <div className="w-12 h-10 border-t border-b border-gray-300 flex items-center justify-center">{quantity}</div>
          <button
            onClick={increaseQuantity}
            className="w-10 h-10 border border-gray-300 rounded-r-lg flex items-center justify-center"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Shipping */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-start">
          <Truck className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
          <div>
            <h3 className="font-medium">Shipping</h3>
            <p className="text-sm text-gray-500 mt-1">Free shipping on orders over $50</p>
            <p className="text-sm text-gray-500">Estimated delivery: 3-5 business days</p>
          </div>
        </div>
      </div>

      {/* Seller Info */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <span className="font-semibold">{product.seller.name.charAt(0)}</span>
            </div>
            <div>
              <h3 className="font-medium">{product.seller.name}</h3>
              <div className="flex items-center text-xs text-gray-500">
                <Star className="h-3 w-3 fill-[#DEA818] text-[#DEA818]" />
                <span className="ml-1">{product.seller.rating}</span>
                <span className="mx-1">•</span>
                <span>{product.seller.followers} followers</span>
              </div>
            </div>
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            Follow
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
          <div className="flex items-center">
            <MessageCircle className="h-3 w-3 text-gray-500 mr-1" />
            <span className="text-gray-500">{product.seller.responseRate}% Response</span>
          </div>
          <div className="flex items-center">
            <Truck className="h-3 w-3 text-gray-500 mr-1" />
            <span className="text-gray-500">{product.seller.shipOnTime}% On-time</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="bg-white mt-2 p-4">
        <h2 className="font-medium mb-3">Product Details</h2>
        <p className="text-sm text-gray-700 mb-4">{product.description}</p>

        <h3 className="font-medium mb-2">Specifications</h3>
        <div className="space-y-2">
          {product.specifications.map((spec: any, index: number) => (
            <div key={index} className="flex">
              <span className="text-sm text-gray-500 w-1/3">{spec.name}</span>
              <span className="text-sm text-gray-700 w-2/3">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Customer Reviews ({product.reviews})</h2>
          <Link href={`/product/${product.id}/reviews`} className="text-sm text-[#40E0D0] flex items-center">
            View All
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="flex items-center mb-4">
          <div className="text-3xl font-bold mr-3">{product.rating}</div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-[#DEA818] text-[#DEA818]" : "text-gray-300"}`}
              />
            ))}
          </div>
        </div>

        {/* Sample review */}
        <div className="border-t pt-3">
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-2">
              <span className="text-xs font-semibold">JD</span>
            </div>
            <div>
              <div className="text-sm font-medium">John Doe</div>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-3 w-3 ${i < 5 ? "fill-[#DEA818] text-[#DEA818]" : "text-gray-300"}`} />
                ))}
                <span className="text-xs text-gray-500 ml-2">2 weeks ago</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-700">
            Great product! Exactly as described and arrived quickly. The quality is excellent and I would definitely
            recommend it.
          </p>
        </div>
      </div>

      {/* Similar Products */}
      <div className="bg-white mt-2 p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-medium">Similar Products</h2>
          <Link href="/products/all-products" className="text-sm text-[#40E0D0] flex items-center">
            View More
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-2 -mx-4 px-4">
          {products
            .filter((p) => p.id !== product.id)
            .slice(0, 4)
            .map((p) => (
              <Link href={`/product/${p.id}`} key={p.id} className="min-w-[140px] mr-3">
                <div className="relative aspect-square bg-gray-100 rounded-lg mb-2">
                  <Image
                    src={p.images[0] || "/placeholder.svg"}
                    alt={p.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="text-sm font-medium line-clamp-2">{p.name}</div>
                <div className="text-[#DEA818] font-bold">${p.price.toFixed(2)}</div>
              </Link>
            ))}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex items-center z-10">
        <Link
          href={`/seller/${product.seller.name.replace(/\s+/g, "-").toLowerCase()}`}
          className="flex flex-col items-center px-4"
        >
          <MessageCircle className="h-6 w-6 text-gray-500" />
          <span className="text-xs mt-1">Chat</span>
        </Link>

        <Link
          href={`/seller/${product.seller.name.replace(/\s+/g, "-").toLowerCase()}`}
          className="flex flex-col items-center px-4"
        >
          <Store className="h-6 w-6 text-gray-500" />
          <span className="text-xs mt-1">Shop</span>
        </Link>

        <div className="flex-1 flex ml-2">
          <Button variant="outline" className="flex-1 mr-2 border-[#DEA818] text-[#DEA818]" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <Button className="flex-1 bg-[#DEA818] hover:bg-[#DEA818]/90" onClick={handleBuyNow}>
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
}
