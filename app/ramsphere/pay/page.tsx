"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Shield, CheckCircle, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import MobileNavigation from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function RamSpherePayPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("home")

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "cart") {
      router.push("/cart")
    } else if (tab === "account") {
      router.push("/account")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const features = [
    {
      title: "Fast & Secure",
      description: "Pay quickly and securely with advanced encryption",
      icon: <Shield className="h-6 w-6 text-[#40E0D0]" />,
    },
    {
      title: "Multiple Payment Methods",
      description: "Credit cards, bank transfers, and mobile wallets",
      icon: <CreditCard className="h-6 w-6 text-[#40E0D0]" />,
    },
    {
      title: "Zero Fees",
      description: "No transaction fees for standard purchases",
      icon: <CheckCircle className="h-6 w-6 text-[#40E0D0]" />,
    },
  ]

  const faqs = [
    {
      question: "How do I set up RamSphere Pay?",
      answer:
        "To set up RamSphere Pay, go to your account settings, select 'Payment Methods', and click 'Add RamSphere Pay'. Follow the instructions to link your preferred payment method.",
    },
    {
      question: "Is RamSphere Pay secure?",
      answer:
        "Yes, RamSphere Pay uses industry-leading encryption and security measures to protect your payment information. We never store your full card details on our servers.",
    },
    {
      question: "Can I use RamSphere Pay for all purchases?",
      answer:
        "RamSphere Pay can be used for all purchases on the RamSphere platform and at partner merchants. Look for the RamSphere Pay logo at checkout.",
    },
    {
      question: "Are there any fees for using RamSphere Pay?",
      answer:
        "There are no fees for standard purchases. Some premium services or international transactions may incur a small fee, which will be clearly displayed before you confirm the payment.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/ramsphere" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">RamSphere Pay</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        {/* Hero Banner */}
        <div className="relative h-48 w-full">
          <Image
            src="/placeholder.svg?height=200&width=600&text=RamSphere+Pay"
            alt="RamSphere Pay"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-4">
            <h1 className="text-white text-2xl font-bold">RamSphere Pay</h1>
            <p className="text-white text-sm mt-1">Fast, secure payments for all your purchases</p>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <div className="bg-white sticky top-[57px] z-10">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="p-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-lg font-semibold mb-2">About RamSphere Pay</h2>
              <p className="text-sm text-gray-600 mb-4">
                RamSphere Pay is our secure payment solution that makes checkout faster and easier. Link your preferred
                payment methods once, and enjoy quick, hassle-free payments for all your purchases.
              </p>
              <p className="text-sm text-gray-600 mb-4">
                With advanced encryption and fraud protection, your payment information is always secure. Plus, enjoy
                zero transaction fees on standard purchases.
              </p>
              <div className="mt-6">
                <Button className="w-full bg-[#40E0D0] hover:bg-[#3bc9bb]">Set Up RamSphere Pay</Button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-2">How It Works</h2>
              <ol className="list-decimal pl-5 text-sm text-gray-600 space-y-2">
                <li>Set up RamSphere Pay in your account settings</li>
                <li>Add your preferred payment methods</li>
                <li>Select RamSphere Pay at checkout</li>
                <li>Confirm your purchase with a single tap</li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="features" className="p-4">
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="flex items-start">
                    <div className="bg-blue-50 rounded-full p-3 mr-3">{feature.icon}</div>
                    <div>
                      <h3 className="font-semibold">{feature.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="text-lg font-semibold mb-2">Supported Payment Methods</h2>
                <div className="grid grid-cols-3 gap-3 mt-4">
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=40&width=60&text=Visa" alt="Visa" width={60} height={40} />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=40&width=60&text=Mastercard"
                      alt="Mastercard"
                      width={60}
                      height={40}
                    />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <Image src="/placeholder.svg?height=40&width=60&text=PayPal" alt="PayPal" width={60} height={40} />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=40&width=60&text=Apple+Pay"
                      alt="Apple Pay"
                      width={60}
                      height={40}
                    />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=40&width=60&text=Google+Pay"
                      alt="Google Pay"
                      width={60}
                      height={40}
                    />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=40&width=60&text=Bank"
                      alt="Bank Transfer"
                      width={60}
                      height={40}
                    />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="p-4">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <h3 className="font-medium flex items-center">
                      <HelpCircle className="h-4 w-4 text-[#40E0D0] mr-2" />
                      {faq.question}
                    </h3>
                    <p className="text-sm text-gray-600 mt-2">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-semibold mb-2">Still Have Questions?</h2>
              <p className="text-sm text-gray-600 mb-4">
                Our support team is here to help with any questions about RamSphere Pay.
              </p>
              <Button className="w-full">Contact Support</Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
