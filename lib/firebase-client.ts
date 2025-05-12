// Simple localStorage-based authentication functions
"use client"

export const signIn = async (email: string, password: string) => {
  try {
    // In a real app, this would validate credentials against a backend
    // For demo purposes, we're accepting any non-empty values
    if (!email || !password) {
      return { user: null, error: "Email and password are required" }
    }

    // Store user info in localStorage
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("username", email.split("@")[0])
    localStorage.setItem("userEmail", email)

    return {
      user: {
        email,
        displayName: email.split("@")[0],
      },
      error: null,
    }
  } catch (error: any) {
    return { user: null, error: error.message || "Authentication failed" }
  }
}

export const signUp = async (email: string, password: string) => {
  try {
    // In a real app, this would create a user in the backend
    // For demo purposes, we're accepting any non-empty values
    if (!email || !password) {
      return { user: null, error: "Email and password are required" }
    }

    // Store user info in localStorage
    localStorage.setItem("isLoggedIn", "true")
    localStorage.setItem("username", email.split("@")[0])
    localStorage.setItem("userEmail", email)

    return {
      user: {
        email,
        displayName: email.split("@")[0],
      },
      error: null,
    }
  } catch (error: any) {
    return { user: null, error: error.message || "Registration failed" }
  }
}

export const logOut = async () => {
  try {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("username")
    localStorage.removeItem("userEmail")

    return { success: true, error: null }
  } catch (error: any) {
    return { success: false, error: error.message || "Logout failed" }
  }
}

// Simple utility for mockup purposes
export const isLoggedIn = () => {
  if (typeof window === "undefined") return false
  return localStorage.getItem("isLoggedIn") === "true"
}

export const getCurrentUser = () => {
  if (typeof window === "undefined") return null

  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  if (!isLoggedIn) return null

  const username = localStorage.getItem("username") || "User"
  const email = localStorage.getItem("userEmail") || ""

  return {
    displayName: username,
    email,
    photoURL: null,
  }
}
