"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Plus, MapPin, Home, Briefcase, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import GoogleMaps from "@/components/google-maps"

interface Address {
  id: string
  name: string
  address: string
  city: string
  state: string
  zip: string
  isDefault: boolean
  type: "home" | "work" | "other"
  coordinates?: { lat: number; lng: number }
}

export default function AddressBookPage() {
  const router = useRouter()
  const [showAddAddress, setShowAddAddress] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number; address: string } | null>(null)
  const [newAddress, setNewAddress] = useState<Partial<Address>>({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    isDefault: false,
    type: "home",
  })

  // Sample addresses - in a real app, these would come from an API
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: "address1",
      name: "Home",
      address: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      isDefault: true,
      type: "home",
      coordinates: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: "address2",
      name: "Work",
      address: "456 Office Park",
      city: "New York",
      state: "NY",
      zip: "10002",
      isDefault: false,
      type: "work",
      coordinates: { lat: 40.758, lng: -73.9855 },
    },
  ])

  const handleAddAddress = () => {
    if (selectedLocation) {
      const newAddressEntry: Address = {
        id: `address${addresses.length + 1}`,
        name: newAddress.name || "New Address",
        address: selectedLocation.address,
        city: newAddress.city || "",
        state: newAddress.state || "",
        zip: newAddress.zip || "",
        isDefault: newAddress.isDefault || false,
        type: newAddress.type || "home",
        coordinates: { lat: selectedLocation.lat, lng: selectedLocation.lng },
      }

      // If this is the first address or marked as default, update other addresses
      if (newAddressEntry.isDefault) {
        setAddresses(addresses.map((addr) => ({ ...addr, isDefault: false })))
      }

      setAddresses([...addresses, newAddressEntry])
      setShowAddAddress(false)
      setNewAddress({
        name: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        isDefault: false,
        type: "home",
      })
      setSelectedLocation(null)
    }
  }

  const handleDeleteAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id))
  }

  const handleEditAddress = (id: string) => {
    router.push(`/account/address-book/edit/${id}`)
  }

  const handleSetDefault = (id: string) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      })),
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] p-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/account" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">Address Book</h1>
        </div>
      </header>

      <div className="p-4">
        {!showAddAddress ? (
          <>
            <Button
              onClick={() => setShowAddAddress(true)}
              className="w-full mb-4 bg-[#40E0D0] hover:bg-[#3bc9bb] text-white"
            >
              <Plus className="h-4 w-4 mr-2" /> Add New Address
            </Button>

            <div className="space-y-3">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`bg-white p-4 rounded-lg shadow-sm relative ${
                    address.isDefault ? "border-2 border-[#40E0D0]" : ""
                  }`}
                >
                  <div className="flex items-start">
                    <div
                      className={`h-10 w-10 rounded-full flex items-center justify-center mr-3 ${
                        address.type === "home"
                          ? "bg-blue-100 text-blue-600"
                          : address.type === "work"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {address.type === "home" ? (
                        <Home className="h-5 w-5" />
                      ) : address.type === "work" ? (
                        <Briefcase className="h-5 w-5" />
                      ) : (
                        <MapPin className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{address.name}</h3>
                        {address.isDefault && (
                          <span className="text-xs bg-[#40E0D0] bg-opacity-20 text-[#40E0D0] px-2 py-0.5 rounded">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-700 mt-1">{address.address}</p>
                      <p className="text-sm text-gray-700">
                        {address.city}, {address.state} {address.zip}
                      </p>
                    </div>
                  </div>

                  <div className="flex mt-3 pt-3 border-t border-gray-100">
                    <button
                      onClick={() => handleEditAddress(address.id)}
                      className="flex items-center text-sm text-gray-600 mr-4"
                    >
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="flex items-center text-sm text-red-600 mr-4"
                    >
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </button>
                    {!address.isDefault && (
                      <button
                        onClick={() => handleSetDefault(address.id)}
                        className="flex items-center text-sm text-[#40E0D0] ml-auto"
                      >
                        Set as default
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Add New Address</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Address Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Home, Work, etc."
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newAddress.name}
                  onChange={(e) => setNewAddress({ ...newAddress, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Location on Map</label>
                <GoogleMaps
                  onSelectLocation={(location) => setSelectedLocation(location)}
                  initialLocation={
                    selectedLocation ? { lat: selectedLocation.lat, lng: selectedLocation.lng } : undefined
                  }
                />
              </div>

              {selectedLocation && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selected Address</label>
                  <div className="p-3 bg-gray-50 rounded-md text-sm">{selectedLocation.address}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newAddress.city}
                    onChange={(e) => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State
                  </label>
                  <input
                    type="text"
                    id="state"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    value={newAddress.state}
                    onChange={(e) => setNewAddress({ ...newAddress, state: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={newAddress.zip}
                  onChange={(e) => setNewAddress({ ...newAddress, zip: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address Type</label>
                <div className="flex space-x-3">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      checked={newAddress.type === "home"}
                      onChange={() => setNewAddress({ ...newAddress, type: "home" })}
                      className="mr-2"
                    />
                    Home
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      checked={newAddress.type === "work"}
                      onChange={() => setNewAddress({ ...newAddress, type: "work" })}
                      className="mr-2"
                    />
                    Work
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="addressType"
                      checked={newAddress.type === "other"}
                      onChange={() => setNewAddress({ ...newAddress, type: "other" })}
                      className="mr-2"
                    />
                    Other
                  </label>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={newAddress.isDefault}
                  onChange={(e) => setNewAddress({ ...newAddress, isDefault: e.target.checked })}
                  className="mr-2"
                />
                <label htmlFor="isDefault" className="text-sm">
                  Set as default address
                </label>
              </div>

              <div className="flex space-x-3">
                <Button onClick={() => setShowAddAddress(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
                <Button
                  onClick={handleAddAddress}
                  className="flex-1 bg-[#DEA818] hover:bg-[#c99616]"
                  disabled={!selectedLocation}
                >
                  Save Address
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
