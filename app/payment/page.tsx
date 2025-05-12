"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Wallet, BanknoteIcon as Bank, Check, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { useCart } from "@/components/cart-provider"
import { Elements } from "@stripe/react-stripe-js"
import { PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js"
import { stripePromise, createPaymentIntent } from "@/lib/stripe"
import { useCurrency } from "@/components/home-page"

// Stripe Payment Form Component
function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setErrorMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin + "/payment/success",
      },
      redirect: "if_required",
    })

    if (error) {
      setErrorMessage(error.message || "An error occurred with your payment")
      setIsLoading(false)
    } else {
      // Payment succeeded
      onSuccess()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {errorMessage && <div className="text-red-500 text-sm">{errorMessage}</div>}
      <Button type="submit" disabled={!stripe || isLoading} className="w-full bg-[#DEA818] hover:bg-[#c99616]">
        {isLoading ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  )
}

export default function PaymentPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const { currency } = useCurrency()
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [mobileNetwork, setMobileNetwork] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [paymentIntentError, setPaymentIntentError] = useState<string | null>(null)

  // Sample order summary
  const orderSummary = {
    subtotal: cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0),
    shipping: 0,
    tax: cart.reduce((total, item) => total + item.price * (item.quantity || 1), 0) * 0.1,
    get total() {
      return this.subtotal + this.shipping + this.tax
    },
  }

  // Create payment intent when component mounts
  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (paymentMethod === "card") {
        try {
          const { clientSecret } = await createPaymentIntent(orderSummary.total, currency.code.toLowerCase())
          setClientSecret(clientSecret)
          setPaymentIntentError(null)
        } catch (error: any) {
          console.error("Error creating payment intent:", error)
          setPaymentIntentError(error.message || "Failed to create payment intent.")
        }
      } else {
        setClientSecret(null)
      }
    }

    fetchPaymentIntent()
  }, [paymentMethod, orderSummary.total, currency.code])

  const handlePayment = () => {
    if (paymentMethod === "mobile-money" && (!mobileNetwork || !mobileNumber)) {
      alert("Please select a network and enter your mobile number")
      return
    }

    if (paymentMethod !== "card") {
      setIsProcessing(true)

      // Simulate payment processing
      setTimeout(() => {
        setIsProcessing(false)
        setShowSuccess(true)
        clearCart() // Clear the cart after successful payment

        // Redirect to success page after a delay
        setTimeout(() => {
          router.push("/payment/success")
        }, 2000)
      }, 2000)
    }
  }

  const handlePaymentSuccess = () => {
    setShowSuccess(true)
    clearCart() // Clear the cart after successful payment

    // Redirect to success page after a delay
    setTimeout(() => {
      router.push("/payment/success")
    }, 2000)
  }

  if (showSuccess) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center p-4">
        <div className="bg-green-100 rounded-full p-6 mb-6">
          <Check className="h-12 w-12 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6 text-center">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <p className="text-gray-500 mb-2">Redirecting to order confirmation...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/cart" className="flex items-center">
              <ArrowLeft className="h-5 w-5 text-white mr-2" />
              <span className="text-white font-bold text-lg">Payment</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 p-4">
        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-medium mb-4">Select Payment Method</h2>

          <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
            <div className="flex items-center space-x-2 p-3 border rounded-lg mb-3">
              <RadioGroupItem value="card" id="card" />
              <Label htmlFor="card" className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-blue-600" />
                Credit/Debit Card
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg mb-3">
              <RadioGroupItem value="mobile-money" id="mobile-money" />
              <Label htmlFor="mobile-money" className="flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-green-600" />
                Mobile Money
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg mb-3">
              <RadioGroupItem value="wallet" id="wallet" />
              <Label htmlFor="wallet" className="flex items-center">
                <Wallet className="h-5 w-5 mr-2 text-green-600" />
                Digital Wallet
              </Label>
            </div>

            <div className="flex items-center space-x-2 p-3 border rounded-lg">
              <RadioGroupItem value="bank" id="bank" />
              <Label htmlFor="bank" className="flex items-center">
                <Bank className="h-5 w-5 mr-2 text-purple-600" />
                Bank Transfer
              </Label>
            </div>
          </RadioGroup>
        </div>

        {paymentMethod === "card" && clientSecret && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-medium mb-4">Card Details</h2>
            <Elements stripe={stripePromise} options={{ clientSecret }}>
              <CheckoutForm onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        )}

        {paymentMethod === "mobile-money" && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-medium mb-4">Mobile Money Details</h2>

            <div className="space-y-3">
              <div>
                <Label htmlFor="network">Select Network</Label>
                <RadioGroup value={mobileNetwork} onValueChange={setMobileNetwork} className="mt-2">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="mtn" id="mtn" className="sr-only" />
                      <Label
                        htmlFor="mtn"
                        className={`flex flex-col items-center justify-center h-16 w-full border rounded-lg p-2 cursor-pointer ${
                          mobileNetwork === "mtn" ? "border-[#DEA818] bg-yellow-50" : "border-gray-200"
                        }`}
                      >
                        <div className="h-8 w-8 bg-yellow-400 rounded-full mb-1 flex items-center justify-center text-white font-bold">
                          MTN
                        </div>
                        <span className="text-xs">MTN</span>
                      </Label>
                    </div>

                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="telecel" id="telecel" className="sr-only" />
                      <Label
                        htmlFor="telecel"
                        className={`flex flex-col items-center justify-center h-16 w-full border rounded-lg p-2 cursor-pointer ${
                          mobileNetwork === "telecel" ? "border-[#DEA818] bg-yellow-50" : "border-gray-200"
                        }`}
                      >
                        <div className="h-8 w-8 bg-red-500 rounded-full mb-1 flex items-center justify-center text-white font-bold">
                          T
                        </div>
                        <span className="text-xs">Telecel</span>
                      </Label>
                    </div>

                    <div className="flex flex-col items-center">
                      <RadioGroupItem value="airtel-tigo" id="airtel-tigo" className="sr-only" />
                      <Label
                        htmlFor="airtel-tigo"
                        className={`flex flex-col items-center justify-center h-16 w-full border rounded-lg p-2 cursor-pointer ${
                          mobileNetwork === "airtel-tigo" ? "border-[#DEA818] bg-yellow-50" : "border-gray-200"
                        }`}
                      >
                        <div className="h-8 w-8 bg-blue-600 rounded-full mb-1 flex items-center justify-center text-white font-bold">
                          A/T
                        </div>
                        <span className="text-xs">Airtel/Tigo</span>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div>
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  placeholder="Enter mobile number"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                />
              </div>

              <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p>
                  You will receive a payment confirmation prompt on your mobile phone. Please follow the instructions to
                  complete the payment.
                </p>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "wallet" && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-medium mb-4">Select Wallet</h2>

            <div className="space-y-3">
              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <input type="radio" id="paypal" name="wallet" className="h-4 w-4" />
                <label htmlFor="paypal" className="flex items-center">
                  <div className="h-6 w-6 mr-2 bg-blue-600 rounded flex items-center justify-center text-white text-xs font-bold">
                    P
                  </div>
                  PayPal
                </label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <input type="radio" id="gpay" name="wallet" className="h-4 w-4" />
                <label htmlFor="gpay" className="flex items-center">
                  <div className="h-6 w-6 mr-2 bg-white rounded border flex items-center justify-center text-xs font-bold">
                    G
                  </div>
                  Google Pay
                </label>
              </div>

              <div className="flex items-center space-x-2 p-3 border rounded-lg">
                <input type="radio" id="applepay" name="wallet" className="h-4 w-4" />
                <label htmlFor="applepay" className="flex items-center">
                  <div className="h-6 w-6 mr-2 bg-black rounded flex items-center justify-center text-white text-xs font-bold">
                    A
                  </div>
                  Apple Pay
                </label>
              </div>
            </div>
          </div>
        )}

        {paymentMethod === "bank" && (
          <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
            <h2 className="font-medium mb-4">Bank Transfer Details</h2>

            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <p className="text-sm font-medium">Account Name</p>
              <p className="text-sm">RamSphere Ltd</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <p className="text-sm font-medium">Account Number</p>
              <p className="text-sm">1234567890</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg mb-4">
              <p className="text-sm font-medium">Bank Name</p>
              <p className="text-sm">First Bank</p>
            </div>

            <div className="bg-gray-100 p-3 rounded-lg">
              <p className="text-sm font-medium">Reference</p>
              <p className="text-sm">ORD-12345</p>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Please use the reference number when making your transfer. Your order will be processed once payment is
              confirmed.
            </p>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
          <h2 className="font-medium mb-3">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                {currency.symbol}
                {orderSummary.subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>
                {orderSummary.shipping === 0 ? "Free" : `${currency.symbol}${orderSummary.shipping.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>
                {currency.symbol}
                {orderSummary.tax.toFixed(2)}
              </span>
            </div>
            <div className="border-t border-gray-200 my-2 pt-2 flex justify-between font-bold">
              <span>Total</span>
              <span>
                {currency.symbol}
                {orderSummary.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {paymentMethod !== "card" && (
          <Button className="w-full bg-[#DEA818] hover:bg-[#c99616]" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </Button>
        )}
      </div>
    </div>
  )
}
