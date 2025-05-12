"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Search, Clock, Trash2, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"

export default function RecentlySearchedPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")

  // Sample search history
  const [searchHistory, setSearchHistory] = useState([
    { id: 1, query: "washing machine", timestamp: "Today, 10:30 AM", count: 5 },
    { id: 2, query: "smartphone", timestamp: "Today, 9:15 AM", count: 3 },
    { id: 3, query: "laptop", timestamp: "Yesterday, 3:45 PM", count: 7 },
    { id: 4, query: "refrigerator", timestamp: "Yesterday, 2:20 PM", count: 2 },
    { id: 5, query: "microwave oven", timestamp: "Mar 14, 2025", count: 1 },
    { id: 6, query: "headphones", timestamp: "Mar 13, 2025", count: 4 },
    { id: 7, query: "bluetooth speaker", timestamp: "Mar 12, 2025", count: 2 },
  ])

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const removeSearchItem = (id: number) => {
    setSearchHistory(searchHistory.filter((item) => item.id !== id))
  }

  const clearAllHistory = () => {
    setSearchHistory([])
  }

  const handleSearch = (query: string) => {
    // Navigate to search results page
    router.push(`/search?q=${encodeURIComponent(query)}`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Search History</span>
            </Link>

            {searchHistory.length > 0 && (
              <button className="text-white text-sm" onClick={clearAllHistory}>
                Clear All
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        {searchHistory.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <div className="bg-gray-100 rounded-full p-4 mb-4">
              <Search className="h-10 w-10 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">No search history</h2>
            <p className="text-gray-500 mb-6">Your search history will appear here</p>
            <Link href="/">
              <Button className="bg-[#DEA818] hover:bg-[#c99616]">Start Searching</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white">
            {searchHistory.map((item) => (
              <div key={item.id} className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
                <button className="flex items-center flex-1" onClick={() => handleSearch(item.query)}>
                  <Clock className="h-4 w-4 text-gray-400 mr-3" />
                  <div>
                    <p className="font-medium text-sm">{item.query}</p>
                    <p className="text-xs text-gray-500">{item.timestamp}</p>
                  </div>
                </button>

                <div className="flex items-center">
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full mr-3">
                    {item.count} {item.count === 1 ? "result" : "results"}
                  </span>
                  <button className="text-gray-400 mr-2" onClick={() => handleSearch(item.query)}>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button className="text-gray-400" onClick={() => removeSearchItem(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
