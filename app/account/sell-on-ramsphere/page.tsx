"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Plus, Package, DollarSign, Users, BarChart2, Camera } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SellOnRamSpherePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Form states
  const [businessName, setBusinessName] = useState("")
  const [businessEmail, setBusinessEmail] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [businessAddress, setBusinessAddress] = useState("")
  const [businessDescription, setBusinessDescription] = useState("")
  const [businessCategory, setBusinessCategory] = useState("")
  const [businessLogo, setBusinessLogo] = useState("/placeholder.svg?height=300&width=300")

  useEffect(() => {
    // Check if the user is already registered as a seller
    const checkSellerStatus = () => {
      // In a real app, this would be an API call
      const isAlreadyRegistered = localStorage.getItem("isRegisteredSeller") === "true"
      setIsRegistered(isAlreadyRegistered)
      setIsLoading(false)
    }

    checkSellerStatus()
  }, [])

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

  const handleLogoUpload = () => {
    // In a real app, this would open the device's camera or gallery
    // For now, we'll just simulate it with a placeholder image
    setBusinessLogo("/placeholder.svg?height=300&width=300&text=Your+Logo")

    // Simulate a file picker dialog in a real app
    alert("In a real app, this would open your device's camera or gallery to select an image")
  }

  const handleRegisterAsSeller = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate form
    if (!businessName || !businessEmail || !phoneNumber || !businessAddress || !businessCategory) {
      alert("Please fill in all required fields")
      setIsLoading(false)
      return
    }

    // In a real app, this would be an API call to register the seller
    setTimeout(() => {
      localStorage.setItem("isRegisteredSeller", "true")
      localStorage.setItem("sellerBusinessName", businessName)
      setIsRegistered(true)
      setIsLoading(false)
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DEA818]"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Sell on RamSphere</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        {!isRegistered ? (
          <div className="p-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-xl font-bold mb-2">Become a Seller</h2>
              <p className="text-gray-600 mb-4">
                Join thousands of sellers and start selling your products to millions of customers on RamSphere.
              </p>

              <form onSubmit={handleRegisterAsSeller}>
                <div className="space-y-4 mb-6">
                  <div className="flex flex-col items-center mb-4">
                    <div
                      className="relative h-24 w-24 bg-gray-100 rounded-full mb-2 overflow-hidden cursor-pointer"
                      onClick={handleLogoUpload}
                    >
                      <Image
                        src={businessLogo || "/placeholder.svg"}
                        alt="Business Logo"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <Camera className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Upload Business Logo</p>
                  </div>

                  <div>
                    <Label htmlFor="businessName">Business Name *</Label>
                    <Input
                      id="businessName"
                      placeholder="Enter your business name"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessEmail">Business Email *</Label>
                    <Input
                      id="businessEmail"
                      type="email"
                      placeholder="Enter your business email"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber">Phone Number *</Label>
                    <Input
                      id="phoneNumber"
                      placeholder="Enter your phone number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessAddress">Business Address *</Label>
                    <Textarea
                      id="businessAddress"
                      placeholder="Enter your business address"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessCategory">Business Category *</Label>
                    <Select value={businessCategory} onValueChange={setBusinessCategory} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fashion">Fashion</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="home-appliances">Home Appliances</SelectItem>
                        <SelectItem value="beauty">Beauty & Personal Care</SelectItem>
                        <SelectItem value="groceries">Groceries</SelectItem>
                        <SelectItem value="phones">Phones & Tablets</SelectItem>
                        <SelectItem value="computers">Computers</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="businessDescription">Business Description</Label>
                    <Textarea
                      id="businessDescription"
                      placeholder="Tell us about your business"
                      rows={4}
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#DEA818] hover:bg-[#c99616]">
                  {isLoading ? "Registering..." : "Register as Seller"}
                </Button>
              </form>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-medium mb-3">Why sell on RamSphere?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Access to millions of customers</li>
                <li>• Simple listing process</li>
                <li>• Secure payments</li>
                <li>• Dedicated seller support</li>
                <li>• Powerful analytics tools</li>
                <li>• Low commission fees</li>
              </ul>
            </div>
          </div>
        ) : (
          <div>
            <Tabs defaultValue="dashboard" className="w-full">
              <TabsList className="w-full p-0 h-12 bg-white">
                <TabsTrigger
                  value="dashboard"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger
                  value="products"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
                >
                  Products
                </TabsTrigger>
                <TabsTrigger
                  value="orders"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
                >
                  Orders
                </TabsTrigger>
                <TabsTrigger
                  value="analytics"
                  className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
                >
                  Analytics
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="mt-0">
                <div className="p-4">
                  <div className="flex items-center mb-4">
                    <div className="relative h-12 w-12 bg-gray-100 rounded-full mr-3 overflow-hidden">
                      <Image
                        src={businessLogo || "/placeholder.svg"}
                        alt="Business Logo"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="font-bold">{localStorage.getItem("sellerBusinessName") || "Your Business"}</h2>
                      <p className="text-sm text-gray-500">Seller account</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <Card className="bg-white">
                      <CardContent className="p-3 flex flex-col items-center">
                        <Package className="h-6 w-6 text-[#DEA818] mb-1" />
                        <span className="text-2xl font-bold">0</span>
                        <span className="text-xs text-gray-500">Products</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardContent className="p-3 flex flex-col items-center">
                        <DollarSign className="h-6 w-6 text-[#DEA818] mb-1" />
                        <span className="text-2xl font-bold">$0</span>
                        <span className="text-xs text-gray-500">Revenue</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardContent className="p-3 flex flex-col items-center">
                        <Users className="h-6 w-6 text-[#DEA818] mb-1" />
                        <span className="text-2xl font-bold">0</span>
                        <span className="text-xs text-gray-500">Customers</span>
                      </CardContent>
                    </Card>
                    <Card className="bg-white">
                      <CardContent className="p-3 flex flex-col items-center">
                        <BarChart2 className="h-6 w-6 text-[#DEA818] mb-1" />
                        <span className="text-2xl font-bold">0</span>
                        <span className="text-xs text-gray-500">Orders</span>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                    <h3 className="font-medium mb-3">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        className="flex flex-col items-center justify-center h-20"
                        onClick={() => router.push("/account/sell-on-ramsphere/add-product")}
                      >
                        <Plus className="h-5 w-5 mb-1" />
                        <span className="text-xs">Add Product</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center justify-center h-20">
                        <BarChart2 className="h-5 w-5 mb-1" />
                        <span className="text-xs">View Analytics</span>
                      </Button>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <h3 className="font-medium mb-3">Recent Activity</h3>
                    <div className="text-center py-6 text-gray-500">
                      <p>No recent activity</p>
                      <p className="text-sm">Start selling to see your activity here</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="products" className="mt-0">
                <div className="p-4">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="font-bold">My Products</h2>
                    <Button
                      size="sm"
                      className="bg-[#DEA818] hover:bg-[#c99616]"
                      onClick={() => router.push("/account/sell-on-ramsphere/add-product")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Product
                    </Button>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-4 rounded-full bg-gray-100">
                        <Package className="h-10 w-10 text-gray-400" />
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">No products yet</h3>
                    <p className="text-sm text-gray-500 mb-4">Start adding products to your store</p>
                    <Button
                      className="bg-[#DEA818] hover:bg-[#c99616]"
                      onClick={() => router.push("/account/sell-on-ramsphere/add-product")}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Your First Product
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="orders" className="mt-0">
                <div className="p-4">
                  <h2 className="font-bold mb-4">Orders</h2>

                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-4 rounded-full bg-gray-100">
                        <Package className="h-10 w-10 text-gray-400" />
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">No orders yet</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Orders from customers will appear here once you start selling
                    </p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="mt-0">
                <div className="p-4">
                  <h2 className="font-bold mb-4">Analytics</h2>

                  <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                    <div className="mb-4">
                      <div className="inline-block p-4 rounded-full bg-gray-100">
                        <BarChart2 className="h-10 w-10 text-gray-400" />
                      </div>
                    </div>
                    <h3 className="font-medium mb-2">No data available</h3>
                    <p className="text-sm text-gray-500 mb-4">
                      Start selling to see analytics and insights about your business
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
