"use client"

import SignInScreen from "@/components/sign-in-screen"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const router = useRouter()

  const handleSignIn = (username: string) => {
    router.push("/")
  }

  const handleSkip = () => {
    router.push("/")
  }

  return <SignInScreen onSignIn={handleSignIn} onSkip={handleSkip} />
}
