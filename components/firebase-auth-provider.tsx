"use client"

import type { ReactNode } from "react"

interface FirebaseAuthProviderProps {
  children: ReactNode
}

export default function FirebaseAuthProvider({ children }: FirebaseAuthProviderProps) {
  // Simplified version without Firebase - just render children
  return <>{children}</>
}
