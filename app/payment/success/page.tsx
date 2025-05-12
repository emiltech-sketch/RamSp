"use client"

import { useEffect } from "react"
import Link from "next/link"
import { CheckCircle, Package, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function PaymentSuccessPage() {
  const router = useRouter()

  // Sample order details
  const orderDetails = {
    id: "ORD-12345",
    date: "Mar 16, 2025",
    total: "$549.98",
    paymentMethod: "Credit Card",
    estimatedDelivery: "Mar 20-22, 2025",
  }

  useEffect(() => {
    // Confetti effect
    const confetti = () => {
      // This would be a confetti animation in a real app
      console.log("Confetti animation")
    }

    confetti()
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="flex-1 p-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <div className="inline-block bg-green-100 rounded-full p-6 mb-4">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
            <p className="text-gray-600">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
            <h2 className="font-medium mb-4">Order Details</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Order Number</span>
                <span className="font-medium">{orderDetails.id}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span>{orderDetails.date}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Total</span>
                <span>{orderDetails.total}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Payment Method</span>
                <span>{orderDetails.paymentMethod}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Estimated Delivery</span>
                <span>{orderDetails.estimatedDelivery}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <Link href="/account/orders">
              <Button className="w-full bg-[#DEA818] hover:bg-[#c99616]">
                <Package className="h-4 w-4 mr-2" />
                Track Order
              </Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full">
                <Home className="h-4 w-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
