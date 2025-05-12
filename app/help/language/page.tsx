"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import MobileNavigation from "@/components/mobile-navigation"

export default function LanguagePage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("help")
  const [selectedLanguage, setSelectedLanguage] = useState("English")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "account") {
      router.push("/account")
    }
  }

  const languages = [
    "English",
    "Français",
    "Español",
    "Deutsch",
    "Italiano",
    "Português",
    "Nederlands",
    "Polski",
    "Русский",
    "العربية",
    "हिन्दी",
    "中文",
    "日本語",
    "한국어",
    "Yoruba",
    "Hausa",
    "Igbo",
    "Swahili",
  ]

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language)
    // In a real app, this would update the app's language
    setTimeout(() => {
      router.push("/help")
    }, 500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/help" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Language</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        <div className="bg-white">
          {languages.map((language) => (
            <button
              key={language}
              className="flex items-center justify-between w-full px-4 py-3 border-b border-gray-100"
              onClick={() => handleLanguageSelect(language)}
            >
              <span>{language}</span>
              {selectedLanguage === language && <Check className="h-5 w-5 text-[#DEA818]" />}
            </button>
          ))}
        </div>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
