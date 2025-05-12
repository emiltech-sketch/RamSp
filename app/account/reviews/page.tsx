"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Star, Edit, Trash2 } from "lucide-react"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ReviewsPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  // Sample reviews data
  const reviews = [
    {
      id: 1,
      productId: 1,
      productName: "Washing Machine",
      productImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
      rating: 4,
      comment:
        "Works great! Very quiet and efficient. The only downside is that it takes a bit longer than expected to complete a cycle.",
      date: "Mar 15, 2025",
      status: "published",
    },
    {
      id: 2,
      productId: 2,
      productName: "Smartphone",
      productImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
      rating: 5,
      comment: "Amazing phone! The camera quality is outstanding and battery life is excellent.",
      date: "Mar 10, 2025",
      status: "published",
    },
    {
      id: 3,
      productId: 3,
      productName: "Laptop",
      productImage:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg",
      rating: 3,
      comment: "Decent laptop but overheats sometimes. The performance is good for everyday tasks.",
      date: "Mar 5, 2025",
      status: "pending",
    },
  ]

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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">My Reviews</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        <Tabs defaultValue="published" className="w-full">
          <TabsList className="w-full p-0 h-12 bg-white">
            <TabsTrigger
              value="published"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Published
            </TabsTrigger>
            <TabsTrigger
              value="pending"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Pending
            </TabsTrigger>
          </TabsList>

          <TabsContent value="published" className="mt-0">
            <div className="p-4">
              {reviews
                .filter((review) => review.status === "published")
                .map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
                    <div className="p-3 border-b border-gray-100">
                      <Link href={`/product/${review.productId}`} className="flex items-center">
                        <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                          <Image
                            src={review.productImage || "/placeholder.svg"}
                            alt={review.productName}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.productName}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </Link>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400"
                            fill={i < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

                      <div className="flex justify-end">
                        <button className="text-gray-500 mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-0">
            <div className="p-4">
              {reviews
                .filter((review) => review.status === "pending")
                .map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden">
                    <div className="p-3 border-b border-gray-100">
                      <Link href={`/product/${review.productId}`} className="flex items-center">
                        <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                          <Image
                            src={review.productImage || "/placeholder.svg"}
                            alt={review.productName}
                            fill
                            className="object-contain p-1"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{review.productName}</p>
                          <p className="text-xs text-gray-500">{review.date}</p>
                        </div>
                      </Link>
                    </div>

                    <div className="p-3">
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 text-yellow-400"
                            fill={i < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                        <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                          Pending Review
                        </span>
                      </div>

                      <p className="text-sm text-gray-700 mb-3">{review.comment}</p>

                      <div className="flex justify-end">
                        <button className="text-gray-500 mr-3">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-gray-500">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
