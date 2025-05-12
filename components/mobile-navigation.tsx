"use client"

import { Home, Grid, ShoppingCart, User, HelpCircle } from "lucide-react"

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
  cartItemCount?: number
}

export default function MobileNavigation({ activeTab, onTabChange, cartItemCount = 0 }: MobileNavigationProps) {
  const handleTabClick = (tab: string) => {
    onTabChange(tab)
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-30">
      <div className="flex justify-around items-center h-16">
        <button
          onClick={() => handleTabClick("home")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "home" ? "text-[#40E0D0]" : "text-gray-500"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </button>
        <button
          onClick={() => handleTabClick("categories")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "categories" ? "text-[#40E0D0]" : "text-gray-500"
          }`}
        >
          <Grid className="h-6 w-6" />
          <span className="text-xs mt-1">Categories</span>
        </button>
        <button
          onClick={() => handleTabClick("cart")}
          className={`flex flex-col items-center justify-center w-full h-full relative ${
            activeTab === "cart" ? "text-[#40E0D0]" : "text-gray-500"
          }`}
        >
          <ShoppingCart className="h-6 w-6" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-1/4 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
          <span className="text-xs mt-1">Cart</span>
        </button>
        <button
          onClick={() => handleTabClick("account")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "account" ? "text-[#40E0D0]" : "text-gray-500"
          }`}
        >
          <User className="h-6 w-6" />
          <span className="text-xs mt-1">Account</span>
        </button>
        <button
          onClick={() => handleTabClick("help")}
          className={`flex flex-col items-center justify-center w-full h-full ${
            activeTab === "help" ? "text-[#40E0D0]" : "text-gray-500"
          }`}
        >
          <HelpCircle className="h-6 w-6" />
          <span className="text-xs mt-1">Help</span>
        </button>
      </div>
    </div>
  )
}
