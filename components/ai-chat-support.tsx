"use client"

import { useState, useRef, useEffect } from "react"
import { Send, Bot, User, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface Message {
  role: "user" | "assistant"
  content: string
}

interface AIChatSupportProps {
  onClose: () => void
}

export default function AIChatSupport({ onClose }: AIChatSupportProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your RamSphere shopping assistant. How can I help you today?",
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = { role: "user", content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    // In a real app, this would call the OpenAI API
    // For now, we'll simulate a response
    // setTimeout(() => {
    //   const responses = [
    //     "I can help you find products that match your needs. What are you looking for?",
    //     "Would you like me to recommend some popular items in that category?",
    //     "You can find that in our FoodMart section. Would you like me to show you how to get there?",
    //     "That item is currently in stock! You can add it to your cart from the product page.",
    //     "For returns, you can visit the Help Center and select 'Return & Refund'. Would you like me to guide you there?",
    //     "I'm sorry to hear you're having trouble. Let me help you resolve that issue.",
    //   ]

    //   const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    //   const assistantMessage: Message = { role: "assistant", content: randomResponse }

    //   setMessages((prev) => [...prev, assistantMessage])
    //   setIsLoading(false)
    // }, 1000)

    sendMessage(input)
  }

  // Add proper error handling for API keys
  const sendMessage = async (message: string) => {
    setMessages((prev) => [...prev, { role: "user", content: message }])
    setInput("")
    setIsLoading(true)

    try {
      // Make API request to server action
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: message }],
        }),
      })

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`)
      }

      const data = await response.json()
      setMessages((prev) => [...prev, { role: "assistant", content: data.message }])
    } catch (error) {
      console.error("Error sending message:", error)
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "I'm sorry, I'm having trouble connecting to my services. Please try again later or contact customer support.",
        },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="bg-white rounded-t-lg sm:rounded-lg shadow-lg w-full sm:max-w-md h-[80vh] sm:h-[600px] flex flex-col">
        <div className="p-4 bg-[#40E0D0] text-white rounded-t-lg flex justify-between items-center">
          <div className="flex items-center">
            <Bot className="h-5 w-5 mr-2" />
            <h2 className="font-semibold">AI Shopping Assistant</h2>
          </div>
          <button onClick={onClose} className="text-white">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] p-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-[#DEA818] text-white rounded-tr-none"
                    : "bg-gray-100 text-gray-800 rounded-tl-none"
                }`}
              >
                <div className="flex items-start">
                  {message.role === "assistant" && <Bot className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />}
                  <p className="text-sm">{message.content}</p>
                  {message.role === "user" && <User className="h-5 w-5 ml-2 mt-0.5 flex-shrink-0" />}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[80%] p-3 rounded-lg bg-gray-100 text-gray-800 rounded-tl-none">
                <div className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 flex-shrink-0" />
                  <div className="flex space-x-1">
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    ></div>
                    <div
                      className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "600ms" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div className="p-4 border-t">
          <div className="flex items-end space-x-2">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="resize-none min-h-[60px]"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !input.trim()}
              className="bg-[#DEA818] hover:bg-[#c99616] h-10 w-10 p-0 flex-shrink-0"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Powered by OpenAI. Your conversations help us improve our service.
          </p>
        </div>
      </div>
    </div>
  )
}
