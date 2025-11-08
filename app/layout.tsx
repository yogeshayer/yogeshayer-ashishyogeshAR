import type { Metadata } from "next"
import type React from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Flora Scans - Plant Identification App",
  description: "Identify and learn about plants with AI-powered scanning technology",
   generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
        <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
