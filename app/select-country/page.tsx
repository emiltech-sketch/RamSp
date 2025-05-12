"use client"

import { useState } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"

export default function SelectCountryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const countries = [
    {
      code: "NG",
      name: "Nigeria",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "GH",
      name: "Ghana",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "EG",
      name: "Egypt",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "KE",
      name: "Kenya",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "ZA",
      name: "South Africa",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "CI",
      name: "Côte d'Ivoire",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "SN",
      name: "Senegal",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "TZ",
      name: "Tanzania",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "UG",
      name: "Uganda",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
    {
      code: "CM",
      name: "Cameroon",
      flag: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
    },
  ]

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleCountrySelect = (code: string) => {
    // Save selected country to localStorage or context
    localStorage.setItem("selectedCountry", code)
    router.push("/")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <span className="text-white font-bold text-lg">Select Country</span>
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="relative mb-4">
          <Input
            placeholder="Search country..."
            className="pl-10 py-2 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>

        <div className="bg-white rounded-lg overflow-hidden">
          {filteredCountries.map((country) => (
            <button
              key={country.code}
              className="flex items-center w-full px-4 py-3 border-b border-gray-100 hover:bg-gray-50"
              onClick={() => handleCountrySelect(country.code)}
            >
              <div className="relative h-8 w-12 mr-3 overflow-hidden rounded">
                <Image src={country.flag || "/placeholder.svg"} alt={country.name} fill className="object-cover" />
              </div>
              <span>{country.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
