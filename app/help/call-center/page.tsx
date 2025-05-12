"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Phone, Mail, MessageCircle, Clock, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

export default function CallCenterPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [loading, setLoading] = useState<string | null>(null)

  const handleCallSupport = () => {
    setLoading("call")
    // Simulate call initiation
    setTimeout(() => {
      setLoading(null)
      toast({
        title: "Call initiated",
        description: "Connecting to customer support...",
      })
      // In a real app, this would use the device's phone capabilities
      window.location.href = "tel:+1234567890"
    }, 1000)
  }

  const handleEmailSupport = () => {
    setLoading("email")
    // Simulate email preparation
    setTimeout(() => {
      setLoading(null)
      toast({
        title: "Email prepared",
        description: "Opening email client...",
      })
      // In a real app, this would open the device's email client
      window.location.href = "mailto:support@ramsphere.com"
    }, 1000)
  }

  const handleChatSupport = () => {
    setLoading("chat")
    // Simulate chat initiation
    setTimeout(() => {
      setLoading(null)
      router.push("/help/chat-support")
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] text-white sticky top-0 z-10">
        <div className="container flex items-center p-4">
          <button onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Customer Service</h1>
        </div>
      </header>

      <div className="container p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Contact Us</h2>
          <div className="space-y-4">
            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={handleCallSupport}
              disabled={loading === "call"}
            >
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-full mr-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Call Customer Service</p>
                  <p className="text-sm text-gray-500">Available 24/7</p>
                </div>
              </div>
              {loading === "call" ? (
                <div className="ml-auto animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#40E0D0]"></div>
              ) : (
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={handleEmailSupport}
              disabled={loading === "email"}
            >
              <div className="flex items-center">
                <div className="bg-green-100 p-2 rounded-full mr-3">
                  <Mail className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-gray-500">Response within 24 hours</p>
                </div>
              </div>
              {loading === "email" ? (
                <div className="ml-auto animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#40E0D0]"></div>
              ) : (
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              )}
            </Button>

            <Button
              variant="outline"
              className="w-full justify-start h-auto py-3 px-4"
              onClick={handleChatSupport}
              disabled={loading === "chat"}
            >
              <div className="flex items-center">
                <div className="bg-purple-100 p-2 rounded-full mr-3">
                  <MessageCircle className="h-5 w-5 text-purple-600" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-gray-500">Chat with our support team</p>
                </div>
              </div>
              {loading === "chat" ? (
                <div className="ml-auto animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-[#40E0D0]"></div>
              ) : (
                <ChevronRight className="ml-auto h-5 w-5 text-gray-400" />
              )}
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="text-lg font-semibold mb-4">Support Hours</h2>
          <div className="flex items-start mb-4">
            <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Customer Service</p>
              <p className="text-sm text-gray-500">Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p className="text-sm text-gray-500">Saturday - Sunday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          <div className="flex items-start">
            <Clock className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
            <div>
              <p className="font-medium">Technical Support</p>
              <p className="text-sm text-gray-500">24/7 Support Available</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-4">Help Resources</h2>
          <div className="space-y-3">
            <Link href="/help/faq" className="flex items-center justify-between py-2 border-b">
              <span>Frequently Asked Questions</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link href="/help/shipping-status" className="flex items-center justify-between py-2 border-b">
              <span>Shipping & Delivery</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link href="/help/return-refund" className="flex items-center justify-between py-2 border-b">
              <span>Returns & Refunds</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
            <Link href="/help/privacy-policy" className="flex items-center justify-between py-2">
              <span>Privacy Policy</span>
              <ChevronRight className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
