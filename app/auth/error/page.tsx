import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default async function AuthErrorPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-[#0f1419] relative overflow-hidden flex items-center justify-center p-6">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-green-500 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center gap-4 mb-8">
          <Image src="/flora-scans-logo.png" alt="Flora Scans" width={100} height={100} />
          <h2 className="text-2xl font-bold text-cyan-400">Flora Scans</h2>
        </div>

        <Card className="bg-[#1a2332] border-2 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-2xl text-red-400">Authentication Error</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-300">{params?.error || "An error occurred during authentication."}</p>
            <Link href="/">
              <Button className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/30">
                Back to Login
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
