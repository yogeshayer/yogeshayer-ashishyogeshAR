import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import BottomNav from "@/components/bottom-nav"
import { Camera } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import SignOutButton from "@/components/sign-out-button"

export default async function HomePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Image src="/flora-scans-logo.png" alt="Flora Scans" width={48} height={48} className="rounded-lg" />
            <div>
              <div className="text-xl font-bold text-primary">Flora Scans</div>
            </div>
          </div>
          <SignOutButton />
        </div>

        {/* Welcome Message */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back!</h1>
          <p className="text-muted-foreground">Discover and identify plants with a simple scan</p>
        </div>

        <Link href="/scan">
          <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-8 text-primary-foreground shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Start Scanning</h2>
                <p className="text-primary-foreground/90">Point your camera at any plant</p>
              </div>
              <div className="bg-primary-foreground/20 p-4 rounded-full">
                <Camera className="w-8 h-8" />
              </div>
            </div>
          </div>
        </Link>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="text-3xl font-bold text-foreground mb-1">1000+</div>
            <div className="text-sm text-muted-foreground">Plant Species</div>
          </div>
          <div className="bg-card rounded-2xl p-4 shadow-sm border border-border">
            <div className="text-3xl font-bold text-foreground mb-1">98%</div>
            <div className="text-sm text-muted-foreground">Accuracy</div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-foreground mb-4">Features</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="bg-secondary/20 p-2 rounded-lg">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">Instant Identification</div>
                <div className="text-sm text-muted-foreground">Get plant info in seconds</div>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-card rounded-xl p-4 shadow-sm border border-border">
              <div className="bg-primary/20 p-2 rounded-lg">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <div className="font-semibold text-foreground">Care Instructions</div>
                <div className="text-sm text-muted-foreground">Learn how to care for plants</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <BottomNav currentPage="home" />
    </div>
  )
}
