"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"

export default function CloseAccountPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("account")
  const [reasons, setReasons] = useState({
    notUseful: false,
    tooManyEmails: false,
    privacyConcerns: false,
    difficultToUse: false,
    createdNewAccount: false,
    other: false,
  })
  const [otherReason, setOtherReason] = useState("")
  const [confirmClose, setConfirmClose] = useState(false)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const handleReasonChange = (reason: keyof typeof reasons) => {
    setReasons({
      ...reasons,
      [reason]: !reasons[reason],
    })
  }

  const handleCloseAccount = () => {
    // In a real app, this would call an API to close the account
    alert("Account closure request submitted. You will receive a confirmation email.")
    router.push("/")
  }

  const isFormValid = () => {
    return (
      Object.values(reasons).some((value) => value) && (!reasons.other || otherReason.trim() !== "") && confirmClose
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/account" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Close Account</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-16">
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start">
          <AlertTriangle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-medium text-red-800">Warning: This action cannot be undone</h3>
            <p className="text-sm text-red-700 mt-1">
              Closing your account will permanently delete all your data, including order history, saved addresses, and
              payment methods.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-medium mb-3">Please tell us why you're leaving:</h2>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="notUseful"
                checked={reasons.notUseful}
                onCheckedChange={() => handleReasonChange("notUseful")}
              />
              <label htmlFor="notUseful" className="text-sm">
                The app is not useful to me
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="tooManyEmails"
                checked={reasons.tooManyEmails}
                onCheckedChange={() => handleReasonChange("tooManyEmails")}
              />
              <label htmlFor="tooManyEmails" className="text-sm">
                I receive too many emails
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="privacyConcerns"
                checked={reasons.privacyConcerns}
                onCheckedChange={() => handleReasonChange("privacyConcerns")}
              />
              <label htmlFor="privacyConcerns" className="text-sm">
                I have privacy concerns
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="difficultToUse"
                checked={reasons.difficultToUse}
                onCheckedChange={() => handleReasonChange("difficultToUse")}
              />
              <label htmlFor="difficultToUse" className="text-sm">
                The app is difficult to use
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="createdNewAccount"
                checked={reasons.createdNewAccount}
                onCheckedChange={() => handleReasonChange("createdNewAccount")}
              />
              <label htmlFor="createdNewAccount" className="text-sm">
                I created a new account
              </label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="other" checked={reasons.other} onCheckedChange={() => handleReasonChange("other")} />
              <label htmlFor="other" className="text-sm">
                Other reason
              </label>
            </div>

            {reasons.other && (
              <Textarea
                placeholder="Please specify your reason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="mt-2"
              />
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="confirmClose" checked={confirmClose} onCheckedChange={() => setConfirmClose(!confirmClose)} />
            <label htmlFor="confirmClose" className="text-sm">
              I understand that closing my account will permanently delete all my data and cannot be undone.
            </label>
          </div>
        </div>

        <Button
          className="w-full bg-red-600 hover:bg-red-700 text-white"
          disabled={!isFormValid()}
          onClick={handleCloseAccount}
        >
          Close Account
        </Button>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
