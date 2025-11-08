import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import BottomNav from "@/components/bottom-nav"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

export default async function HistoryPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/")
  }

  const { data: scans, error } = await supabase.from("scans").select("*").order("created_at", { ascending: false })

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Scan History</h1>
          <p className="text-muted-foreground">
            {scans && scans.length > 0
              ? `You have ${scans.length} ${scans.length === 1 ? "scan" : "scans"}`
              : "No scans yet"}
          </p>
        </div>

        {/* Scans list */}
        {scans && scans.length > 0 ? (
          <div className="space-y-4">
            {scans.map((scan) => (
              <div
                key={scan.id}
                className="bg-card border border-border rounded-2xl shadow-sm overflow-hidden hover:shadow-md hover:shadow-primary/5 transition-all"
              >
                <div className="flex gap-4 p-4">
                  <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={scan.image_url || "/placeholder.svg"}
                      alt={scan.plant_name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-foreground mb-1 truncate">{scan.plant_name}</h3>
                    <p className="text-sm text-muted-foreground italic mb-2 truncate">{scan.scientific_name}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      <span>
                        {formatDistanceToNow(new Date(scan.created_at), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-primary/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
              <svg className="w-12 h-12 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">No scans yet</h3>
            <p className="text-muted-foreground mb-6">Start scanning plants to build your history</p>
            <Link
              href="/scan"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:bg-primary/90 transition-colors shadow-lg"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M9 3v18M15 3v18M3 9h18M3 15h18" />
              </svg>
              Start Scanning
            </Link>
          </div>
        )}
      </div>

      <BottomNav currentPage="history" />
    </div>
  )
}
