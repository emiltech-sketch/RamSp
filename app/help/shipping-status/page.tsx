"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Package, Truck, CheckCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import MobileNavigation from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ShippingStatusPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("help")
  const [trackingNumber, setTrackingNumber] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [trackingResult, setTrackingResult] = useState<any>(null)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "account") {
      router.push("/account")
    }
  }

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSearching(true)

    // Simulate API call
    setTimeout(() => {
      setIsSearching(false)
      setTrackingResult({
        orderNumber: "ORD-12345",
        trackingNumber: trackingNumber || "TRK123456789",
        status: "In Transit",
        estimatedDelivery: "Mar 20-22, 2025",
        carrier: "RamSphere Express",
        events: [
          {
            date: "Mar 16, 2025",
            time: "10:30 AM",
            location: "Distribution Center",
            status: "Package in transit",
          },
          {
            date: "Mar 15, 2025",
            time: "2:45 PM",
            location: "Sorting Facility",
            status: "Package processed",
          },
          {
            date: "Mar 15, 2025",
            time: "9:20 AM",
            location: "Warehouse",
            status: "Order shipped",
          },
          {
            date: "Mar 14, 2025",
            time: "4:15 PM",
            location: "Fulfillment Center",
            status: "Order processed",
          },
        ],
        product: {
          name: "Washing Machine",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
        },
      })
    }, 1500)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Order processed":
        return <Package className="h-5 w-5 text-blue-500" />
      case "Order shipped":
        return <Package className="h-5 w-5 text-green-500" />
      case "Package processed":
        return <Package className="h-5 w-5 text-green-500" />
      case "Package in transit":
        return <Truck className="h-5 w-5 text-blue-500" />
      case "Delivered":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Package className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/help" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Shipping Status</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-16">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-medium mb-4">Track Your Order</h2>

          <form onSubmit={handleTrackOrder}>
            <div className="flex space-x-2">
              <Input
                placeholder="Enter tracking or order number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" className="bg-[#DEA818] hover:bg-[#c99616]" disabled={isSearching}>
                {isSearching ? "Searching..." : "Track"}
              </Button>
            </div>
          </form>
        </div>

        {trackingResult && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex items-center mb-4">
              <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                <Image
                  src={trackingResult.product.image || "/placeholder.svg"}
                  alt={trackingResult.product.name}
                  fill
                  className="object-contain p-1"
                />
              </div>
              <div>
                <h3 className="font-medium">{trackingResult.product.name}</h3>
                <p className="text-sm text-gray-500">Order #{trackingResult.orderNumber}</p>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Status</span>
                <span className="font-medium">{trackingResult.status}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Tracking Number</span>
                <span className="font-medium">{trackingResult.trackingNumber}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-gray-500">Carrier</span>
                <span className="font-medium">{trackingResult.carrier}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500">Estimated Delivery</span>
                <span className="font-medium">{trackingResult.estimatedDelivery}</span>
              </div>
            </div>

            <h3 className="font-medium mb-3">Tracking History</h3>
            <div className="space-y-4">
              {trackingResult.events.map((event: any, index: number) => (
                <div key={index} className="flex">
                  <div className="mr-3">{getStatusIcon(event.status)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-medium">{event.status}</span>
                      <span className="text-sm text-gray-500">{event.date}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {event.location} • {event.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!trackingResult && !isSearching && (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mb-4">
              <div className="inline-block p-4 rounded-full bg-gray-100">
                <Package className="h-10 w-10 text-gray-400" />
              </div>
            </div>
            <h3 className="font-medium mb-2">No tracking information</h3>
            <p className="text-sm text-gray-500 mb-4">Enter your tracking or order number to see shipping status</p>
          </div>
        )}
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
