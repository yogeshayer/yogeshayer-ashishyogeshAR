"use client"

import Link from "next/link"
import { Home, Camera, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  currentPage: "home" | "scan" | "history"
}

export default function BottomNav({ currentPage }: BottomNavProps) {
  return (
    <nav className="fixed bottom-0 inset-x-0 bg-[#0a0f1a]/95 backdrop-blur-sm border-t border-primary/20 py-3 px-6 z-50 shadow-[0_-4px_20px_rgba(6,182,212,0.1)]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        <Link
          href="/home"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            currentPage === "home" ? "text-primary" : "text-muted-foreground hover:text-primary/80",
          )}
        >
          <Home className="w-6 h-6" />
          <span className="text-xs font-medium">Home</span>
        </Link>

        <Link href="/scan" className="flex flex-col items-center gap-1">
          <div
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-primary/30 transition-all -mt-6",
              currentPage === "scan"
                ? "bg-gradient-to-br from-primary via-primary to-secondary"
                : "bg-gradient-to-br from-primary/90 via-primary/90 to-secondary/90 hover:from-primary hover:via-primary hover:to-secondary",
            )}
          >
            <Camera className="w-6 h-6 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-xs font-medium text-primary">Scan</span>
        </Link>

        <Link
          href="/history"
          className={cn(
            "flex flex-col items-center gap-1 transition-colors",
            currentPage === "history" ? "text-primary" : "text-muted-foreground hover:text-primary/80",
          )}
        >
          <Clock className="w-6 h-6" />
          <span className="text-xs font-medium">History</span>
        </Link>
      </div>
    </nav>
  )
}
