"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Send } from "lucide-react"
import { useRouter } from "next/navigation"
import MobileNavigation from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

export default function FeedbackPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("help")
  const [rating, setRating] = useState("5")
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)

      // Reset form
      setTimeout(() => {
        router.push("/help")
      }, 2000)
    }, 1500)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/help" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Feedback</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-16">
        {isSubmitted ? (
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <div className="mb-4">
              <div className="inline-block p-4 rounded-full bg-green-100">
                <Send className="h-10 w-10 text-green-600" />
              </div>
            </div>
            <h2 className="text-xl font-bold mb-2">Thank You!</h2>
            <p className="text-gray-600 mb-4">
              Your feedback has been submitted successfully. We appreciate your input!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="font-medium mb-4">Rate Your Experience</h2>

              <RadioGroup value={rating} onValueChange={setRating} className="flex justify-between mb-4">
                {[1, 2, 3, 4, 5].map((value) => (
                  <div key={value} className="flex flex-col items-center">
                    <RadioGroupItem value={value.toString()} id={`rating-${value}`} className="sr-only" />
                    <Label
                      htmlFor={`rating-${value}`}
                      className={`cursor-pointer text-3xl ${
                        Number.parseInt(rating) >= value ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </Label>
                    <span className="text-xs mt-1">{value}</span>
                  </div>
                ))}
              </RadioGroup>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Tell us about your experience..."
                    rows={5}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#DEA818] hover:bg-[#c99616]"
              disabled={isSubmitting || feedback.trim().length === 0}
            >
              {isSubmitting ? "Submitting..." : "Submit Feedback"}
            </Button>
          </form>
        )}
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
