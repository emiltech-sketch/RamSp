"use client"

import { useEffect, useRef, useState } from "react"
import { GOOGLE_MAPS_API_KEY } from "@/lib/config"
import DeviceAccess from "./device-access" // Add import for DeviceAccess
import { Button } from "@/components/ui/button"
import { MapPin } from "lucide-react"

interface GoogleMapsProps {
  onSelectLocation: (location: { lat: number; lng: number; address: string }) => void
  initialLocation?: { lat: number; lng: number }
}

// Declare google variable
declare global {
  interface Window {
    google: any
  }
}

export default function GoogleMaps({ onSelectLocation, initialLocation }: GoogleMapsProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [geocoder, setGeocoder] = useState<google.maps.Geocoder | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Default location (New York City)
  const defaultLocation = { lat: 40.7128, lng: -74.006 }
  const location = initialLocation || defaultLocation

  // Load Google Maps script
  useEffect(() => {
    if (!mapLoaded) {
      const script = document.createElement("script")
      script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = () => setMapLoaded(true)
      document.head.appendChild(script)

      return () => {
        document.head.removeChild(script)
      }
    }
  }, [mapLoaded])

  // Initialize map
  useEffect(() => {
    if (mapLoaded && mapRef.current) {
      const mapOptions: google.maps.MapOptions = {
        center: location,
        zoom: 15,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }

      // Ensure google is defined before using it
      if (typeof window.google === "undefined") {
        console.error("Google Maps API not loaded")
        return
      }

      const newMap = new window.google.maps.Map(mapRef.current, mapOptions)
      setMap(newMap)

      const newMarker = new window.google.maps.Marker({
        position: location,
        map: newMap,
        draggable: true,
        animation: window.google.maps.Animation.DROP,
      })
      setMarker(newMarker)

      const newGeocoder = new window.google.maps.Geocoder()
      setGeocoder(newGeocoder)

      // Get initial address
      newGeocoder.geocode({ location }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          onSelectLocation({
            lat: location.lat,
            lng: location.lng,
            address: results[0].formatted_address,
          })
        }
      })

      // Add click event to map
      newMap.addListener("click", (e: google.maps.MapMouseEvent) => {
        if (e.latLng && newMarker) {
          const clickedLocation = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
          }

          newMarker.setPosition(clickedLocation)

          // Get address from coordinates
          newGeocoder.geocode({ location: clickedLocation }, (results, status) => {
            if (status === "OK" && results && results[0]) {
              onSelectLocation({
                lat: clickedLocation.lat,
                lng: clickedLocation.lng,
                address: results[0].formatted_address,
              })
            }
          })
        }
      })

      // Add dragend event to marker
      newMarker.addListener("dragend", () => {
        if (newMarker) {
          const position = newMarker.getPosition()
          if (position) {
            const newLocation = {
              lat: position.lat(),
              lng: position.lng(),
            }

            // Get address from coordinates
            newGeocoder.geocode({ location: newLocation }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                onSelectLocation({
                  lat: newLocation.lat,
                  lng: newLocation.lng,
                  address: results[0].formatted_address,
                })
              }
            })
          }
        }
      })
    }
  }, [mapLoaded, location, onSelectLocation])

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }

          if (map && marker && geocoder) {
            map.setCenter(currentLocation)
            marker.setPosition(currentLocation)

            geocoder.geocode({ location: currentLocation }, (results, status) => {
              if (status === "OK" && results && results[0]) {
                onSelectLocation({
                  lat: currentLocation.lat,
                  lng: currentLocation.lng,
                  address: results[0].formatted_address,
                })
              }
            })
          }
        },
        (error) => {
          console.error("Error getting current location:", error)
          setError("Failed to get current location.")
        },
      )
    } else {
      console.error("Geolocation is not supported by this browser.")
      setError("Geolocation is not supported by this browser.")
    }
  }

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden">
      {!mapLoaded && (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <p className="text-gray-500">Loading map...</p>
        </div>
      )}
      <div ref={mapRef} className="w-full h-full relative">
        {error && <div className="absolute top-2 left-2 bg-red-500 text-white p-2 rounded">{error}</div>}
        <div className="absolute top-2 right-2 z-10">
          <DeviceAccess
            type="location"
            onPermissionGranted={() => {
              // The code that was previously used to access location
              getCurrentLocation()
            }}
            onPermissionDenied={() => {
              // Handle permission denied
              setError("Location access was denied. Please enable location access in your browser settings.")
            }}
          >
            <Button>
              <MapPin className="mr-2 h-4 w-4" />
              Use current location
            </Button>
          </DeviceAccess>
        </div>
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </div>
  )
}
