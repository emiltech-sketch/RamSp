"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import SplashScreen from "@/components/splash-screen"
import WelcomeScreen from "@/components/welcome-screen"
import HomePage from "@/components/home-page"
import SignInScreen from "@/components/sign-in-screen"
import { CartProvider } from "@/components/cart-provider"

export default function Home() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [showWelcome, setShowWelcome] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [firstVisit, setFirstVisit] = useState(true)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)

    // Check if this is the first visit
    try {
      const visited = localStorage.getItem("visited") === "true"
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
      const fromProduct = sessionStorage.getItem("fromProduct") === "true"
      const forceSignIn = searchParams?.get("signin") === "true"

      // If coming back from a product page, skip intro screens
      if (fromProduct) {
        sessionStorage.removeItem("fromProduct")
        setLoading(false)
        setShowWelcome(false)
        setShowSignIn(false)
        setFirstVisit(false)
        return
      }

      setFirstVisit(!visited)

      if (!visited) {
        // First time visitor flow
        const timer = setTimeout(() => {
          setLoading(false)
          setShowWelcome(true)
          localStorage.setItem("visited", "true")
        }, 2000)

        return () => clearTimeout(timer)
      } else if (!isLoggedIn && forceSignIn) {
        // Only show sign-in if explicitly requested
        const timer = setTimeout(() => {
          setLoading(false)
          setShowSignIn(true)
        }, 1000)

        return () => clearTimeout(timer)
      } else {
        // Returning visitor
        const timer = setTimeout(() => {
          setLoading(false)
        }, 1000)

        return () => clearTimeout(timer)
      }
    } catch (error) {
      console.error("Error checking first visit:", error)
      setLoading(false)
    }
  }, [searchParams])

  const handleWelcomeComplete = () => {
    setShowWelcome(false)
    setShowSignIn(true)
  }

  const handleSignInComplete = (username: string) => {
    setShowSignIn(false)
  }

  const handleSkipSignIn = () => {
    setShowSignIn(false)
  }

  // If it's not the first visit, skip splash, welcome, and sign-in screens
  if (isClient && !firstVisit && !loading && !showWelcome && !showSignIn) {
    return (
      <CartProvider>
        <HomePage />
      </CartProvider>
    )
  }

  if (loading) {
    return <SplashScreen onComplete={() => setLoading(false)} />
  }

  if (showWelcome) {
    return <WelcomeScreen onGetStarted={handleWelcomeComplete} />
  }

  if (showSignIn) {
    return <SignInScreen onSignIn={handleSignInComplete} onSkip={handleSkipSignIn} />
  }

  return (
    <CartProvider>
      <HomePage />
    </CartProvider>
  )
}
