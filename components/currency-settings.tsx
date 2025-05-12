"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { Check } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CurrencyOption {
  code: string
  symbol: string
  name: string
}

interface CurrencySettingsProps {
  currentCurrency: CurrencyOption
  onSelect: (currency: CurrencyOption) => void
}

export default function CurrencySettings({ currentCurrency, onSelect }: CurrencySettingsProps) {
  const [isOpen, setIsOpen] = useState(false)

  const currencies: CurrencyOption[] = [
    { code: "USD", symbol: "$", name: "US Dollar" },
    { code: "EUR", symbol: "€", name: "Euro" },
    { code: "GBP", symbol: "£", name: "British Pound" },
    { code: "JPY", symbol: "¥", name: "Japanese Yen" },
    { code: "NGN", symbol: "₦", name: "Nigerian Naira" },
    { code: "GHS", symbol: "₵", name: "Ghanaian Cedi" },
    { code: "KES", symbol: "KSh", name: "Kenyan Shilling" },
    { code: "ZAR", symbol: "R", name: "South African Rand" },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center text-white text-sm">
          {currentCurrency.code} ({currentCurrency.symbol})
          <ChevronDown className="ml-1 h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {currencies.map((currency) => (
          <DropdownMenuItem
            key={currency.code}
            className="flex items-center justify-between"
            onClick={() => {
              onSelect(currency)
            }}
          >
            <span>
              {currency.code} ({currency.symbol})
            </span>
            {currentCurrency.code === currency.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
