"use client"

import { useState } from "react"
import { X, MapPin, Home, Store, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
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

interface DeliveryOptionsProps {
  onClose: () => void
}

export default function DeliveryOptions({ onClose }: DeliveryOptionsProps) {
  const router = useRouter()
  const [deliveryMethod, setDeliveryMethod] = useState("home")
  const [selectedAddress, setSelectedAddress] = useState("address1")

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

  const handleContinue = () => {
    // In a real app, this would save the delivery preferences
    router.push("/payment")
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md max-h-[90vh] flex flex-col">
        <div className="p-4 bg-[#40E0D0] text-white rounded-t-lg flex justify-between items-center">
          <h2 className="font-semibold">Delivery Options</h2>
          <button onClick={onClose} className="text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          <div>
            <h3 className="font-medium mb-3">Select Delivery Method</h3>
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
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Delivery Address</h3>
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
                          {address.isDefault && (
                            <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">Default</span>
                          )}
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
            <div>
              <h3 className="font-medium mb-3">Select Pickup Location</h3>
              <div className="border p-3 rounded-md">
                <p className="font-medium">RamSphere Store - Downtown</p>
                <p className="text-sm text-gray-700">789 Retail Avenue</p>
                <p className="text-sm text-gray-700">New York, NY 10003</p>
                <p className="text-sm text-gray-500 mt-2">Open: 9:00 AM - 9:00 PM</p>
              </div>
            </div>
          )}
        </div>

        <div className="p-4 border-t">
          <Button onClick={handleContinue} className="w-full bg-[#DEA818] hover:bg-[#c99616]">
            Continue to Payment
          </Button>
        </div>
      </div>
    </div>
  )
}
