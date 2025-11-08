"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import Image from "next/image"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      router.push("/home")
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign in")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    const supabase = createClient()
    setIsLoading(true)
    setError(null)

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) throw error
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google")
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1419] relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            <svg width="120" height="120" viewBox="0 0 120 120" className="text-cyan-400">
              <path
                d="M60 30 Q70 40 60 50 Q50 40 60 30 M60 50 L60 90 M40 60 Q50 55 60 60 Q70 55 80 60"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </div>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center px-6 py-12">
        <div className="flex flex-col items-center gap-4 mb-12">
          <Image src="/flora-scans-logo.png" alt="Flora Scans" width={120} height={120} className="mb-2" />
          <div className="text-center">
            <h2 className="text-3xl font-bold text-cyan-400">Flora Scans</h2>
            <p className="text-green-400 text-sm mt-1">Identify plants with AR technology</p>
          </div>
        </div>

        <h1 className="text-4xl font-bold text-white mb-12">Welcome Back</h1>

        <form onSubmit={handleLogin} className="w-full max-w-md space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
            className="w-full px-6 py-4 rounded-full border-2 border-cyan-500/30 bg-[#1a2332] text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 disabled:opacity-50 transition-all"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={isLoading}
              className="w-full px-6 py-4 rounded-full border-2 border-cyan-500/30 bg-[#1a2332] text-white placeholder:text-gray-400 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 pr-14 disabled:opacity-50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
            >
              {showPassword ? <EyeOff className="w-6 h-6" /> : <Eye className="w-6 h-6" />}
            </button>
          </div>

          {error && <p className="text-sm text-red-400 text-center px-4">{error}</p>}

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-6 rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white text-lg font-semibold shadow-lg shadow-cyan-500/30 transition-all"
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <Button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="w-full py-6 rounded-full bg-[#1a2332] border-2 border-cyan-500/30 hover:border-cyan-400 text-white text-lg font-semibold flex items-center justify-center gap-3 transition-all"
          >
            Sign In with Google
            <svg width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </Button>
        </form>

        <div className="mt-8 text-center space-y-4">
          <p className="text-gray-300">
            {"Don't have an account? "}
            <button
              onClick={() => router.push("/auth/signup")}
              className="text-green-400 font-semibold hover:text-green-300 transition-colors"
            >
              Sign Up
            </button>
          </p>
          <button
            onClick={() => router.push("/auth/forgot-password")}
            className="block w-full text-green-400 font-semibold hover:text-green-300 transition-colors"
          >
            Forgot Password?
          </button>
        </div>
      </div>
    </div>
  )
}
