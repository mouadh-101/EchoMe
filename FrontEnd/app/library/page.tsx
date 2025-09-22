"use client"

import { use, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EchoCard } from "@/components/echo-card"
import { Search, Filter, Grid, List } from "lucide-react"
import { userAudioData, audioService } from "../services/audioService"
import { formatDistanceToNow } from "date-fns"

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [userAudio, setUserAudio] = useState<(userAudioData[])>([])
  useEffect(() => {
    audioService.userAudio().then((res) => {
      if (res.status === "success") {
        setUserAudio(res.data)
      }
    })
  }, [])

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Echo Library</h1>
          <p className="text-[#F4EBDC]/70">Your personal audio memory archive</p>
        </div>

        <div className="flex items-center gap-2 mt-4 lg:mt-0">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("grid")}
            className={`rounded-xl ${viewMode === "grid" ? "bg-[#1FB2A6] text-[#0E0E0E]" : "bg-transparent border-[#333333]"}`}
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode("list")}
            className={`rounded-xl ${viewMode === "list" ? "bg-[#1FB2A6] text-[#0E0E0E]" : "bg-transparent border-[#333333]"}`}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#F4EBDC]/50" />
            <Input
              type="text"
              placeholder="Search echoes, tags, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#1A1A1A] border-[#333333] rounded-2xl py-6 pl-10 pr-4 text-[#F4EBDC] focus:border-[#1FB2A6] focus:ring-1 focus:ring-[#1FB2A6]"
            />
          </div>
        </div>

        <Button
          variant="outline"
          className="px-6 py-6 rounded-2xl bg-transparent border-[#333333] hover:bg-[#1A1A1A] hover:border-[#1FB2A6] lg:w-auto"
        >
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          <Badge
            variant="outline"
            className="bg-[#1FB2A6] hover:bg-[#1FB2A6]/80 text-[#0E0E0E] border-[#1FB2A6] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          > All
          </Badge>
          {userAudio.map((audio) =>
            audio.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="bg-[#1A1A1A] hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
              >
                {tag.name}
              </Badge>
            ))
          )}
        </div>
      </div>

      <div
        className={`${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"
          }`}
      >
        {userAudio.map((audio) => (
          <EchoCard
            key={audio.id}
            id={audio.id}
            title={
              audio.title
                ? audio.title.split(' ').slice(0, 5).join(' ') + (audio.title.split(' ').length > 5 ? '...' : '')
                : 'Untitled'
            }
            preview={
              audio.description
                ? audio.description.length > 100
                  ? audio.description.slice(0, 100) + '...'
                  : audio.description
                : ''
            }
            timestamp={formatDistanceToNow(new Date(audio.created_at), { addSuffix: true })}
            tags={audio.tags.map((tag) => tag.name)}
          />
        ))}
      </div>
    </div>
  )
}
