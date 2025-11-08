"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import BottomNav from "@/components/bottom-nav"
import { Camera, X } from "lucide-react"
import Image from "next/image"

export default function ScanPage() {
  const [isScanning, setIsScanning] = useState(false)
  const [isCameraActive, setIsCameraActive] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const router = useRouter()

  useEffect(() => {
    startCamera()
    return () => {
      stopCamera()
    }
  }, [])

  const startCamera = async () => {
    try {
      console.log("[v0] Requesting camera access...")
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" }, // Use back camera on mobile
        audio: false,
      })

      console.log("[v0] Camera access granted")
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        streamRef.current = stream
        setIsCameraActive(true)
        setError(null)
      }
    } catch (err) {
      console.error("[v0] Error accessing camera:", err)
      setError("Unable to access camera. Please check permissions.")
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsCameraActive(false)
  }

  const handleScan = async () => {
    if (!isCameraActive || !videoRef.current) {
      setError("Camera not active")
      return
    }

    setIsScanning(true)
    console.log("[v0] Starting scan...")

    try {
      // Create canvas to capture frame
      const canvas = document.createElement("canvas")
      canvas.width = videoRef.current.videoWidth
      canvas.height = videoRef.current.videoHeight
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        throw new Error("Could not get canvas context")
      }

      // Draw current video frame to canvas
      ctx.drawImage(videoRef.current, 0, 0)

      // Convert to base64
      const imageData = canvas.toDataURL("image/jpeg", 0.8)
      console.log("[v0] Image captured, sending to AI...")

      // Call AI API
      const response = await fetch("/api/identify-plant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ image: imageData }),
      })

      if (!response.ok) {
        throw new Error("Failed to identify plant")
      }

      const plantData = await response.json()
      console.log("[v0] Plant identified:", plantData.name)

      // Store the result and captured image in sessionStorage
      sessionStorage.setItem(
        "plantData",
        JSON.stringify({
          ...plantData,
          imageUrl: imageData,
        }),
      )

      console.log("[v0] Scan complete, navigating to results")
      stopCamera()
      router.push("/result")
    } catch (err) {
      console.error("[v0] Error during scan:", err)
      setError("Failed to identify plant. Please try again.")
      setIsScanning(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <div className="flex items-center justify-between py-6 px-6">
        <div className="flex items-center gap-2">
          <Image src="/flora-scans-logo.png" alt="Flora Scans" width={40} height={40} className="rounded-lg" />
          <div className="text-foreground text-xl font-bold">Flora Scans</div>
        </div>
        <button
          onClick={() => router.push("/home")}
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-4">
        <h1 className="text-foreground text-3xl font-bold mb-2 text-center">Plant Scanner</h1>
        <p className="text-muted-foreground text-center mb-8 max-w-sm">Point your camera at a plant to identify it</p>

        <div className="relative w-full max-w-md aspect-square mb-8 rounded-2xl overflow-hidden">
          {/* Video element for camera feed */}
          <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />

          {/* Error message */}
          {error && (
            <div className="absolute inset-0 bg-background/90 flex items-center justify-center p-6">
              <p className="text-destructive text-center">{error}</p>
            </div>
          )}

          {/* Scanning animation overlay */}
          {isScanning && (
            <div className="absolute inset-0 z-10">
              <div className="absolute inset-0 border-4 border-secondary rounded-2xl animate-pulse-cyan" />
              <div className="absolute inset-0 bg-secondary/20 animate-pulse" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-scan" />
            </div>
          )}

          <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 320 320">
            <path
              d="M 40 20 L 20 20 L 20 40"
              stroke="currentColor"
              className={`${isScanning ? "text-secondary animate-pulse-cyan" : "text-primary"}`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 280 20 L 300 20 L 300 40"
              stroke="currentColor"
              className={`${isScanning ? "text-secondary animate-pulse-cyan" : "text-primary"}`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 20 280 L 20 300 L 40 300"
              stroke="currentColor"
              className={`${isScanning ? "text-secondary animate-pulse-cyan" : "text-primary"}`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M 280 300 L 300 300 L 300 280"
              stroke="currentColor"
              className={`${isScanning ? "text-secondary animate-pulse-cyan" : "text-primary"}`}
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Center guide */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-12 h-12 border-2 border-primary/50 rounded-full" />
          </div>
        </div>

        {/* Scan button above bottom nav to fix positioning */}
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={handleScan}
            disabled={isScanning || !isCameraActive}
            className="w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary to-secondary flex items-center justify-center hover:scale-105 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/40"
          >
            <Camera className="w-8 h-8 text-primary-foreground" strokeWidth={2} />
          </button>

          {isScanning && <p className="text-foreground text-sm font-medium animate-pulse">Analyzing plant...</p>}
        </div>
      </div>

      <BottomNav currentPage="scan" />
    </div>
  )
}
