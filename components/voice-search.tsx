"use client"

import { useState, useEffect, useRef } from "react"
import { Mic, X, ArrowLeft, MicOff } from "lucide-react"
// Add import for DeviceAccess
import DeviceAccess from "./device-access"

interface VoiceSearchProps {
  onClose: () => void
}

export default function VoiceSearch({ onClose }: VoiceSearchProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState("")
  const [searchResults, setSearchResults] = useState<any[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  // For real speech recognition
  const recognitionRef = useRef<any>(null)
  const isRecognitionSupported =
    typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window)

  useEffect(() => {
    // Initialize speech recognition
    if (isRecognitionSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = "en-US"

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const result = event.results[current]
        const transcriptValue = result[0].transcript
        setTranscript(transcriptValue)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error("Speech recognition error", event.error)
        setError(`Error: ${event.error}. Please try again.`)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        if (isListening) {
          // If we're still supposed to be listening, restart
          recognitionRef.current.start()
        }
      }
    } else {
      setError("Speech recognition is not supported in your browser. Using simulation mode.")
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [isRecognitionSupported])

  useEffect(() => {
    if (isListening) {
      if (isRecognitionSupported && recognitionRef.current) {
        try {
          recognitionRef.current.start()
          setError(null)
        } catch (err) {
          console.error("Error starting speech recognition:", err)
          setError("Could not start speech recognition. Please try again.")
          setIsListening(false)
        }
      } else {
        // Fallback to simulation for demo purposes
        const timer = setTimeout(() => {
          setTranscript("washing machine")
          setIsListening(false)

          // Simulate search results
          setTimeout(() => {
            setSearchResults([
              {
                id: 1,
                name: "Washing Machine",
                price: "$499.99",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
              },
              {
                id: 2,
                name: "Portable Washing Machine",
                price: "$299.99",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
              },
              {
                id: 3,
                name: "Mini Washing Machine",
                price: "$199.99",
                image:
                  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
              },
            ])
          }, 1000)
        }, 2000)

        return () => clearTimeout(timer)
      }
    } else if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
  }, [isListening, isRecognitionSupported])

  const startListening = () => {
    setIsListening(true)
    setTranscript("")
    setSearchResults(null)
    setError(null)
  }

  const stopListening = () => {
    setIsListening(false)
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }

    if (transcript.trim()) {
      // Simulate search results
      setTimeout(() => {
        setSearchResults([
          {
            id: 1,
            name: `${transcript} Product 1`,
            price: "$499.99",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
          },
          {
            id: 2,
            name: `${transcript} Product 2`,
            price: "$299.99",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
          },
          {
            id: 3,
            name: `${transcript} Product 3`,
            price: "$199.99",
            image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-03-16%2014.14.53-firaaQh1drI3JIje93XnpN14z4gsIe.png",
          },
        ])
      }, 1000)
    }
  }

  const startVoiceRecording = () => {
    startListening()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex flex-col">
      <header className="bg-[#40E0D0] p-4 flex items-center justify-between">
        <button onClick={onClose} className="text-white">
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-white font-bold text-lg">Voice Search</h1>
        <button onClick={onClose} className="text-white">
          <X className="h-6 w-6" />
        </button>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {searchResults ? (
          <div className="w-full">
            <p className="text-white text-center mb-4">
              Search results for: <span className="font-bold">"{transcript}"</span>
            </p>

            <div className="bg-white rounded-lg p-4 max-h-[60vh] overflow-y-auto">
              {searchResults.map((item) => (
                <a
                  href={`/product/${item.id}`}
                  key={item.id}
                  className="flex items-center p-2 border-b border-gray-100"
                >
                  <div className="w-16 h-16 bg-gray-100 rounded-md flex items-center justify-center mr-3">
                    <img src={item.image || "/placeholder.svg"} alt={item.name} className="max-h-14 max-w-14" />
                  </div>
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-[#DEA818] font-bold">{item.price}</p>
                  </div>
                </a>
              ))}

              <button className="mt-4 w-full bg-[#DEA818] text-white p-2 rounded-lg" onClick={startListening}>
                Search Again
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="relative mb-8">
              <div
                className={`absolute inset-0 bg-[#40E0D0] rounded-full ${isListening ? "opacity-20 animate-ping" : "opacity-10"}`}
              ></div>
              <div
                className={`absolute inset-4 bg-[#40E0D0] rounded-full ${isListening ? "opacity-30" : "opacity-20"}`}
              ></div>
              <DeviceAccess
                type="microphone"
                onPermissionGranted={() => {
                  // The code that was previously used to access the microphone
                  startVoiceRecording()
                }}
                onPermissionDenied={() => {
                  // Handle permission denied
                  setError("Microphone access was denied. Please enable microphone access in your browser settings.")
                }}
              >
                <button className="relative h-24 w-24 rounded-full bg-[#40E0D0] flex items-center justify-center">
                  {isListening ? <MicOff className="h-10 w-10 text-white" /> : <Mic className="h-10 w-10 text-white" />}
                </button>
              </DeviceAccess>
            </div>

            {error && (
              <div className="text-red-400 mb-4 text-center">
                <p>{error}</p>
              </div>
            )}

            {isListening ? (
              <div className="text-center">
                <p className="text-white text-xl mb-2">Listening...</p>
                <p className="text-white opacity-70">Speak now to search for products</p>
                {transcript && (
                  <div className="mt-4 p-3 bg-white/10 rounded-lg">
                    <p className="text-white">{transcript}</p>
                  </div>
                )}
                <button className="bg-[#DEA818] text-white px-6 py-2 rounded-full mt-4" onClick={stopListening}>
                  Stop Listening
                </button>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-white text-xl mb-2">{transcript ? transcript : "Tap to speak"}</p>
                <button className="bg-[#DEA818] text-white px-6 py-2 rounded-full mt-4" onClick={startListening}>
                  {transcript ? "Search Again" : "Start Listening"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
