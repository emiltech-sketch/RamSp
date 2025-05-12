"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Package, RefreshCcw, DollarSign, HelpCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import MobileNavigation from "@/components/mobile-navigation"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function ReturnRefundPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("help")

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
    }
  }

  // Sample orders that can be returned
  const recentOrders = [
    {
      id: "ORD-12345",
      date: "Mar 15, 2025",
      total: "$499.99",
      items: [
        {
          id: 1,
          name: "Washing Machine",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
          price: "$499.99",
          quantity: 1,
          returnable: true,
        },
      ],
    },
    {
      id: "ORD-12344",
      date: "Mar 10, 2025",
      total: "$299.99",
      items: [
        {
          id: 2,
          name: "Smartphone",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/smartp.png-8EFQyWIKOLZXG34zTcCQhGK9tPtB4r.jpeg",
          price: "$299.99",
          quantity: 1,
          returnable: true,
        },
      ],
    },
  ]

  const faqs = [
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in their original condition with all packaging and accessories. Some items like perishables, personalized products, and digital downloads are not eligible for return.",
    },
    {
      question: "How do I initiate a return?",
      answer:
        "To initiate a return, go to your order history, select the order containing the item you want to return, and click on 'Return Item'. Follow the instructions to complete the return process.",
    },
    {
      question: "How long does it take to process a refund?",
      answer:
        "Once we receive your returned item, it typically takes 3-5 business days to process the refund. The time it takes for the refund to appear in your account depends on your payment method and financial institution.",
    },
    {
      question: "Do I have to pay for return shipping?",
      answer:
        "For items returned due to our error (wrong item, defective, etc.), we cover the return shipping costs. For returns due to customer preference, the customer is responsible for return shipping costs unless otherwise stated in the product description.",
    },
    {
      question: "Can I exchange an item instead of returning it?",
      answer:
        "Yes, you can exchange an item for a different size, color, or model. Initiate the return process and select 'Exchange' instead of 'Refund' as your preferred option.",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/help" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Return & Refund</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 pb-16">
        <Tabs defaultValue="return" className="w-full">
          <TabsList className="w-full p-0 h-12 bg-white">
            <TabsTrigger
              value="return"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Return Items
            </TabsTrigger>
            <TabsTrigger
              value="policy"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              Return Policy
            </TabsTrigger>
            <TabsTrigger
              value="faq"
              className="flex-1 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[#DEA818]"
            >
              FAQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="return" className="mt-0">
            <div className="p-4">
              <h2 className="font-bold mb-4">Recent Orders</h2>

              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                        <div>
                          <p className="font-medium">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.date}</p>
                        </div>
                        <span className="font-medium">{order.total}</span>
                      </div>

                      <div className="p-3">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex mb-3">
                            <div className="relative h-16 w-16 bg-gray-100 rounded-md overflow-hidden mr-3">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-contain p-1"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                              <p className="text-[#DEA818] font-bold text-sm">{item.price}</p>
                            </div>
                          </div>
                        ))}

                        <Button
                          className="w-full bg-[#DEA818] hover:bg-[#c99616]"
                          onClick={() => router.push(`/help/return-refund/${order.id}`)}
                        >
                          Return Items
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6 text-center">
                  <div className="mb-4">
                    <div className="inline-block p-4 rounded-full bg-gray-100">
                      <Package className="h-10 w-10 text-gray-400" />
                    </div>
                  </div>
                  <h3 className="font-medium mb-2">No recent orders</h3>
                  <p className="text-sm text-gray-500 mb-4">You don't have any recent orders eligible for return</p>
                  <Link href="/">
                    <Button className="bg-[#DEA818] hover:bg-[#c99616]">Continue Shopping</Button>
                  </Link>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="policy" className="mt-0">
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                <h2 className="font-medium mb-4">Return Policy</h2>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="bg-[#DEA818] rounded-full p-2 mr-3 text-white">
                      <RefreshCcw className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">30-Day Return Period</h3>
                      <p className="text-sm text-gray-500">
                        Most items can be returned within 30 days of delivery. Items must be in their original condition
                        with all packaging and accessories.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#DEA818] rounded-full p-2 mr-3 text-white">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Refund Process</h3>
                      <p className="text-sm text-gray-500">
                        Refunds are processed within 3-5 business days after we receive your return. The refund will be
                        issued to your original payment method.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-[#DEA818] rounded-full p-2 mr-3 text-white">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">Return Shipping</h3>
                      <p className="text-sm text-gray-500">
                        For items returned due to our error (wrong item, defective, etc.), we cover the return shipping
                        costs. For returns due to customer preference, the customer is responsible for return shipping
                        costs.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-medium mb-4">Non-Returnable Items</h2>

                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Perishable goods (e.g., food, flowers, etc.)</li>
                  <li>• Personalized or custom-made items</li>
                  <li>• Digital products and downloadable software</li>
                  <li>• Gift cards and vouchers</li>
                  <li>• Personal care items and cosmetics (if opened)</li>
                  <li>• Intimate apparel and swimwear (if hygiene seal is broken)</li>
                  <li>• Items marked as non-returnable in the product description</li>
                </ul>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="faq" className="mt-0">
            <div className="p-4">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h2 className="font-medium mb-4">Frequently Asked Questions</h2>

                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left">
                        <div className="flex items-center">
                          <HelpCircle className="h-4 w-4 mr-2 text-[#DEA818]" />
                          <span>{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-sm text-gray-600 pl-6">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
