"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin, Home, Store, Truck, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface Address {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  isDefault: boolean
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, getCartTotal } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState("home")
  const [selectedAddress, setSelectedAddress] = useState("address1")
  const [isProcessing, setIsProcessing] = useState(false)

  // Sample addresses - in a real app, these would come from an API
  const addresses: Address[] = [
    {
      id: "address1",
      name: "Home",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true,
    },
    {
      id: "address2",
      name: "Work",
      address: "456 Office Park",
      city: "New York",
      state: "NY",
      zip: "10002",
      isDefault: false,
    },
  ]

  const handleProceedToPayment = () => {
    setIsProcessing(true)
    // Navigate to payment page
    setTimeout(() => {
      router.push("/payment")
    }, 1000)
  }

  // Sample order summary
  const orderSummary = {
    subtotal: getCartTotal(),
    shipping: 0,
    tax: getCartTotal() * 0.1,
    get total() {
      return this.subtotal + this.shipping + this.tax
    },
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-[#40E0D0] shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <Link href="/cart" className="flex items-center">
                <ArrowLeft className="h-5 w-5 text-white mr-2" />
                <span className="text-white font-bold text-lg">Checkout</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 py-8 flex flex-col items-center justify-center">
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">You need to add items to your cart before checkout.</p>
            <Link href="/">
              <Button className="bg-[#DEA818] hover:bg-[#c99616]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/cart" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Checkout</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-32">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-medium mb-4">Delivery Method</h2>
          <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="space-y-3">
            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="home" id="home" />
              <Label htmlFor="home" className="flex items-center cursor-pointer">
                <Home className="h-5 w-5 mr-2 text-[#40E0D0]" />
                <div>
                  <p className="font-medium">Home Delivery</p>
                  <p className="text-sm text-gray-500">Delivery within 3-5 business days</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="express" id="express" />
              <Label htmlFor="express" className="flex items-center cursor-pointer">
                <Truck className="h-5 w-5 mr-2 text-[#DEA818]" />
                <div>
                  <p className="font-medium">Express Delivery</p>
                  <p className="text-sm text-gray-500">Delivery within 24 hours (additional fee)</p>
                </div>
              </Label>
            </div>

            <div className="flex items-center space-x-2 border p-3 rounded-md">
              <RadioGroupItem value="pickup" id="pickup" />
              <Label htmlFor="pickup" className="flex items-center cursor-pointer">
                <Store className="h-5 w-5 mr-2 text-blue-500" />
                <div>
                  <p className="font-medium">Store Pickup</p>
                  <p className="text-sm text-gray-500">Collect from your nearest store</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {(deliveryMethod === "home" || deliveryMethod === "express") && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-medium">Delivery Address</h2>
              <Button
                variant="outline"
                size="sm"
                className="text-[#40E0D0] border-[#40E0D0]"
                onClick={() => router.push("/account/address-book")}
              >
                Add New
              </Button>
            </div>

            <RadioGroup value={selectedAddress} onValueChange={setSelectedAddress} className="space-y-3">
              {addresses.map((address) => (
                <div key={address.id} className="flex items-center space-x-2 border p-3 rounded-md">
                  <RadioGroupItem value={address.id} id={address.id} />
                  <Label htmlFor={address.id} className="flex items-start cursor-pointer w-full">
                    <MapPin className="h-5 w-5 mr-2 text-[#40E0D0] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium">{address.name}</p>
                        {address.isDefault && <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Default</span>}
                      </div>
                      <p className="text-sm text-gray-700">{address.address}</p>
                      <p className="text-sm text-gray-700">
                        {address.city}, {address.state} {address.zip}
                      </p>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {deliveryMethod === "pickup" && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-medium mb-3">Pickup Location</h2>
            <div className="border p-3 rounded-md">
              <p className="font-medium">RamSphere Store - Downtown</p>
              <p className="text-sm text-gray-700">789 Retail Avenue</p>
              <p className="text-sm text-gray-700">New York, NY 10003</p>
              <p className="text-sm text-gray-500 mt-2">Open: 9:00 AM - 9:00 PM</p>
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-medium mb-3">Order Summary</h2>

          <div className="space-y-3">
            {cart.map((item) => (
              <div key={item.id} className="flex items-start py-2 border-b border-gray-100">
                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 mr-3">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{item.name}</h3>
                  <div className="flex justify-between mt-1">
                    <span className="text-sm text-gray-500">Qty: {item.quantity || 1}</span>
                    <span className="text-[#DEA818] font-bold">${(item.price * (item.quantity || 1)).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${orderSummary.subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{orderSummary.shipping === 0 ? "Free" : `$${orderSummary.shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${orderSummary.tax.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>${orderSummary.total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <Button
          onClick={handleProceedToPayment}
          className="w-full bg-[#DEA818] hover:bg-[#c99616]"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center">
              <Check className="animate-spin mr-2 h-4 w-4" />
              Processing...
            </span>
          ) : (
            "Proceed to Payment"
          )}
        </Button>
      </div>
    </div>
  )
}
