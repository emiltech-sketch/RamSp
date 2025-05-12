"use client"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from "@/components/cart-provider"

// Sample product data
const products = [
  {
    id: 1,
    name: "Leather Backpack",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "A stylish and durable leather backpack perfect for everyday use.",
  },
  {
    id: 2,
    name: "Wireless Headphones",
    price: 129.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Premium wireless headphones with noise cancellation technology.",
  },
  {
    id: 3,
    name: "Smart Watch",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Track your fitness and stay connected with this feature-packed smart watch.",
  },
  {
    id: 4,
    name: "Portable Charger",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "High-capacity portable charger to keep your devices powered on the go.",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: 89.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Waterproof bluetooth speaker with amazing sound quality.",
  },
  {
    id: 6,
    name: "Laptop Sleeve",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    description: "Protect your laptop with this padded sleeve featuring a modern design.",
  },
]

export default function ProductGrid() {
  const { addToCart } = useCart()

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden dark:bg-gray-800 dark:border-gray-700">
          <Link href={`/product/${product.id}`}>
            <div className="aspect-square overflow-hidden">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={300}
                className="h-full w-full object-cover transition-transform hover:scale-105"
              />
            </div>
          </Link>
          <CardContent className="p-4">
            <Link href={`/product/${product.id}`}>
              <h3 className="text-lg font-semibold dark:text-white">{product.name}</h3>
            </Link>
            <p className="mt-2 text-lg font-bold text-[#DEA818]">${product.price.toFixed(2)}</p>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Button
              onClick={() => addToCart(product)}
              className="w-full bg-[#DEA818] hover:bg-[#c99616] dark:bg-amber-600 dark:hover:bg-amber-700"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
