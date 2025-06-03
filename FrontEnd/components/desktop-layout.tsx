"use client"

import type { ReactNode } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"

interface DesktopLayoutProps {
  children: ReactNode
  activeTab?: string
}

export function DesktopLayout({ children, activeTab }: DesktopLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0E0E0E] text-[#F4EBDC]">
      {/* Sidebar for desktop */}
      <div className="hidden lg:block">
        <Sidebar activeTab={activeTab} />
      </div>

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        <TopBar />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>

      {/* Mobile bottom navigation - hidden on desktop */}
      <div className="lg:hidden">{/* This will be handled by individual pages for mobile */}</div>
    </div>
  )
}
