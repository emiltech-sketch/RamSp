"use client"

import { useState } from "react"
import { ArrowLeft, ChevronDown, ChevronUp, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

export default function FAQPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqCategories = [
    {
      id: 1,
      name: "Orders & Shipping",
      faqs: [
        {
          id: 1,
          question: "How do I track my order?",
          answer:
            "You can track your order by going to 'My Account' > 'Orders' and selecting the order you want to track. You'll see the current status and tracking information if available.",
        },
        {
          id: 2,
          question: "What are the shipping options?",
          answer:
            "We offer standard shipping (3-5 business days), express shipping (1-2 business days), and same-day delivery for select areas. Shipping costs vary based on your location and the option you choose.",
        },
        {
          id: 3,
          question: "How long will it take to receive my order?",
          answer:
            "Delivery times depend on your location and the shipping method you choose. Standard shipping typically takes 3-5 business days, while express shipping takes 1-2 business days.",
        },
      ],
    },
    {
      id: 2,
      name: "Returns & Refunds",
      faqs: [
        {
          id: 4,
          question: "What is the return policy?",
          answer:
            "You can return most items within 30 days of delivery. The item must be in its original condition and packaging. Some products have different return policies, which will be noted on the product page.",
        },
        {
          id: 5,
          question: "How do I request a refund?",
          answer:
            "To request a refund, go to 'My Account' > 'Orders', select the order, and click 'Return or Refund'. Follow the instructions to complete your refund request.",
        },
        {
          id: 6,
          question: "How long does it take to process a refund?",
          answer:
            "Once we receive your returned item, it takes 3-5 business days to process your refund. It may take an additional 5-10 business days for the refund to appear in your account, depending on your payment method.",
        },
      ],
    },
    {
      id: 3,
      name: "Payments & Pricing",
      faqs: [
        {
          id: 7,
          question: "What payment methods do you accept?",
          answer:
            "We accept credit/debit cards (Visa, Mastercard, American Express), PayPal, mobile money (MTN, Airtel, Telecel), and bank transfers. You can also pay with RamSphere gift cards.",
        },
        {
          id: 8,
          question: "Why do prices change sometimes?",
          answer:
            "Prices may change due to promotions, discounts, or market conditions. We strive to offer competitive prices and regularly update them based on various factors.",
        },
        {
          id: 9,
          question: "Do you offer installment payment plans?",
          answer:
            "Yes, we offer installment payment plans through RamSphere Installments. You can pay for eligible items in 3, 6, or 12 monthly installments with no interest.",
        },
      ],
    },
    {
      id: 4,
      name: "Account & Security",
      faqs: [
        {
          id: 10,
          question: "How do I reset my password?",
          answer:
            "To reset your password, click on 'Sign In', then 'Forgot Password'. Enter your email address, and we'll send you a link to reset your password.",
        },
        {
          id: 11,
          question: "How can I update my account information?",
          answer:
            "You can update your account information by going to 'My Account' > 'Profile'. From there, you can edit your personal details, change your password, and update your preferences.",
        },
        {
          id: 12,
          question: "Is my payment information secure?",
          answer:
            "Yes, we use industry-standard encryption and security measures to protect your payment information. We do not store your full credit card details on our servers.",
        },
      ],
    },
  ]

  const toggleItem = (id: number) => {
    if (openItems.includes(id)) {
      setOpenItems(openItems.filter((item) => item !== id))
    } else {
      setOpenItems([...openItems, id])
    }
  }

  // Filter FAQs based on search query
  const filteredFAQs = searchQuery
    ? faqCategories
        .map((category) => ({
          ...category,
          faqs: category.faqs.filter(
            (faq) =>
              faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter((category) => category.faqs.length > 0)
    : faqCategories

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white sticky top-0 z-10 shadow-sm">
        <div className="flex items-center p-4 border-b">
          <button onClick={() => router.back()} className="mr-4">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold">Frequently Asked Questions</h1>
        </div>

        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full"
            />
          </div>
        </div>
      </div>

      <div className="p-4">
        {filteredFAQs.length > 0 ? (
          filteredFAQs.map((category) => (
            <div key={category.id} className="mb-6">
              {category.faqs.length > 0 && (
                <>
                  <h2 className="text-lg font-semibold mb-3">{category.name}</h2>
                  <div className="space-y-3">
                    {category.faqs.map((faq) => (
                      <div key={faq.id} className="bg-white rounded-lg shadow overflow-hidden">
                        <button
                          onClick={() => toggleItem(faq.id)}
                          className="w-full p-4 text-left flex justify-between items-center"
                        >
                          <span className="font-medium">{faq.question}</span>
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="h-5 w-5 text-gray-500" />
                          ) : (
                            <ChevronDown className="h-5 w-5 text-gray-500" />
                          )}
                        </button>

                        {openItems.includes(faq.id) && (
                          <div className="p-4 pt-0 border-t border-gray-100">
                            <p className="text-gray-600">{faq.answer}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No FAQs found matching your search.</p>
            <button onClick={() => setSearchQuery("")} className="mt-2 text-[#DEA818]">
              Clear search
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
