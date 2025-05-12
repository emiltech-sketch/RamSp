"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Address {
  id: number
  name: string
  phone: string
  address: string
  city: string
  state: string
  country: string
  isDefault: boolean
}

export default function EditAddressPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [addressData, setAddressData] = useState<Address | null>(null)
  const [isDefault, setIsDefault] = useState(false)

  const countries = [
    "Nigeria",
    "Ghana",
    "South Africa",
    "Kenya",
    "Egypt",
    "Tanzania",
    "Ethiopia",
    "Uganda",
    "Cameroon",
    "Senegal",
  ]

  useEffect(() => {
    // In a real app, this would be an API call to fetch the address
    const mockAddresses: Address[] = [
      {
        id: 1,
        name: "John Doe",
        phone: "+234 123 456 7890",
        address: "123 Main Street, Apartment 4B",
        city: "Lagos",
        state: "Lagos State",
        country: "Nigeria",
        isDefault: true,
      },
      {
        id: 2,
        name: "John Doe",
        phone: "+234 098 765 4321",
        address: "456 Business Avenue, Office 7",
        city: "Abuja",
        state: "FCT",
        country: "Nigeria",
        isDefault: false,
      },
    ]

    const addressId = Number.parseInt(params.id)
    const address = mockAddresses.find((a) => a.id === addressId)

    if (address) {
      setAddressData(address)
      setIsDefault(address.isDefault)
    }

    setIsLoading(false)
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // In a real app, this would be an API call to update the address
    setTimeout(() => {
      setIsLoading(false)
      router.push("/account/address-book?updated=true")
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#DEA818]"></div>
        <p className="mt-4 text-gray-600">Loading...</p>
      </div>
    )
  }

  if (!addressData) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-[#40E0D0] shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <Link href="/account/address-book" className="flex items-center">
                <ArrowLeft className="h-5 w-5 text-white mr-2" />
                <span className="text-white font-bold text-lg">Edit Address</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 p-4 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold mb-2">Address Not Found</h2>
            <p className="text-gray-600 mb-4">The address you're trying to edit doesn't exist.</p>
            <Link href="/account/address-book">
              <Button className="bg-[#DEA818] hover:bg-[#c99616]">Back to Address Book</Button>
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
            <Link href="/account/address-book" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Edit Address</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={addressData.name} placeholder="Enter full name" required />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" defaultValue={addressData.phone} placeholder="Enter phone number" required />
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" defaultValue={addressData.address} placeholder="Enter address" required />
              </div>

              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" defaultValue={addressData.city} placeholder="Enter city" required />
              </div>

              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input id="state" defaultValue={addressData.state} placeholder="Enter state or province" required />
              </div>

              <div>
                <Label htmlFor="country">Country</Label>
                <Select defaultValue={addressData.country}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {countries.map((country) => (
                      <SelectItem key={country} value={country}>
                        {country}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="default"
                  checked={isDefault}
                  onCheckedChange={(checked) => setIsDefault(checked as boolean)}
                />
                <Label htmlFor="default">Set as default address</Label>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-[#DEA818] hover:bg-[#c99616]">
            {isLoading ? "Saving..." : "Save Address"}
          </Button>
        </form>
      </div>
    </div>
  )
}
