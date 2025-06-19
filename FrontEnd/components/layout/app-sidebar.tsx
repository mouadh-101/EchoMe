"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Home,
  Mic,
  FolderOpen,
  Brain,
  Zap,
  CheckSquare,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { authService } from "@/app/services/authService"
import { UserData } from "@/app/services/authService"
import { useState, useEffect } from "react"


interface AppSidebarProps {
  activeSection: string
}

export function AppSidebar({ activeSection }: AppSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  const fetchUser = async () => {
    try {
      const response = await authService.whoami()
      if (response.status === "success") {
        setUser(response.data)
      } else {
        console.error("User fetch failed:", response.message)
      }
    } catch (error) {
      console.error("Error fetching user:", error)
    }
  }
  useEffect(() => {
    fetchUser()
  }, [])
  const navItems = [
    { id: "dashboard", icon: Home, label: "Dashboard", href: "/dashboard" },
    { id: "record", icon: Mic, label: "Record", href: "/record" },
    { id: "library", icon: FolderOpen, label: "Library", href: "/library" },
    { id: "summary", icon: Brain, label: "Smart Summary", href: "/summary" },
    { id: "actions", icon: Zap, label: "Smart Actions", href: "/actions" },
    { id: "todos", icon: CheckSquare, label: "To-Do Lists", href: "/todos" },
    { id: "settings", icon: Settings, label: "Settings", href: "/settings" },
  ]

  return (
    <div
      className={`bg-[#1A1A1A] border-r border-[#333333] flex flex-col h-screen transition-all duration-300 ${collapsed ? "w-20" : "w-64"
        }`}
    >
      {/* Logo/Brand */}
      <div className="p-6 border-b border-[#333333] flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-[#1FB2A6] rounded-xl flex items-center justify-center">
            <Mic className="h-6 w-6 text-[#0E0E0E]" />
          </div>
          {!collapsed && <span className="font-serif text-xl font-bold">EchoMe</span>}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="rounded-full h-8 w-8 hover:bg-[#0E0E0E]"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <TooltipProvider delayDuration={0}>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = item.id === activeSection
            const Icon = item.icon

            return (
              <Tooltip key={item.id}>
                <TooltipTrigger asChild>
                  <Link href={item.href}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start px-4 py-3 rounded-xl transition-all duration-300 ${isActive
                          ? "bg-[#1FB2A6] text-[#0E0E0E] shadow-[0_0_15px_rgba(31,178,166,0.3)]"
                          : "text-[#F4EBDC]/70 hover:text-[#F4EBDC] hover:bg-[#0E0E0E]/50"
                        }`}
                    >
                      <Icon className={`h-5 w-5 ${isActive ? "text-[#0E0E0E]" : ""} ${!collapsed ? "mr-3" : ""}`} />
                      {!collapsed && <span>{item.label}</span>}
                    </Button>
                  </Link>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right">
                    <p>{item.label}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            )
          })}
        </nav>
      </TooltipProvider>

      {/* User section */}
      <div className="p-4 border-t border-[#333333]">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-[#1FB2A6] rounded-full flex items-center justify-center">
            <User className="h-5 w-5 text-[#0E0E0E]" />
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user?.name || "Client "}</p>
            </div>
          )}
        </div>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start px-4 py-2 rounded-xl text-[#F4EBDC]/70 hover:text-[#F4EBDC] hover:bg-[#0E0E0E]/50"
              >
                <LogOut className={`h-4 w-4 ${!collapsed ? "mr-3" : ""}`} />
                {!collapsed && <span>Sign Out</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                <p>Sign Out</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
