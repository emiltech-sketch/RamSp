"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronRight, CheckCircle } from "lucide-react"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"

export default function DeliveredOrdersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

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

  // Sample delivered orders
  const deliveredOrders = [
    {
      id: "ORD-12345",
      date: "Mar 15, 2025",
      status: "Delivered",
      total: "$499.99",
      items: [
        {
          id: 1,
          name: "Washing Machine",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
          price: "$499.99",
          quantity: 1,
        },
      ],
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account/orders" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Delivered Orders</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16 p-4">
        {deliveredOrders.length > 0 ? (
          deliveredOrders.map((order) => (
            <Link
              href={`/account/orders/${order.id}`}
              key={order.id}
              className="block bg-white rounded-lg shadow-sm mb-3 overflow-hidden"
            >
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="ml-1 text-sm">{order.status}</span>
                  <ChevronRight className="h-4 w-4 text-gray-400 ml-2" />
                </div>
              </div>

              <div className="p-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex mb-2">
                    <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-[#DEA818] font-bold text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}

                <div className="mt-2 pt-2 border-t border-gray-100 flex justify-between">
                  <span className="text-sm">Total:</span>
                  <span className="font-bold">{order.total}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">No delivered orders found</p>
          </div>
        )}
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
