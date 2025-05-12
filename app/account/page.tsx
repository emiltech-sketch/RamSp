"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  ChevronRight,
  Package,
  Heart,
  Clock,
  Star,
  LogOut,
  Store,
  MapPin,
  MessageCircle,
  Headphones,
  Gift,
  Truck,
  CreditCard,
  User,
} from "lucide-react"
import MobileNavigation from "@/components/mobile-navigation"

export default function AccountPage() {
  const router = useRouter()
  const [cartItemCount, setCartItemCount] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({
    name: "Guest User",
    email: "",
    avatar: "/placeholder.svg?height=80&width=80",
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Check if user is logged in
    try {
      const loggedIn = localStorage.getItem("isLoggedIn") === "true"
      const username = localStorage.getItem("username")
      const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]")
      setIsLoggedIn(loggedIn)
      setCartItemCount(cartItems.length)
      if (username) {
        setUser((prev) => ({ ...prev, name: username }))
      }
    } catch (error) {
      console.error("Error accessing localStorage:", error)
    }
  }, [])

  const handleLogout = () => {
    try {
      localStorage.removeItem("isLoggedIn")
      localStorage.removeItem("username")
      setIsLoggedIn(false)
      setUser({
        name: "Guest User",
        email: "",
        avatar: "/placeholder.svg?height=80&width=80",
      })
      router.push("/")
    } catch (error) {
      console.error("Error during logout:", error)
    }
  }

  if (!isClient) {
    return <div className="p-4">Loading...</div>
  }

  const handleSignIn = () => {
    router.push("/?signin=true")
  }

  return (
    <div className="pb-16 bg-gray-100">
      {/* Header */}
      <div className="bg-[#00B3A6] text-white">
        <div className="p-4">
          <h1 className="text-xl font-semibold">My Account</h1>
        </div>

        {/* User profile section - Kikuu style */}
        <div className="p-4 pb-6">
          <div className="flex items-center">
            <div className="relative w-16 h-16 mr-4">
              <Image
                src={user.avatar || "/placeholder.svg?height=64&width=64"}
                alt="Profile"
                width={64}
                height={64}
                className="rounded-full border-2 border-white"
              />
            </div>
            <div>
              <h2 className="text-lg font-semibold">{user.name}</h2>
              {isLoggedIn ? (
                <div className="flex items-center mt-1">
                  <span className="bg-white text-[#00B3A6] text-xs px-2 py-0.5 rounded-full">Member</span>
                </div>
              ) : (
                <button
                  onClick={handleSignIn}
                  className="bg-white text-[#00B3A6] text-sm px-3 py-1 rounded-full mt-1 font-medium"
                >
                  Sign in / Register
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 py-3">
        {/* My Orders Section - Kikuu style */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-3 border-b flex items-center justify-between">
            <h3 className="font-medium">My Orders</h3>
            <Link href="/account/orders" className="text-sm text-gray-500 flex items-center">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-5 py-3">
            <Link href="/account/orders/processing" className="flex flex-col items-center">
              <div className="relative">
                <CreditCard className="h-6 w-6 text-gray-600 mb-1" />
                <span className="absolute -top-1 -right-1 bg-[#00B3A6] text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                  2
                </span>
              </div>
              <span className="text-xs">To Pay</span>
            </Link>

            <Link href="/account/orders/processing" className="flex flex-col items-center">
              <Truck className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">To Ship</span>
            </Link>

            <Link href="/account/orders/shipped" className="flex flex-col items-center">
              <Package className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">To Receive</span>
            </Link>

            <Link href="/account/reviews" className="flex flex-col items-center">
              <Star className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">To Review</span>
            </Link>

            <Link href="/account/orders" className="flex flex-col items-center">
              <MessageCircle className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">After-sales</span>
            </Link>
          </div>
        </div>

        {/* My Services Section - Kikuu style */}
        <div className="bg-white rounded-lg shadow-sm mb-4">
          <div className="p-3 border-b">
            <h3 className="font-medium">My Services</h3>
          </div>

          <div className="grid grid-cols-4 py-4">
            <Link href="/account/wishlist" className="flex flex-col items-center">
              <Heart className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">Wishlist</span>
            </Link>

            <Link href="/account/followed-seller" className="flex flex-col items-center">
              <Store className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">Followed</span>
            </Link>

            <Link href="/account/recently-viewed" className="flex flex-col items-center">
              <Clock className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">Recently</span>
            </Link>

            <Link href="/account/vouchers" className="flex flex-col items-center">
              <Gift className="h-6 w-6 text-gray-600 mb-1" />
              <span className="text-xs">Vouchers</span>
            </Link>
          </div>
        </div>

        {/* More Services - Kikuu style */}
        <div className="bg-white rounded-lg shadow-sm mb-4 divide-y">
          <Link href="/account/address-book" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-600 mr-3" />
              <span>My Addresses</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/account/settings" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <User className="h-5 w-5 text-gray-600 mr-3" />
              <span>Account Settings</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/help" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Headphones className="h-5 w-5 text-gray-600 mr-3" />
              <span>Help Center</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          <Link href="/account/sell-on-ramsphere" className="flex items-center justify-between p-4">
            <div className="flex items-center">
              <Store className="h-5 w-5 text-gray-600 mr-3" />
              <span>Sell on RamSphere</span>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>

          {isLoggedIn && (
            <button className="w-full flex items-center justify-between p-4 text-left" onClick={handleLogout}>
              <div className="flex items-center">
                <LogOut className="h-5 w-5 text-gray-600 mr-3" />
                <span>Logout</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </button>
          )}
        </div>

        {/* App Version - Kikuu style */}
        <div className="text-center text-gray-500 text-xs mt-6">
          <p>RamSphere App Version 1.0.0</p>
        </div>
      </div>

      <MobileNavigation activeTab="account" onTabChange={() => {}} cartItemCount={cartItemCount} />
    </div>
  )
}
