import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const error = requestUrl.searchParams.get("error")

  if (error) {
    return NextResponse.redirect(new URL(`/auth/error?error=${error}`, request.url))
  }

  if (code) {
    const supabase = await createClient()
    const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code)

    if (exchangeError) {
      return NextResponse.redirect(new URL(`/auth/error?error=${exchangeError.message}`, request.url))
    }
  }

  return NextResponse.redirect(new URL("/home", request.url))
}
