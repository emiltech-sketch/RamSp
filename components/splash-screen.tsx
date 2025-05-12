"use client"

import { useEffect } from "react"
import Image from "next/image"

interface SplashScreenProps {
  onComplete: () => void
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center w-full h-full bg-[#00C896]">
        <div className="w-32 h-32 flex items-center justify-center bg-white rounded-3xl mb-5">
          <div className="relative w-24 h-24">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-wjDSju0zJt1TdulWpb6FPeZ235IGXT.png"
              alt="RamSphere Logo"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <p className="text-white text-xl font-bold">RamSphere</p>
      </div>
    </div>
  )
}
