"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

interface ErrorBoundaryProps {
  children: React.ReactNode
}

export default function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const [hasError, setHasError] = useState(false)
  const [errorInfo, setErrorInfo] = useState<string | null>(null)

  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      console.error("Error caught by error boundary:", event.error)
      setHasError(true)
      setErrorInfo(event.error?.toString() || "Unknown error")
      // Prevent the error from propagating
      event.preventDefault()
    }

    const handleRejection = (event: PromiseRejectionEvent) => {
      console.error("Promise rejection caught by error boundary:", event.reason)
      setHasError(true)
      setErrorInfo(event.reason?.toString() || "Promise rejected")
      // Prevent the rejection from propagating
      event.preventDefault()
    }

    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleRejection)
    }
  }, [])

  if (hasError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Something went wrong</h2>
          <p className="mb-6 text-gray-600">
            We're sorry, but there was an error loading the application. Please try again.
          </p>
          {errorInfo && (
            <div className="mb-4 p-2 bg-gray-100 rounded text-left overflow-auto max-h-32 text-xs">
              <code>{errorInfo}</code>
            </div>
          )}
          <Button
            onClick={() => {
              setHasError(false)
              setErrorInfo(null)
              window.location.reload()
            }}
            className="bg-[#40E0D0] hover:bg-[#3bc9bb] text-white"
          >
            Reload Application
          </Button>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
