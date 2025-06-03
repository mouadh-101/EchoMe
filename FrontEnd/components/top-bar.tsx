"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Bell, Menu, X } from "lucide-react"

export function TopBar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="bg-[#1A1A1A] border-b border-[#333333] px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Mobile menu button */}
        <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-4">
          {isSearchOpen ? (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#F4EBDC]/50" />
              <Input
                type="text"
                placeholder="Search echoes, tags, or keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#0E0E0E] border-[#333333] rounded-xl py-2 pl-10 pr-10 text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6]"
                autoFocus
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              onClick={() => setIsSearchOpen(true)}
              className="w-full justify-start px-4 py-2 rounded-xl bg-[#0E0E0E] border border-[#333333] text-[#F4EBDC]/50 hover:text-[#F4EBDC] hover:border-[#1FB2A6]"
            >
              <Search className="mr-2 h-4 w-4" />
              Search echoes...
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-xl relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-[#1FB2A6] rounded-full"></span>
          </Button>
        </div>
      </div>
    </header>
  )
}
