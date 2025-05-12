"use client"

import { useState, useEffect } from "react"
import { Check, ChevronDown } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Language {
  code: string
  name: string
  flag: string
}

const languages: Language[] = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
  { code: "pt", name: "Português", flag: "🇧🇷" },
  { code: "ru", name: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "日本語", flag: "🇯🇵" },
]

export function useLanguage() {
  const [language, setLanguage] = useState<Language>(languages[0])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    // Load saved language preference from localStorage
    try {
      const savedLang = localStorage.getItem("language")
      if (savedLang) {
        const lang = languages.find((l) => l.code === savedLang)
        if (lang) setLanguage(lang)
      }
    } catch (error) {
      console.error("Failed to load language preference:", error)
    }
  }, [])

  const changeLanguage = (lang: Language) => {
    setLanguage(lang)
    if (isClient) {
      try {
        localStorage.setItem("language", lang.code)
      } catch (error) {
        console.error("Failed to save language preference:", error)
      }
    }
  }

  return { language, changeLanguage, isClient }
}

export default function LanguageSelector() {
  const { language, changeLanguage, isClient } = useLanguage()
  const router = useRouter()

  // Don't render anything during SSR
  if (!isClient) {
    return (
      <Button variant="ghost" size="sm" className="h-8 text-white">
        <span className="mr-1">🇺🇸</span>
        <span className="hidden sm:inline">English</span>
        <ChevronDown className="ml-1 h-4 w-4" />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 text-white">
          <span className="mr-1">{language.flag}</span>
          <span className="hidden sm:inline">{language.name}</span>
          <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => {
              changeLanguage(lang)
              // Refresh the page to apply language changes
              router.refresh()
            }}
            className="flex items-center justify-between"
          >
            <span>
              {lang.flag} {lang.name}
            </span>
            {language.code === lang.code && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
