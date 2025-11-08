import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="mb-8">
          <svg width="120" height="120" viewBox="0 0 120 120" className="mx-auto" fill="none">
            <circle cx="60" cy="60" r="50" stroke="#26C6DA" strokeWidth="4" />
            <path
              d="M40 50C40 50 45 45 50 45C55 45 60 50 60 50M60 50C60 50 65 45 70 45C75 45 80 50 80 50"
              stroke="#26C6DA"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d="M35 75C35 75 45 85 60 85C75 85 85 75 85 75"
              stroke="#26C6DA"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8">Oops! The page you're looking for doesn't exist or has been moved.</p>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
