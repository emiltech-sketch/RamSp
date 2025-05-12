"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, Trash2, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-provider"
import { Separator } from "@/components/ui/separator"
import MobileNavigation from "@/components/mobile-navigation"
import { useRouter } from "next/navigation"

// Import the Dialog components
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function CartPage() {
  const router = useRouter()
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [activeTab, setActiveTab] = useState("cart")

  // Add state for the dialog
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)

  const handleTabChange = (tab: string) => {
    setActiveTab(tab)
    if (tab === "home") {
      router.push("/")
    } else if (tab === "categories") {
      router.push("/category/all")
    } else if (tab === "account") {
      router.push("/account")
    } else if (tab === "help") {
      router.push("/help")
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Navigate to checkout page
    router.push("/checkout")
  }

  // Replace the removeFromCart button click handler
  const handleRemoveClick = (itemId: number) => {
    setItemToDelete(itemId)
    setDeleteDialogOpen(true)
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50">
        <header className="bg-[#40E0D0] shadow-sm">
          <div className="px-4 py-3">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <div className="relative h-8 w-8 mr-2">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-wjDSju0zJt1TdulWpb6FPeZ235IGXT.png"
                    alt="RamSphere Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-white font-bold text-lg">Your Cart</span>
              </Link>
            </div>
          </div>
        </header>

        <div className="flex-1 px-4 py-8 flex flex-col items-center justify-center">
          <div className="text-center py-8">
            <div className="mb-4">
              <div className="inline-block p-4 rounded-full bg-gray-100">
                <ShoppingCart className="h-12 w-12 text-gray-400" />
              </div>
            </div>
            <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link href="/">
              <Button className="bg-[#DEA818] hover:bg-[#c99616]">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>

        <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-[#40E0D0] shadow-sm">
        <div className="px-4 py-3">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="relative h-8 w-8 mr-2">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/r-wjDSju0zJt1TdulWpb6FPeZ235IGXT.png"
                  alt="RamSphere Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-lg">Your Cart</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="flex-1 px-4 py-4 pb-32">
        <div className="mb-4">
          {cart.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm p-3 mb-3 flex">
              <div className="flex-shrink-0 mr-3">
                <div className="relative h-20 w-20 rounded-md overflow-hidden">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-sm">{item.name}</h3>
                <p className="text-[#DEA818] text-sm font-bold">${item.price.toFixed(2)}</p>

                <div className="flex items-center mt-2">
                  <button
                    className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center"
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center text-sm">{item.quantity || 1}</span>
                  <button
                    className="h-6 w-6 rounded-full bg-gray-100 flex items-center justify-center"
                    onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                  >
                    <Plus className="h-3 w-3" />
                  </button>
                  <button className="ml-auto text-red-500" onClick={() => handleRemoveClick(item.id)}>
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-lg shadow-sm p-4">
          <h2 className="text-lg font-semibold mb-3">Order Summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.1).toFixed(2)}</span>
            </div>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between font-bold text-base mb-4">
            <span>Total</span>
            <span>${(getCartTotal() * 1.1).toFixed(2)}</span>
          </div>

          <Button onClick={handleCheckout} className="w-full bg-[#DEA818] hover:bg-[#c99616]" disabled={isCheckingOut}>
            {isCheckingOut ? "Processing..." : "Checkout"}
          </Button>
        </div>

        <div className="mt-4">
          <Link href="/">
            <Button variant="outline" className="w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Remove Item</DialogTitle>
            <DialogDescription>Are you sure you want to remove this item from your cart?</DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between gap-2">
            <Button
              variant="outline"
              className="bg-[#DEA818] text-white hover:bg-[#c99616]"
              onClick={() => {
                if (itemToDelete !== null) {
                  // Add to wishlist logic would go here
                  // For now, just show a toast or alert
                  alert("Item added to wishlist and removed from cart")
                  removeFromCart(itemToDelete)
                  setDeleteDialogOpen(false)
                  setItemToDelete(null)
                }
              }}
            >
              Add to Wishlist
            </Button>
            <Button
              variant="destructive"
              className="bg-[#DEA818] text-white hover:bg-[#c99616]"
              onClick={() => {
                if (itemToDelete !== null) {
                  removeFromCart(itemToDelete)
                  setDeleteDialogOpen(false)
                  setItemToDelete(null)
                }
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
