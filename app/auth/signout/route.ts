import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    console.log("[v0] Signout requested")
    const supabase = await createClient()
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("[v0] Signout error:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log("[v0] Signout successful")

    // Return JSON response for client-side handling
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Signout exception:", error)
    return NextResponse.json({ error: "Failed to sign out" }, { status: 500 })
  }
}
