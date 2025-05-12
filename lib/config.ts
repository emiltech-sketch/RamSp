// App configuration without Firebase
export const appConfig = {
  appName: "RamSphere",
  appVersion: "1.0.0",
  appDescription: "Your one-stop shop for all your needs",
  currency: "USD",
  currencySymbol: "$",
  defaultLanguage: "en",
  supportedLanguages: ["en", "fr", "es", "de"],
}

// API Keys - Replace with your actual keys in a production environment
export const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"
export const STRIPE_PUBLISHABLE_KEY = "YOUR_STRIPE_PUBLISHABLE_KEY"
export const STRIPE_SECRET_KEY = "YOUR_STRIPE_SECRET_KEY"

// Mock Firebase config (empty)
export const firebaseConfig = {
  // Empty object as we're not using Firebase
}
