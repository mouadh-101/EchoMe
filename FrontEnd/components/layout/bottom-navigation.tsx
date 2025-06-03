"use client"

import Link from "next/link"
import { Home, Mic, FolderOpen, Brain, CheckSquare } from "lucide-react"

interface BottomNavigationProps {
  activeTab: string
}

export function BottomNavigation({ activeTab }: BottomNavigationProps) {
  const tabs = [
    { id: "dashboard", icon: Home, label: "Home", href: "/dashboard" },
    { id: "record", icon: Mic, label: "Record", href: "/record" },
    { id: "library", icon: FolderOpen, label: "Library", href: "/library" },
    { id: "summary", icon: Brain, label: "Summary", href: "/summary" },
    { id: "todos", icon: CheckSquare, label: "To-Dos", href: "/todos" },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#1A1A1A] border-t border-[#333333] py-2 px-4 z-50">
      <div className="container max-w-md mx-auto">
        <div className="flex justify-between items-center">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab
            const Icon = tab.icon

            return (
              <Link
                key={tab.id}
                href={tab.href}
                className={`flex flex-col items-center py-2 px-4 rounded-lg ${
                  isActive ? "text-[#1FB2A6]" : "text-[#F4EBDC]/50 hover:text-[#F4EBDC]/80"
                }`}
              >
                <Icon className={`h-6 w-6 ${isActive ? "text-[#1FB2A6]" : ""}`} />
                <span className="text-xs mt-1">{tab.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
