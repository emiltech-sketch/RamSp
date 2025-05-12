"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { X } from "lucide-react"

interface Product {
  id: number
  name: string
  image: string
  price: string
  rating?: number
  reviews?: number
}

interface SearchResultsProps {
  query: string
  onClose: () => void
}

export default function SearchResults({ query, onClose }: SearchResultsProps) {
  const [results, setResults] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  // Sample products database - in a real app, this would come from an API
  const allProducts = [
    {
      id: 1,
      name: "Washing Machine",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
      price: "$500",
      rating: 4.5,
      reviews: 120,
      category: "appliances",
    },
    {
      id: 2,
      name: "Smartphone",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
      price: "$300",
      rating: 4.2,
      reviews: 85,
      category: "electronics",
    },
    {
      id: 3,
      name: "Laptop",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg",
      price: "$800",
      rating: 4.7,
      reviews: 210,
      category: "electronics",
    },
    {
      id: 4,
      name: "Organic Tomatoes",
      image: "/placeholder.svg?height=300&width=300&text=Tomatoes",
      price: "$3.99",
      category: "foodmart",
    },
    {
      id: 5,
      name: "Breakfast Cereal",
      image: "/placeholder.svg?height=300&width=300&text=Cereal",
      price: "$4.49",
      category: "foodmart",
    },
    {
      id: 6,
      name: "Olive Oil",
      image: "/placeholder.svg?height=300&width=300&text=Olive+Oil",
      price: "$8.99",
      category: "foodmart",
    },
    {
      id: 7,
      name: "Headphones",
      image: "/placeholder.svg?height=300&width=300&text=Headphones",
      price: "$99.99",
      rating: 4.3,
      reviews: 156,
      category: "electronics",
    },
    {
      id: 8,
      name: "Smart Watch",
      image: "/placeholder.svg?height=300&width=300&text=Smart+Watch",
      price: "$199.99",
      rating: 4.1,
      reviews: 78,
      category: "electronics",
    },
    {
      id: 9,
      name: "Bluetooth Speaker",
      image: "/placeholder.svg?height=300&width=300&text=Speaker",
      price: "$59.99",
      rating: 4.4,
      reviews: 92,
      category: "electronics",
    },
    {
      id: 10,
      name: "Coffee Maker",
      image: "/placeholder.svg?height=300&width=300&text=Coffee+Maker",
      price: "$79.99",
      rating: 4.6,
      reviews: 103,
      category: "appliances",
    },
  ]

  useEffect(() => {
    if (query.trim() === "") {
      setResults([])
      setLoading(false)
      return
    }

    // Simulate API call with setTimeout
    setLoading(true)
    setTimeout(() => {
      const filteredResults = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setResults(filteredResults)
      setLoading(false)
    }, 500)
  }, [query])

  if (query.trim() === "") return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col">
      <div className="bg-white p-4 flex-1 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Search Results for "{query}"</h2>
          <button onClick={onClose} className="p-2">
            <X className="h-6 w-6" />
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#40E0D0]"></div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">No products found matching "{query}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {results.map((product) => (
              <Link
                href={`/product/${product.id}`}
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100"
                onClick={onClose}
              >
                <div className="relative h-32 w-full">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="p-2">
                  <h3 className="font-medium text-sm">{product.name}</h3>
                  <p className="text-[#DEA818] font-bold text-sm">{product.price}</p>
                  {product.rating && (
                    <div className="flex items-center mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className="text-xs text-yellow-400">
                            {i < Math.floor(product.rating) ? "★" : i < product.rating ? "★" : "☆"}
                          </span>
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
