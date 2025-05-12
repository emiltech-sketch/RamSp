"use client"

import { useState, useEffect } from "react"
import { WifiOff } from "lucide-react"

export default function OfflineDetector() {
  const [isOffline, setIsOffline] = useState(false)
  const [showOfflineMessage, setShowOfflineMessage] = useState(false)

  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof window !== "undefined") {
      // Set initial state
      setIsOffline(!navigator.onLine)

      // Add event listeners for online/offline events
      const handleOnline = () => {
        setIsOffline(false)
        // Hide the message after a delay
        setTimeout(() => {
          setShowOfflineMessage(false)
        }, 2000)
      }

      const handleOffline = () => {
        setIsOffline(true)
        setShowOfflineMessage(true)
      }

      window.addEventListener("online", handleOnline)
      window.addEventListener("offline", handleOffline)

      // Cleanup
      return () => {
        window.removeEventListener("online", handleOnline)
        window.removeEventListener("offline", handleOffline)
      }
    }
  }, [])

  // Don't render anything if online
  if (!showOfflineMessage) return null

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center transition-opacity duration-300 ${isOffline ? "opacity-100" : "opacity-0"}`}
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 text-center">
        <WifiOff className="h-16 w-16 mx-auto text-red-500 mb-4" />
        <h2 className="text-xl font-bold mb-2">You're offline</h2>
        <p className="text-gray-600 mb-4">Please check your internet connection and try again.</p>
        <button
          onClick={() => setShowOfflineMessage(false)}
          className="bg-[#40E0D0] text-white px-4 py-2 rounded-lg font-medium"
        >
          Dismiss
        </button>
      </div>
    </div>
  )
}
