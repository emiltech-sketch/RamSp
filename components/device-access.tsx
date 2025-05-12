"use client"

import type React from "react"

import { useState } from "react"
import { Camera, Mic, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"

interface DeviceAccessProps {
  type: "camera" | "microphone" | "location"
  children: React.ReactNode
  onPermissionGranted: () => void
  onPermissionDenied: () => void
}

export default function DeviceAccess({ type, children, onPermissionGranted, onPermissionDenied }: DeviceAccessProps) {
  const [showDialog, setShowDialog] = useState(false)
  const [permissionStatus, setPermissionStatus] = useState<PermissionState | null>(null)

  const checkPermission = async () => {
    try {
      if (type === "camera") {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const permission = await navigator.permissions.query({ name: "camera" as PermissionName })
          setPermissionStatus(permission.state)

          if (permission.state === "granted") {
            onPermissionGranted()
          } else if (permission.state === "prompt") {
            setShowDialog(true)
          } else {
            onPermissionDenied()
          }
        } else {
          onPermissionDenied()
        }
      } else if (type === "microphone") {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const permission = await navigator.permissions.query({ name: "microphone" as PermissionName })
          setPermissionStatus(permission.state)

          if (permission.state === "granted") {
            onPermissionGranted()
          } else if (permission.state === "prompt") {
            setShowDialog(true)
          } else {
            onPermissionDenied()
          }
        } else {
          onPermissionDenied()
        }
      } else if (type === "location") {
        if (navigator.geolocation) {
          const permission = await navigator.permissions.query({ name: "geolocation" })
          setPermissionStatus(permission.state)

          if (permission.state === "granted") {
            onPermissionGranted()
          } else if (permission.state === "prompt") {
            setShowDialog(true)
          } else {
            onPermissionDenied()
          }
        } else {
          onPermissionDenied()
        }
      }
    } catch (error) {
      console.error("Error checking permission:", error)
      onPermissionDenied()
    }
  }

  const requestPermission = async () => {
    try {
      if (type === "camera") {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ video: true })
          onPermissionGranted()
          setShowDialog(false)
        } else {
          onPermissionDenied()
        }
      } else if (type === "microphone") {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          await navigator.mediaDevices.getUserMedia({ audio: true })
          onPermissionGranted()
          setShowDialog(false)
        } else {
          onPermissionDenied()
        }
      } else if (type === "location") {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            () => {
              onPermissionGranted()
              setShowDialog(false)
            },
            () => {
              onPermissionDenied()
              setShowDialog(false)
            },
          )
        } else {
          onPermissionDenied()
        }
      }
    } catch (error) {
      console.error("Error requesting permission:", error)
      onPermissionDenied()
      setShowDialog(false)
    }
  }

  const getIcon = () => {
    switch (type) {
      case "camera":
        return <Camera className="h-10 w-10 text-[#40E0D0] mb-3" />
      case "microphone":
        return <Mic className="h-10 w-10 text-[#40E0D0] mb-3" />
      case "location":
        return <MapPin className="h-10 w-10 text-[#40E0D0] mb-3" />
    }
  }

  const getTitle = () => {
    switch (type) {
      case "camera":
        return "Camera Access"
      case "microphone":
        return "Microphone Access"
      case "location":
        return "Location Access"
    }
  }

  const getDescription = () => {
    switch (type) {
      case "camera":
        return "RamSphere needs access to your camera to scan barcodes and QR codes, and to take product images."
      case "microphone":
        return "RamSphere needs access to your microphone for voice search and voice commands."
      case "location":
        return "RamSphere needs access to your location to provide nearby store information and accurate delivery estimates."
    }
  }

  return (
    <>
      <div onClick={checkPermission}>{children}</div>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex flex-col items-center text-center">
              {getIcon()}
              <DialogTitle>{getTitle()}</DialogTitle>
              <DialogDescription className="pt-2">{getDescription()}</DialogDescription>
            </div>
          </DialogHeader>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowDialog(false)
                onPermissionDenied()
              }}
            >
              Deny
            </Button>
            <Button className="bg-[#40E0D0] hover:bg-[#3bc9bb]" onClick={requestPermission}>
              Allow
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
