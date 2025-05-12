"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ChevronRight, Package, Truck, CheckCircle } from "lucide-react"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function OrdersPage() {
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

  // Sample orders data
  const orders = [
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
    {
      id: "ORD-12344",
      date: "Mar 10, 2025",
      status: "Shipped",
      total: "$299.99",
      items: [
        {
          id: 2,
          name: "Smartphone",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
          price: "$299.99",
          quantity: 1,
        },
      ],
    },
    {
      id: "ORD-12343",
      date: "Mar 5, 2025",
      status: "Processing",
      total: "$799.99",
      items: [
        {
          id: 3,
          name: "Laptop",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/laptop.png-4Rvp1LU3tGm6TnCaZU4Qf72zb0HsT6.jpeg",
          price: "$799.99",
          quantity: 1,
        },
      ],
    },
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "Shipped":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "Processing":
        return <Package className="h-5 w-5 text-orange-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">My Orders</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full p-0 h-12 bg-white">
            <TabsTrigger
              value="all"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              All
            </TabsTrigger>
            <TabsTrigger
              value="processing"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Processing
            </TabsTrigger>
            <TabsTrigger
              value="shipped"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Shipped
            </TabsTrigger>
            <TabsTrigger
              value="delivered"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Delivered
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="p-4">
              {orders.map((order) => (
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
                      {getStatusIcon(order.status)}
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
              ))}
            </div>
          </TabsContent>

          <TabsContent value="processing" className="mt-0">
            <div className="p-4">
              {orders
                .filter((order) => order.status === "Processing")
                .map((order) => (
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
                        {getStatusIcon(order.status)}
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
                ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/account/orders/processing" className="text-[#40E0D0] text-sm">
                View All Processing Orders
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="shipped" className="mt-0">
            <div className="p-4">
              {orders
                .filter((order) => order.status === "Shipped")
                .map((order) => (
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
                        {getStatusIcon(order.status)}
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
                ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/account/orders/shipped" className="text-[#40E0D0] text-sm">
                View All Shipped Orders
              </Link>
            </div>
          </TabsContent>

          <TabsContent value="delivered" className="mt-0">
            <div className="p-4">
              {orders
                .filter((order) => order.status === "Delivered")
                .map((order) => (
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
                        {getStatusIcon(order.status)}
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
                ))}
            </div>
            <div className="mt-4 flex justify-center">
              <Link href="/account/orders/delivered" className="text-[#40E0D0] text-sm">
                View All Delivered Orders
              </Link>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
