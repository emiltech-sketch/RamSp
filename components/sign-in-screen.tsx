"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff } from "lucide-react"
import { Separator } from "@/components/ui/separator"

interface SignInScreenProps {
  onSignIn?: (username: string) => void
  onSkip?: (guestName?: string) => void
}

export default function SignInScreen({ onSignIn, onSkip }: SignInScreenProps) {
  const router = useRouter()
  const [isSignUp, setIsSignUp] = useState(false)
  const [emailOrPhone, setEmailOrPhone] = useState("")
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Ensure we're on the client side
  useEffect(() => {
    setIsClient(true)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (isSignUp) {
        // Validate form
        if (!emailOrPhone || !password || !username || !confirmPassword) {
          throw new Error("All fields are required")
        }

        if (password !== confirmPassword) {
          throw new Error("Passwords do not match")
        }

        // Store user info in localStorage
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("username", username)
        localStorage.setItem("userEmail", emailOrPhone)

        // Redirect or callback
        if (onSignIn) {
          onSignIn(username)
        } else {
          router.push("/")
        }
      } else {
        // Validate form
        if (!emailOrPhone || !password) {
          throw new Error("Email/phone and password are required")
        }

        // Store user info in localStorage
        const displayName = username || (emailOrPhone.includes("@") ? emailOrPhone.split("@")[0] : emailOrPhone)
        localStorage.setItem("isLoggedIn", "true")
        localStorage.setItem("username", displayName)
        localStorage.setItem("userEmail", emailOrPhone)

        // Redirect or callback
        if (onSignIn) {
          onSignIn(displayName)
        } else {
          router.push("/")
        }
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSocialSignIn = (provider: "google" | "apple" | "facebook") => {
    setError(null)
    setLoading(true)

    try {
      // Mock social authentication
      const displayName = provider === "google" ? "Google User" : provider === "apple" ? "Apple User" : "Facebook User"
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("username", displayName)

      // Redirect or callback
      if (onSignIn) {
        onSignIn(displayName)
      } else {
        router.push("/")
      }
    } catch (error: any) {
      setError("Authentication failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const handleSkip = () => {
    if (onSkip) {
      onSkip("Guest User")
    } else {
      router.push("/")
    }
  }

  // Don't render anything until we're on the client side
  if (!isClient) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-center items-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col justify-center p-8">
        <div className="flex justify-center mb-8">
          <div className="relative h-16 w-16">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-wjDSju0zJt1TdulWpb6FPeZ235IGXT.png"
              alt="RamSphere Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-center mb-6">{isSignUp ? "Create an Account" : "Welcome Back"}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          )}

          <div>
            <label htmlFor="emailOrPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Email/Phone
            </label>
            <Input
              id="emailOrPhone"
              type="text"
              placeholder="Enter your email or phone number"
              value={emailOrPhone}
              onChange={(e) => setEmailOrPhone(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5 text-gray-400" />
                  ) : (
                    <Eye className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-black text-sm">{error}</p>}

          <Button type="submit" className="w-full bg-[#00B3A6] hover:bg-[#008C82] text-white" disabled={loading}>
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </Button>
        </form>

        <div className="mt-4">
          <button type="button" onClick={() => setIsSignUp(!isSignUp)} className="text-[#007AFF] text-sm font-medium">
            {isSignUp ? "Already have an account? Sign In" : "Don't have an account? Sign Up"}
          </button>
        </div>

        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social login buttons - Vertical layout */}
        <div className="mt-6 flex flex-col space-y-3">
          <Button
            variant="outline"
            onClick={() => handleSocialSignIn("google")}
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialSignIn("apple")}
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701z" />
            </svg>
            Continue with Apple
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSocialSignIn("facebook")}
            disabled={loading}
            className="w-full flex items-center justify-center"
          >
            <svg className="h-5 w-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
            Continue with Facebook
          </Button>
        </div>

        <div className="mt-6">
          <Button variant="outline" className="w-full" onClick={handleSkip}>
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  )
}
