"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, HelpCircle, Truck, RotateCcw, Phone, Globe, Shield, FileText, MessageSquare } from "lucide-react"
import Link from "next/link"
import MobileNavigation from "@/components/mobile-navigation"
import AIChatSupport from "@/components/ai-chat-support"

export default function HelpPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("help")
  const [showChatSupport, setShowChatSupport] = useState(false)
  const [cartItemCount] = useState(0)

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

  const helpCategories = [
    {
      title: "Shipping Status",
      icon: <Truck className="h-6 w-6 text-blue-500" />,
      path: "/help/shipping-status",
    },
    {
      title: "Return & Refund",
      icon: <RotateCcw className="h-6 w-6 text-green-500" />,
      path: "/help/return-refund",
    },
    {
      title: "Call Center",
      icon: <Phone className="h-6 w-6 text-purple-500" />,
      path: "/help/call-center",
    },
    {
      title: "Language",
      icon: <Globe className="h-6 w-6 text-orange-500" />,
      path: "/help/language",
    },
    {
      title: "Country Selection",
      icon: <Globe className="h-6 w-6 text-indigo-500" />,
      path: "/help/country-selection",
    },
    {
      title: "Feedback",
      icon: <MessageSquare className="h-6 w-6 text-pink-500" />,
      path: "/help/feedback",
    },
  ]

  const aboutSection = [
    {
      title: "RamSphere Services",
      icon: <Shield className="h-6 w-6 text-[#DEA818]" />,
      path: "/help/ramsphere-services",
    },
    {
      title: "FAQ",
      icon: <HelpCircle className="h-6 w-6 text-[#DEA818]" />,
      path: "/help/faq",
    },
    {
      title: "Privacy Policy",
      icon: <FileText className="h-6 w-6 text-[#DEA818]" />,
      path: "/help/privacy-policy",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Help Center</h1>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-6">
          <div className="relative w-full h-48 rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[#40E0D0] to-[#DEA818]"></div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
              <h2 className="text-2xl font-bold mb-2 text-center">How can we help you?</h2>
              <p className="text-center mb-4">Our support team is here to assist you with any questions</p>
              <button
                onClick={() => setShowChatSupport(true)}
                className="bg-white text-[#40E0D0] px-4 py-2 rounded-full font-medium flex items-center"
              >
                <MessageSquare className="h-5 w-5 mr-2" />
                Chat with Support
              </button>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Support Categories</h3>
          <div className="grid grid-cols-2 gap-3">
            {helpCategories.map((category, index) => (
              <Link href={category.path} key={index}>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="mb-2">{category.icon}</div>
                  <span className="text-sm font-medium">{category.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">About RamSphere</h3>
          <div className="grid grid-cols-3 gap-3">
            {aboutSection.map((item, index) => (
              <Link href={item.path} key={index}>
                <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col items-center text-center">
                  <div className="mb-2">{item.icon}</div>
                  <span className="text-xs font-medium">{item.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-sm mb-4">
              Our customer service team is available 24/7 to assist you with any questions or concerns.
            </p>
            <div className="space-y-3">
              <a href="tel:+233591917558" className="flex items-center">
                <Phone className="h-5 w-5 text-[#40E0D0] mr-3" />
                <span>+1 800 123 4567</span>
              </a>
              <a href="mailto:support@ramsphere.com" className="flex items-center">
                <MessageSquare className="h-5 w-5 text-[#40E0D0] mr-3" />
                <span>support@ramsphere.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Chat Support Button */}
      <button
        onClick={() => setShowChatSupport(true)}
        className="fixed bottom-20 right-4 bg-[#DEA818] text-white rounded-full p-3 shadow-lg z-10"
      >
        <MessageSquare className="h-6 w-6" />
      </button>

      {/* AI Chat Support Modal */}
      {showChatSupport && <AIChatSupport onClose={() => setShowChatSupport(false)} />}

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} cartItemCount={cartItemCount} />
    </div>
  )
}
