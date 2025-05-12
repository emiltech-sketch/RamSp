"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"

export default function AccountSettingsPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234 567 8900",
    password: "••••••••",
  })

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    marketingEmails: false,
    darkMode: false,
    language: "English",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePreferenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setPreferences((prev) => ({ ...prev, [name]: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Account settings updated successfully!",
      })
      setLoading(false)
    }, 1000)
  }

  const handleUpdatePassword = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Password updated successfully!",
      })
      setLoading(false)
    }, 1000)
  }

  const handleSavePreferences = () => {
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success",
        description: "Preferences saved successfully!",
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] p-4 sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/account" className="mr-3">
            <ArrowLeft className="h-6 w-6 text-white" />
          </Link>
          <h1 className="text-xl font-bold text-white">Account Settings</h1>
        </div>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Personal Information</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full mt-4 bg-[#DEA818] hover:bg-[#c99616]" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>

        <div className="bg-white p-4 rounded-lg shadow-sm mt-6">
          <h2 className="text-lg font-semibold mb-4">Security</h2>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="pl-10 pr-10"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <Button
            onClick={handleUpdatePassword}
            className="w-full mt-4 bg-[#DEA818] hover:bg-[#c99616]"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Password"}
          </Button>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm mt-6">
          <h2 className="text-lg font-semibold mb-4">Preferences</h2>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label htmlFor="emailNotifications" className="text-sm font-medium text-gray-700">
                Email Notifications
              </label>
              <input
                type="checkbox"
                id="emailNotifications"
                name="emailNotifications"
                checked={preferences.emailNotifications}
                onChange={handlePreferenceChange}
                className="h-4 w-4 text-[#40E0D0] focus:ring-[#40E0D0] border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="pushNotifications" className="text-sm font-medium text-gray-700">
                Push Notifications
              </label>
              <input
                type="checkbox"
                id="pushNotifications"
                name="pushNotifications"
                checked={preferences.pushNotifications}
                onChange={handlePreferenceChange}
                className="h-4 w-4 text-[#40E0D0] focus:ring-[#40E0D0] border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="marketingEmails" className="text-sm font-medium text-gray-700">
                Marketing Emails
              </label>
              <input
                type="checkbox"
                id="marketingEmails"
                name="marketingEmails"
                checked={preferences.marketingEmails}
                onChange={handlePreferenceChange}
                className="h-4 w-4 text-[#40E0D0] focus:ring-[#40E0D0] border-gray-300 rounded"
              />
            </div>

            <div className="flex items-center justify-between">
              <label htmlFor="darkMode" className="text-sm font-medium text-gray-700">
                Dark Mode
              </label>
              <input
                type="checkbox"
                id="darkMode"
                name="darkMode"
                checked={preferences.darkMode}
                onChange={handlePreferenceChange}
                className="h-4 w-4 text-[#40E0D0] focus:ring-[#40E0D0] border-gray-300 rounded"
              />
            </div>
          </div>

          <Button
            onClick={handleSavePreferences}
            className="w-full mt-4 bg-[#DEA818] hover:bg-[#c99616]"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save Preferences"}
          </Button>
        </div>
      </div>
    </div>
  )
}
