"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Ticket, Copy, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function VouchersPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Sample vouchers data
  const vouchers = [
    {
      id: 1,
      code: "WELCOME20",
      discount: "20% OFF",
      minSpend: "$50",
      validUntil: "Mar 31, 2025",
      status: "active",
    },
    {
      id: 2,
      code: "FREESHIP",
      discount: "Free Shipping",
      minSpend: "$30",
      validUntil: "Apr 15, 2025",
      status: "active",
    },
    {
      id: 3,
      code: "SUMMER10",
      discount: "10% OFF",
      minSpend: "$20",
      validUntil: "Feb 28, 2025",
      status: "expired",
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

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">My Vouchers</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="w-full p-0 h-12 bg-white">
            <TabsTrigger
              value="active"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Active
            </TabsTrigger>
            <TabsTrigger
              value="expired"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Expired
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="mt-0">
            <div className="p-4">
              {vouchers.filter((voucher) => voucher.status === "active").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <Ticket className="h-10 w-10 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No active vouchers</h2>
                  <p className="text-gray-500 mb-6">Check back later for new promotions</p>
                </div>
              ) : (
                vouchers
                  .filter((voucher) => voucher.status === "active")
                  .map((voucher) => (
                    <div
                      key={voucher.id}
                      className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden border border-dashed border-[#DEA818]"
                    >
                      <div className="p-3 bg-[#FEF9E7]">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-lg text-[#DEA818]">{voucher.discount}</h3>
                            <p className="text-sm">Min. spend {voucher.minSpend}</p>
                          </div>
                          <div className="bg-[#DEA818] text-white px-3 py-1 rounded-full text-xs">Valid</div>
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="text-sm font-medium">Code: {voucher.code}</p>
                            <p className="text-xs text-gray-500">Valid until {voucher.validUntil}</p>
                          </div>
                          <button
                            className="bg-gray-100 p-2 rounded-full"
                            onClick={() => copyToClipboard(voucher.code)}
                          >
                            {copiedCode === voucher.code ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <Copy className="h-5 w-5 text-gray-500" />
                            )}
                          </button>
                        </div>

                        <Link href="/">
                          <Button className="w-full mt-3 bg-[#DEA818] hover:bg-[#c99616]">Use Now</Button>
                        </Link>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </TabsContent>

          <TabsContent value="expired" className="mt-0">
            <div className="p-4">
              {vouchers.filter((voucher) => voucher.status === "expired").length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="bg-gray-100 rounded-full p-4 mb-4">
                    <Ticket className="h-10 w-10 text-gray-400" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No expired vouchers</h2>
                  <p className="text-gray-500 mb-6">Your expired vouchers will appear here</p>
                </div>
              ) : (
                vouchers
                  .filter((voucher) => voucher.status === "expired")
                  .map((voucher) => (
                    <div
                      key={voucher.id}
                      className="bg-white rounded-lg shadow-sm mb-3 overflow-hidden border border-dashed border-gray-300"
                    >
                      <div className="p-3 bg-gray-100">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-bold text-lg text-gray-500">{voucher.discount}</h3>
                            <p className="text-sm text-gray-500">Min. spend {voucher.minSpend}</p>
                          </div>
                          <div className="bg-gray-500 text-white px-3 py-1 rounded-full text-xs">Expired</div>
                        </div>
                      </div>

                      <div className="p-3">
                        <div className="flex justify-between items-center">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-500">Code: {voucher.code}</p>
                            <p className="text-xs text-gray-500">Expired on {voucher.validUntil}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
