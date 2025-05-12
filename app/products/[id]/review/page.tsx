"use client"

import type React from "react"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { ChevronLeft, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function ProductReviewPage() {
  const params = useParams()
  const router = useRouter()
  const { toast } = useToast()
  const [rating, setRating] = useState(5)
  const [review, setReview] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Review submitted",
        description: "Thank you for your feedback!",
      })
      setSubmitting(false)
      router.back()
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="flex items-center p-4">
          <button onClick={() => router.back()} className="mr-2">
            <ChevronLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Write a Review</h1>
        </div>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Rating */}
          <div>
            <h3 className="text-sm font-medium mb-2">Rate this product</h3>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <button key={star} type="button" onClick={() => setRating(star)} className="focus:outline-none">
                  <Star className={`h-8 w-8 ${star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Review */}
          <div>
            <label htmlFor="review" className="block text-sm font-medium mb-2">
              Your Review
            </label>
            <Textarea
              id="review"
              placeholder="Share your experience with this product..."
              rows={6}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="w-full"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-[#40E0D0]" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </div>
    </div>
  )
}
