"use client"

// This is a simplified authentication wrapper without Firebase

// Import local authentication functions
import { signIn as localSignIn, signUp as localSignUp, logOut as localLogOut } from "./firebase-client"

// Safe authentication functions with fallbacks
export const signIn = async (email: string, password: string) => {
  try {
    return await localSignIn(email, password)
  } catch (error: any) {
    console.error("Error in signIn:", error)
    return { user: null, error: error.message || "Authentication failed" }
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    return await localSignUp(email, password)
  } catch (error: any) {
    console.error("Error in signUp:", error)
    return { user: null, error: error.message || "Registration failed" }
  }
}

export const logOut = async () => {
  try {
    return await localLogOut()
  } catch (error: any) {
    return { success: false, error: error.message || "Logout failed" }
  }
}

export const signInWithProvider = async (provider: string) => {
  console.warn("signInWithProvider is a mock function")
  return { user: { email: "test@example.com" }, error: null, displayName: "Test User" }
}

export const signInWithPhone = async (phoneNumber: string) => {
  console.warn("signInWithPhone is a mock function")
  return { verificationId: "mockVerificationId", error: null }
}

export const verifyPhoneCode = async (verificationId: string, verificationCode: string) => {
  console.warn("verifyPhoneCode is a mock function")
  return { user: { phoneNumber: "+15551234567" }, error: null, phoneNumber: "+15551234567" }
}
