"use client"

import type React from "react"

// This is a simplified version that doesn't use Firebase
export default function FirebaseInitializer({ children }: { children: React.ReactNode }) {
  // Simply render children without Firebase initialization
  return <>{children}</>
}
