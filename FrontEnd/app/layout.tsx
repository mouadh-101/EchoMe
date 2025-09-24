import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AppShell } from "@/components/layout/app-shell"
import { Toaster } from "@/components/ui/toaster"
import KeepAlive from "@/components/keepAlive"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" })

export const metadata: Metadata = {
  title: "EchoMe - Your Audio Memory Assistant",
  description: "Record, transcribe, and organize your voice notes with AI",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
           <div className="w-full bg-yellow-400 text-black text-center py-2 text-sm font-medium">
            🚧 This app is under construction (Beta) — for experiment & learning purposes. 
            Any feedback would be greatly appreciated 🙌
          </div>
          <AppShell>
            <KeepAlive />
            {children}
            </AppShell>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
