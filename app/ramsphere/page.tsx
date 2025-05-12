"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Globe, Truck, Crown, Shield, Briefcase, Calendar, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import MobileNavigation from "@/components/mobile-navigation"

export default function RamSphereServicesPage() {
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

  const services = [
    {
      id: "pay",
      name: "RamSphere Pay",
      description: "Fast, secure payments for all your purchases",
      icon: <CreditCard className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/pay",
      color: "bg-blue-50",
    },
    {
      id: "installments",
      name: "RamSphere Installments",
      description: "Buy now, pay later with flexible payment plans",
      icon: <Calendar className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/installments",
      color: "bg-purple-50",
    },
    {
      id: "global",
      name: "RamSphere Global",
      description: "Shop internationally with ease",
      icon: <Globe className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/global",
      color: "bg-green-50",
    },
    {
      id: "express",
      name: "RamSphere Express",
      description: "Fast delivery for eligible items",
      icon: <Truck className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/express",
      color: "bg-yellow-50",
    },
    {
      id: "prime",
      name: "RamSphere Prime",
      description: "Premium membership with exclusive benefits",
      icon: <Crown className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/prime",
      color: "bg-red-50",
    },
    {
      id: "rewards",
      name: "RamSphere Rewards",
      description: "Earn points and get discounts on purchases",
      icon: <CreditCard className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/rewards",
      color: "bg-indigo-50",
    },
    {
      id: "protect",
      name: "RamSphere Protect",
      description: "Extended warranty and protection plans",
      icon: <Shield className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/protect",
      color: "bg-teal-50",
    },
    {
      id: "business",
      name: "RamSphere Business",
      description: "Solutions for businesses of all sizes",
      icon: <Briefcase className="h-6 w-6 text-[#40E0D0]" />,
      path: "/ramsphere/business",
      color: "bg-orange-50",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">RamSphere Services</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4 pb-16">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-6">
          <div className="relative h-40 w-full">
            <Image
              src="/placeholder.svg?height=200&width=600&text=RamSphere+Services"
              alt="RamSphere Services"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 flex flex-col justify-end p-4">
              <h1 className="text-white text-2xl font-bold">RamSphere Services</h1>
              <p className="text-white text-sm mt-1">Enhance your shopping experience with our premium services</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {services.map((service) => (
            <Link href={service.path} key={service.id}>
              <div className={`${service.color} p-4 rounded-lg shadow-sm flex items-center`}>
                <div className="bg-white rounded-full p-3 mr-4">{service.icon}</div>
                <div className="flex-1">
                  <h2 className="font-semibold">{service.name}</h2>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
