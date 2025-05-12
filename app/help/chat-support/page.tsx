"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Send, Paperclip, ImageIcon, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  id: number
  text: string
  sender: "user" | "agent"
  timestamp: Date
}

export default function ChatSupportPage() {
  const router = useRouter()
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! Welcome to RamSphere customer support. How can I help you today?",
      sender: "agent",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!message.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: message,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setMessage("")

    // Simulate agent typing
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      // Add agent response
      const agentMessage: Message = {
        id: messages.length + 2,
        text: getAgentResponse(message),
        sender: "agent",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, agentMessage])
    }, 1500)
  }

  const getAgentResponse = (userMessage: string): string => {
    const lowerCaseMessage = userMessage.toLowerCase()

    if (lowerCaseMessage.includes("order") && lowerCaseMessage.includes("status")) {
      return "You can check your order status in the 'My Orders' section of your account. Would you like me to guide you there?"
    } else if (lowerCaseMessage.includes("return") || lowerCaseMessage.includes("refund")) {
      return "Our return policy allows returns within 30 days of delivery. Would you like to initiate a return or learn more about our refund process?"
    } else if (lowerCaseMessage.includes("shipping") || lowerCaseMessage.includes("delivery")) {
      return "Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days. Is there a specific order you're inquiring about?"
    } else if (lowerCaseMessage.includes("payment") || lowerCaseMessage.includes("pay")) {
      return "We accept credit/debit cards, PayPal, and RamSphere Pay. Is there a specific payment issue you're experiencing?"
    } else if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      return "Hello! How can I assist you with your RamSphere shopping experience today?"
    } else {
      return "Thank you for your message. I'll help you with that. Could you please provide more details so I can assist you better?"
    }
  }

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <header className="bg-[#40E0D0] text-white sticky top-0 z-10">
        <div className="flex items-center p-4">
          <button onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">Customer Support</h1>
            <p className="text-xs">Online • Typically replies in a few minutes</p>
          </div>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.sender === "user" ? "bg-[#40E0D0] text-white rounded-tr-none" : "bg-white shadow-sm rounded-tl-none"
              }`}
            >
              <p>{msg.text}</p>
              <p className={`text-xs mt-1 ${msg.sender === "user" ? "text-white/70" : "text-gray-500"}`}>
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white shadow-sm rounded-lg rounded-tl-none p-3">
              <div className="flex space-x-1">
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "0ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "150ms" }}
                ></div>
                <div
                  className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                  style={{ animationDelay: "300ms" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t p-3">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button type="button" variant="ghost" size="icon" className="text-gray-500">
            <Paperclip className="h-5 w-5" />
          </Button>
          <Button type="button" variant="ghost" size="icon" className="text-gray-500">
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
          />
          <Button type="button" variant="ghost" size="icon" className="text-gray-500">
            <Mic className="h-5 w-5" />
          </Button>
          <Button type="submit" size="icon" className="bg-[#40E0D0] text-white hover:bg-[#40E0D0]/90">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  )
}
