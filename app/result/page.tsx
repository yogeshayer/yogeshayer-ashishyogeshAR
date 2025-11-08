"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import BottomNav from "@/components/bottom-nav"
import { Heart, ChevronDown, ChevronUp, Droplets, Sun, Thermometer, Sprout } from "lucide-react"

export default function ResultPage() {
  const [showDetails, setShowDetails] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [plantData, setPlantData] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Load plant data from sessionStorage
    const storedData = sessionStorage.getItem("plantData")
    if (storedData) {
      const data = JSON.parse(storedData)
      setPlantData(data)
      saveScan(data)
    } else {
      // If no data, redirect to scan page
      router.push("/scan")
    }
  }, [])

  const saveScan = async (data: any) => {
    setIsSaving(true)
    const supabase = createClient()

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/")
        return
      }

      const { error } = await supabase.from("scans").insert({
        user_id: user.id,
        plant_name: data.name,
        scientific_name: data.scientific_name,
        origin: data.origin || "Unknown",
        description: data.description,
        care_tips: data.characteristics || [],
        image_url: data.imageUrl,
      })

      if (error) throw error
    } catch (err) {
      console.error("Error saving scan:", err)
    } finally {
      setIsSaving(false)
    }
  }

  if (!plantData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading results...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Hero image */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={plantData.imageUrl || "/placeholder.svg"}
          alt={plantData.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Content */}
      <div className="px-6 -mt-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-4xl font-bold text-balance text-foreground">{plantData.name}</h1>
          {plantData.confidence && (
            <div className="bg-secondary/20 px-3 py-1 rounded-full">
              <span className="text-secondary font-semibold text-sm">{plantData.confidence}%</span>
            </div>
          )}
        </div>
        <p className="text-center text-muted-foreground text-lg mb-6 italic">{plantData.scientific_name}</p>

        {/* Description */}
        <p className="text-muted-foreground text-base leading-relaxed mb-6">{plantData.description}</p>

        {/* Care Information */}
        {plantData.care && (
          <div className="bg-card border border-border rounded-2xl p-5 mb-6 shadow-sm">
            <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <Heart className="w-5 h-5 text-secondary" fill="currentColor" />
              Care Guide
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-start gap-2">
                <Droplets className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">Water</div>
                  <div className="text-sm text-foreground">{plantData.care.water}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sun className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">Light</div>
                  <div className="text-sm text-foreground">{plantData.care.light}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Thermometer className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">Temperature</div>
                  <div className="text-sm text-foreground">{plantData.care.temperature}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Sprout className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-muted-foreground">Soil</div>
                  <div className="text-sm text-foreground">{plantData.care.soil}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-primary font-semibold mb-6 flex items-center justify-center gap-2 hover:text-primary/80 transition-colors"
        >
          {showDetails ? (
            <>
              <ChevronUp className="w-5 h-5" />
              Less Details
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5" />
              More Details
            </>
          )}
        </button>

        {showDetails && (
          <div className="mb-6 animate-in slide-in-from-top duration-300 space-y-6">
            {/* Characteristics */}
            {plantData.characteristics && plantData.characteristics.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Characteristics</h3>
                <ul className="space-y-2">
                  {plantData.characteristics.map((char: string, index: number) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="text-lg font-bold text-secondary">•</span>
                      <span>{char}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Uses */}
            {plantData.uses && plantData.uses.length > 0 && (
              <div>
                <h3 className="text-xl font-bold text-foreground mb-3">Uses</h3>
                <ul className="space-y-2">
                  {plantData.uses.map((use: string, index: number) => (
                    <li key={index} className="flex gap-3 text-muted-foreground">
                      <span className="text-lg font-bold text-primary">•</span>
                      <span>{use}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Toxicity */}
            {plantData.toxicity && (
              <div className="bg-card border border-border rounded-2xl p-4">
                <h3 className="text-lg font-bold text-foreground mb-2">Safety Information</h3>
                <p className="text-muted-foreground">{plantData.toxicity}</p>
              </div>
            )}
          </div>
        )}

        <Button
          onClick={() => router.push("/scan")}
          className="w-full py-6 rounded-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg font-semibold flex items-center justify-center gap-3 shadow-lg"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
          </svg>
          Scan Again
        </Button>
      </div>

      <BottomNav currentPage="scan" />
    </div>
  )
}
