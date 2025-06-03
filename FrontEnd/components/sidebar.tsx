"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Mic, FolderOpen, Brain, Settings, User, LogOut } from "lucide-react"

interface SidebarProps {
  activeTab?: string
}

export function Sidebar({ activeTab }: SidebarProps) {
  const navItems = [
    { id: "home", icon: Home, label: "Dashboard", href: "/dashboard" },
    { id: "record", icon: Mic, label: "Record", href: "/record" },
    { id: "library", icon: FolderOpen, label: "Library", href: "/library" },
    { id: "smart", icon: Brain, label: "Smart Insights", href: "/smart" },
    { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div className="w-64 bg-[#1A1A1A] border-r border-[#333333] flex flex-col h-screen">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#333333]">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1FB2A6] rounded-xl flex items-center justify-center">
            <Mic className="h-6 w-6 text-[#0E0E0E]" />
          </div>
          <span className="font-serif text-xl font-bold">EchoMe</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = item.id === activeTab
          const Icon = item.icon

          return (
            <Link key={item.id} href={item.href}>
              <Button
                variant="ghost"
                className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#1FB2A6] text-[#0E0E0E] shadow-[0_0_15px_rgba(31,178,166,0.3)]"
                    : "text-[#F4EBDC]/70 hover:text-[#F4EBDC] hover:bg-[#0E0E0E]/50"
                }`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? "text-[#0E0E0E]" : ""}`} />
                {item.label}
              </Button>
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="p-4 border-t border-[#333333]">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#1FB2A6] rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-[#0E0E0E]" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Alex Johnson</p>
            <p className="text-xs text-[#F4EBDC]/50 truncate">Premium</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-full justify-start px-4 py-2 rounded-xl text-[#F4EBDC]/70 hover:text-[#F4EBDC] hover:bg-[#0E0E0E]/50"
        >
          <LogOut className="mr-3 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </div>
  )
}
