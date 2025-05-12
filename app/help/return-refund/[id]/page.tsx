"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

export default function ReturnItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [returnReason, setReturnReason] = useState("")
  const [returnMethod, setReturnMethod] = useState("refund")
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  // Sample order data
  const order = {
    id: params.id,
    date: "Mar 15, 2025",
    total: "$499.99",
    items: [
      {
        id: 1,
        name: "Washing Machine",
        image:
          "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
        price: "$499.99",
        quantity: 1,
        returnable: true,
      },
    ],
  }

  const returnReasons = [
    "Item damaged or defective",
    "Wrong item received",
    "Item not as described",
    "Better price available",
    "Item arrived too late",
    "Accidental purchase",
    "Other reason",
  ]

  const toggleItemSelection = (itemId: number) => {
    setSelectedItems((prev) => {
      if (prev.includes(itemId)) {
        return prev.filter((id) => id !== itemId)
      } else {
        return [...prev, itemId]
      }
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (selectedItems.length === 0 || !returnReason) {
      alert("Please select at least one item and provide a reason for return")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/help/return-refund?success=true")
      }, 3000)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/help/return-refund" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Return Items</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-16">
        {isSubmitted ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mb-4">
              <div className="inline-block p-4 rounded-full bg-green-100">
                <Check className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">Return Request Submitted</h2>
            <p className="text-gray-600 mb-4">
              Your return request has been submitted successfully. You will receive a confirmation email with further
              instructions.
            </p>
            <p className="text-sm text-gray-500 mb-4">
              Return Request ID: RET-
              {Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium mb-4">Order #{order.id}</h2>

              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-start">
                    <Checkbox
                      id={`item-${item.id}`}
                      checked={selectedItems.includes(item.id)}
                      onCheckedChange={() => toggleItemSelection(item.id)}
                      className="mt-1 mr-3"
                    />
                    <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div className="flex-1">
                      <Label htmlFor={`item-${item.id}`} className="font-medium text-sm">
                        {item.name}
                      </Label>
                      <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      <p className="text-[#DEA818] font-bold text-sm">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium mb-4">Return Reason</h2>

              <RadioGroup value={returnReason} onValueChange={setReturnReason} className="space-y-3">
                {returnReasons.map((reason) => (
                  <div key={reason} className="flex items-center space-x-2">
                    <RadioGroupItem value={reason} id={`reason-${reason}`} />
                    <Label htmlFor={`reason-${reason}`}>{reason}</Label>
                  </div>
                ))}
              </RadioGroup>

              {returnReason === "Other reason" && (
                <Textarea placeholder="Please specify your reason" className="mt-3" required />
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium mb-4">Return Method</h2>

              <RadioGroup value={returnMethod} onValueChange={setReturnMethod} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="refund" id="refund" />
                  <Label htmlFor="refund">Refund to original payment method</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="exchange" id="exchange" />
                  <Label htmlFor="exchange">Exchange for same item</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="store-credit" id="store-credit" />
                  <Label htmlFor="store-credit">Store credit</Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#DEA818] hover:bg-[#c99616]"
              disabled={isSubmitting || selectedItems.length === 0 || !returnReason}
            >
              {isSubmitting ? "Submitting..." : "Submit Return Request"}
            </Button>
          </form>
        )}
      </div>
    </div>
  )
}
