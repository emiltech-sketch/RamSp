import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { CartProvider } from "@/components/cart-provider"
import FirebaseInitializer from "@/components/firebase-initializer"
import FirebaseAuthProvider from "@/components/firebase-auth-provider"
import ErrorBoundary from "@/components/error-boundary"
import { ThemeProvider } from "@/components/theme-provider"
import OfflineDetector from "@/components/offline-detector"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RamSphere - Your One-Stop Shopping Destination",
  description: "Discover amazing products at great prices on RamSphere",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ErrorBoundary>
          <ThemeProvider>
            <FirebaseInitializer>
              <FirebaseAuthProvider>
                <CartProvider>
                  <OfflineDetector />
                  {children}
                </CartProvider>
              </FirebaseAuthProvider>
            </FirebaseInitializer>
          </ThemeProvider>
        </ErrorBoundary>
        <div id="recaptcha-container"></div>
      </body>
    </html>
  )
}
