"use client"

import { useState, useEffect } from "react"

type ToastType = "default" | "success" | "error" | "warning" | "destructive"

interface Toast {
  id: string
  title: string
  description?: string
  variant?: ToastType
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toast = ({
    title,
    description,
    variant = "default",
  }: {
    title: string
    description?: string
    variant?: ToastType
  }) => {
    if (!isClient) return ""

    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, variant }

    setToasts((prevToasts) => [...prevToasts, newToast])

    // Auto dismiss after 3 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 3000)

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  // Add toast component to the DOM
  useEffect(() => {
    if (!isClient || toasts.length === 0) return

    try {
      let toastContainer = document.getElementById("toast-container")

      if (!toastContainer) {
        toastContainer = document.createElement("div")
        toastContainer.id = "toast-container"
        toastContainer.className = "fixed top-4 right-4 z-50 flex flex-col gap-2"
        document.body.appendChild(toastContainer)
      }

      // Clear existing toasts
      toastContainer.innerHTML = ""

      // Add new toasts
      toasts.forEach((toast) => {
        const toastElement = document.createElement("div")
        toastElement.className = `p-4 rounded-md shadow-md max-w-sm ${
          toast.variant === "destructive"
            ? "bg-red-500 text-white"
            : toast.variant === "success"
              ? "bg-green-500 text-white"
              : toast.variant === "warning"
                ? "bg-yellow-500 text-white"
                : toast.variant === "error"
                  ? "bg-red-500 text-white"
                  : "bg-white text-gray-900"
        }`

        const titleElement = document.createElement("div")
        titleElement.className = "font-medium"
        titleElement.textContent = toast.title
        toastElement.appendChild(titleElement)

        if (toast.description) {
          const descriptionElement = document.createElement("div")
          descriptionElement.className = "text-sm mt-1"
          descriptionElement.textContent = toast.description
          toastElement.appendChild(descriptionElement)
        }

        const closeButton = document.createElement("button")
        closeButton.className = "absolute top-1 right-1 p-1 rounded-full hover:bg-gray-200"
        closeButton.innerHTML = "×"
        closeButton.onclick = () => dismiss(toast.id)
        toastElement.appendChild(closeButton)

        toastContainer.appendChild(toastElement)
      })
    } catch (error) {
      console.error("Error rendering toasts:", error)
    }

    return () => {
      if (isClient && toasts.length === 0) {
        try {
          const toastContainer = document.getElementById("toast-container")
          if (toastContainer) {
            toastContainer.remove()
          }
        } catch (error) {
          console.error("Error removing toast container:", error)
        }
      }
    }
  }, [toasts, isClient])

  return { toast, dismiss }
}
