"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto" fill="none">
            <circle cx="60" cy="60" r="50" stroke="#EF4444" strokeWidth="4" />
            <path d="M45 45L75 75M75 45L45 75" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Something went wrong!</h2>
        <p className="text-gray-600 mb-8">We encountered an unexpected error. Please try again.</p>
        <Button
          onClick={reset}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold"
        >
          Try Again
        </Button>
      </div>
    </div>
  )
}
