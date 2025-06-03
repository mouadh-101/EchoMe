"use client"

import { type ReactNode, useState, useEffect } from "react"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { BottomNavigation } from "@/components/layout/bottom-navigation"
import { usePathname } from "next/navigation"

interface AppShellProps {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname()
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on client side
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    checkIfMobile()
    window.addEventListener("resize", checkIfMobile)

    return () => {
      window.removeEventListener("resize", checkIfMobile)
    }
  }, [])

  // Skip app shell for auth pages
  if (pathname === "/" || pathname === "/auth") {
    return <>{children}</>
  }

  // Extract the current section from the pathname
  const currentSection = pathname.split("/")[1] || "dashboard"

  return (
    <div className="flex min-h-screen bg-[#0E0E0E] text-[#F4EBDC]">
      {/* Sidebar - hidden on mobile */}
      <div className="hidden lg:block">
        <AppSidebar activeSection={currentSection} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto pb-20 lg:pb-0">{children}</main>

        {/* Bottom navigation - only on mobile */}
        {isMobile && <BottomNavigation activeTab={currentSection} />}
      </div>
    </div>
  )
}
