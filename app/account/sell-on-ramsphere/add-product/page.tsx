"use client"

import type React from "react"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Camera, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

interface ProductImage {
  id: number
  url: string
  file?: File
}

export default function AddProductPage() {
  const router = useRouter()
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cameraInputRef = useRef<HTMLInputElement>(null)

  const [productName, setProductName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [images, setImages] = useState<ProductImage[]>([])
  const [loading, setLoading] = useState(false)

  // Category-specific specifications
  const [specifications, setSpecifications] = useState<Record<string, string>>({})

  const categorySpecifications: Record<string, string[]> = {
    Electronics: ["Brand", "Model", "Warranty", "Condition"],
    Fashion: ["Brand", "Size", "Color", "Material"],
    "Home & Office": ["Brand", "Dimensions", "Material", "Color"],
    "Beauty Care": ["Brand", "Weight", "Expiry Date", "Skin Type"],
    FoodMart: ["Brand", "Weight", "Expiry Date", "Ingredients"],
    "Phones & Tablets": ["Brand", "Model", "Storage", "RAM", "Screen Size", "Camera"],
    "Computers & Peripherals": ["Brand", "Processor", "RAM", "Storage", "Graphics Card"],
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCategory = e.target.value
    setCategory(selectedCategory)

    // Initialize specifications for the selected category
    const specs: Record<string, string> = {}
    if (selectedCategory in categorySpecifications) {
      categorySpecifications[selectedCategory].forEach((spec) => {
        specs[spec] = ""
      })
    }
    setSpecifications(specs)
  }

  const handleSpecificationChange = (spec: string, value: string) => {
    setSpecifications((prev) => ({
      ...prev,
      [spec]: value,
    }))
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newImages: ProductImage[] = Array.from(e.target.files).map((file, index) => ({
        id: Date.now() + index,
        url: URL.createObjectURL(file),
        file,
      }))

      setImages((prev) => [...prev, ...newImages])
    }
  }

  const handleCameraCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      const newImage: ProductImage = {
        id: Date.now(),
        url: URL.createObjectURL(file),
        file,
      }

      setImages((prev) => [...prev, newImage])
    }
  }

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Validate form
    if (!productName || !price || !description || !category || images.length === 0) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields and add at least one image.",
        variant: "destructive",
      })
      setLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Product added successfully",
        description: "Your product has been listed for sale.",
      })
      setLoading(false)
      router.push("/account/sell-on-ramsphere")
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <header className="bg-[#40E0D0] text-white sticky top-0 z-10">
        <div className="flex items-center p-4">
          <button onClick={() => router.back()} className="mr-2">
            <ArrowLeft className="h-6 w-6" />
          </button>
          <h1 className="text-lg font-semibold">Add New Product</h1>
        </div>
      </header>

      <div className="p-4">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Product Images */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-3">Product Images</h2>
            <p className="text-sm text-gray-500 mb-3">Add up to 8 images of your product</p>

            <div className="grid grid-cols-4 gap-2 mb-3">
              {images.map((image) => (
                <div key={image.id} className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                  <Image src={image.url || "/placeholder.svg"} alt="Product" fill className="object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(image.id)}
                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                </div>
              ))}

              {images.length < 8 && (
                <div className="aspect-square bg-gray-100 rounded-lg flex flex-col items-center justify-center">
                  <div className="flex space-x-2 mb-2">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="bg-gray-200 rounded-full p-2"
                    >
                      <Upload className="h-5 w-5 text-gray-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => cameraInputRef.current?.click()}
                      className="bg-gray-200 rounded-full p-2"
                    >
                      <Camera className="h-5 w-5 text-gray-600" />
                    </button>
                  </div>
                  <span className="text-xs text-gray-500">Add Image</span>
                </div>
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept="image/*"
              multiple
              className="hidden"
            />
            <input
              type="file"
              ref={cameraInputRef}
              onChange={handleCameraCapture}
              accept="image/*"
              capture="environment"
              className="hidden"
            />
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="text-lg font-medium mb-3">Basic Information</h2>

            <div className="space-y-4">
              <div>
                <label htmlFor="productName" className="block text-sm font-medium mb-1">
                  Product Name <span className="text-black">*</span>
                </label>
                <Input
                  id="productName"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium mb-1">
                  Category <span className="text-black">*</span>
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={handleCategoryChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#40E0D0] focus:border-transparent"
                  required
                >
                  <option value="">Select a category</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Office">Home & Office</option>
                  <option value="Beauty Care">Beauty Care</option>
                  <option value="FoodMart">FoodMart</option>
                  <option value="Phones & Tablets">Phones & Tablets</option>
                  <option value="Computers & Peripherals">Computers & Peripherals</option>
                </select>
              </div>

              <div>
                <label htmlFor="price" className="block text-sm font-medium mb-1">
                  Price ($) <span className="text-black">*</span>
                </label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description <span className="text-black">*</span>
                </label>
                <Textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  rows={4}
                  required
                />
              </div>
            </div>
          </div>

          {/* Category-specific Specifications */}
          {category && Object.keys(specifications).length > 0 && (
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h2 className="text-lg font-medium mb-3">Specifications</h2>

              <div className="space-y-4">
                {Object.keys(specifications).map((spec) => (
                  <div key={spec}>
                    <label htmlFor={`spec-${spec}`} className="block text-sm font-medium mb-1">
                      {spec}
                    </label>
                    <Input
                      id={`spec-${spec}`}
                      value={specifications[spec]}
                      onChange={(e) => handleSpecificationChange(spec, e.target.value)}
                      placeholder={`Enter ${spec.toLowerCase()}`}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button type="submit" className="w-full bg-[#40E0D0] hover:bg-[#40E0D0]/90" disabled={loading}>
            {loading ? "Adding Product..." : "Add Product"}
          </Button>
        </form>
      </div>
    </div>
  )
}
