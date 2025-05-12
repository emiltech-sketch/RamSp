"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { ArrowLeft, X, Camera, ImageIcon, Scan, RotateCw, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import DeviceAccess from "./device-access"

interface CameraSearchProps {
  onClose: () => void
}

export default function CameraSearch({ onClose }: CameraSearchProps) {
  const [mode, setMode] = useState<"camera" | "gallery" | "barcode">("camera")
  const [isCapturing, setIsCapturing] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [isSearching, setIsSearching] = useState(false)
  const [cameraStream, setCameraStream] = useState<MediaStream | null>(null)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [videoError, setVideoError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (mode === "camera") {
      startCamera()
    } else {
      stopCamera()
    }

    return () => {
      stopCamera()
    }
  }, [mode])

  const startCamera = async () => {
    try {
      setCameraError(null)
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      setCameraStream(stream)

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch (err) {
      console.error("Error accessing camera:", err)
      setCameraError("Could not access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop())
      setCameraStream(null)
    }
  }

  const handleCapture = () => {
    if (mode === "camera") {
      if (videoRef.current && canvasRef.current) {
        setIsCapturing(true)

        const video = videoRef.current
        const canvas = canvasRef.current
        canvas.width = video.videoWidth
        canvas.height = video.videoHeight

        const context = canvas.getContext("2d")
        if (context) {
          context.drawImage(video, 0, 0, canvas.width, canvas.height)

          try {
            const imageDataUrl = canvas.toDataURL("image/jpeg")
            setCapturedImage(imageDataUrl)
          } catch (err) {
            console.error("Error capturing image:", err)
          }
        }

        setIsCapturing(false)
      }
    } else if (mode === "gallery" && fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      setIsCapturing(true)

      const file = files[0]
      const reader = new FileReader()

      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          setCapturedImage(event.target.result)
        }
        setIsCapturing(false)
      }

      reader.onerror = () => {
        console.error("Error reading file")
        setIsCapturing(false)
      }

      reader.readAsDataURL(file)
    }
  }

  const handleSearch = () => {
    if (!capturedImage) return

    setIsSearching(true)

    // Simulate searching
    setTimeout(() => {
      setSearchResults([
        {
          id: 1,
          name: "Wooden Table",
          price: "$199.99",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
        },
        {
          id: 2,
          name: "Coffee Table",
          price: "$149.99",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
        },
        {
          id: 3,
          name: "Study Desk",
          price: "$179.99",
          image:
            "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.12.56-GBLWAk5a0G3HkOxRv8kHKBLpBJcbmo.png",
        },
      ])
      setIsSearching(false)
    }, 1500)
  }

  const resetCapture = () => {
    setCapturedImage(null)
    setSearchResults(null)
    if (mode === "camera") {
      startCamera()
    }
  }

  return (
    <div className="fixed inset-0 bg-black z-50 flex flex-col">
      <header className="bg-[#40E0D0] p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white font-bold text-lg">Visual Search</h1>
        <button onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </header>

      {searchResults ? (
        <div className="flex-1 bg-white overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center mb-4">
              <div className="relative h-16 w-16 rounded-lg overflow-hidden">
                <Image src={capturedImage || "/placeholder.svg"} alt="Captured" fill className="object-cover" />
              </div>
              <div className="ml-3">
                <h3 className="font-medium">Search results</h3>
                <p className="text-sm text-gray-500">{searchResults.length} items found</p>
              </div>
              <button onClick={resetCapture} className="ml-auto bg-gray-100 rounded-full p-2">
                <RotateCw className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {searchResults.map((item) => (
                <Link
                  href={`/product/${item.id}`}
                  key={item.id}
                  className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200"
                >
                  <div className="relative h-32 w-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-contain p-2" />
                  </div>
                  <div className="p-2">
                    <h3 className="font-medium text-sm line-clamp-2">{item.name}</h3>
                    <p className="text-[#DEA818] font-bold text-sm">{item.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 relative bg-black">
            {capturedImage ? (
              <Image src={capturedImage || "/placeholder.svg"} alt="Captured" fill className="object-contain" />
            ) : mode === "camera" ? (
              <div className="absolute inset-0 flex items-center justify-center">
                {cameraError ? (
                  <div className="text-white text-center p-4">
                    <p className="mb-2">{cameraError}</p>
                    <Button className="bg-[#DEA818] hover:bg-[#c99616] mt-2" onClick={() => startCamera()}>
                      Try Again
                    </Button>
                  </div>
                ) : (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      {isCapturing ? (
                        <div className="h-16 w-16 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
                      ) : (
                        <div className="text-white text-center">
                          <p className="mb-2">Position the item in the frame</p>
                          <div className="h-40 w-40 border-2 border-white rounded-lg"></div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ) : mode === "gallery" ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <Upload className="h-16 w-16 mx-auto mb-4" />
                  <p className="mb-2">Tap the button below to select an image from your gallery</p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-center p-4">
                  <Scan className="h-16 w-16 mx-auto mb-4" />
                  <p className="mb-2">Position the barcode in the frame</p>
                  <div className="h-40 w-40 border-2 border-white rounded-lg"></div>
                </div>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>

          <div className="bg-black p-4">
            {capturedImage ? (
              <div className="flex justify-center space-x-4">
                <Button variant="outline" className="bg-white text-black hover:bg-gray-100" onClick={resetCapture}>
                  Retake
                </Button>
                <Button className="bg-[#DEA818] hover:bg-[#c99616]" onClick={handleSearch} disabled={isSearching}>
                  {isSearching ? "Searching..." : "Search with this image"}
                </Button>
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <DeviceAccess
                    type="camera"
                    onPermissionGranted={() => {
                      // The code that was previously used to access the camera
                      // This would likely involve getUserMedia or similar API
                      startCamera()
                    }}
                    onPermissionDenied={() => {
                      // Handle permission denied
                      setCameraError("Camera access was denied. Please enable camera access in your browser settings.")
                    }}
                  >
                    <button
                      className="bg-white rounded-full h-16 w-16 flex items-center justify-center shadow-lg"
                      onClick={handleCapture}
                      disabled={isCapturing}
                    >
                      {mode === "camera" ? (
                        <Camera className="h-8 w-8" />
                      ) : mode === "gallery" ? (
                        <ImageIcon className="h-8 w-8" />
                      ) : (
                        <Scan className="h-8 w-8" />
                      )}
                    </button>
                  </DeviceAccess>
                </div>

                <div className="flex justify-around">
                  <button
                    className={`flex flex-col items-center ${mode === "camera" ? "text-[#DEA818]" : "text-white"}`}
                    onClick={() => setMode("camera")}
                  >
                    <Camera className="h-6 w-6 mb-1" />
                    <span className="text-xs">Camera</span>
                  </button>
                  <button
                    className={`flex flex-col items-center ${mode === "gallery" ? "text-[#DEA818]" : "text-white"}`}
                    onClick={() => setMode("gallery")}
                  >
                    <ImageIcon className="h-6 w-6 mb-1" />
                    <span className="text-xs">Gallery</span>
                  </button>
                  <button
                    className={`flex flex-col items-center ${mode === "barcode" ? "text-[#DEA818]" : "text-white"}`}
                    onClick={() => setMode("barcode")}
                  >
                    <Scan className="h-6 w-6 mb-1" />
                    <span className="text-xs">Barcode</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}
