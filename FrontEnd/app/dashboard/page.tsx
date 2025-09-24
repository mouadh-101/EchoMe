"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RecordButton } from "@/components/record-button"
import { EchoCard } from "@/components/echo-card"
import { TrendingUp, Clock, Target, Zap } from "lucide-react"
import { authService, UserData } from "../services/authService"
import { audioService } from "../services/audioService"
import { userAudioData, tag, stats } from "../services/audioService"
import { formatDistanceToNow } from "date-fns"
import AuthGuard from "@/components/guard/AuthGuard"

export default function Dashboard() {
  const [user, setUser] = useState<UserData | null>(null)
  const [audio, setAudio] = useState<userAudioData[]>([])
  const [stats, setStats] = useState<stats | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTag, setActiveTag] = useState("All")

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.whoami()
        const audioResponse = await audioService.userAudio()
        const statsResponse = await audioService.audioStats()
        if (
          response.status === "success" &&
          audioResponse.status === "success" &&
          statsResponse.status === "success"
        ) {
          setUser(response.data)
          setAudio(audioResponse.data)
          setStats(statsResponse.data)
        } else {
          console.error("User fetch failed:", response.message)
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [])

  // 🔹 Unique tags
  const allTags = Array.from(
    new Set(audio.flatMap((a) => a.tags.map((t) => t.name)))
  )

  // 🔹 Filtered audios
  const filteredAudio =
    activeTag === "All"
      ? audio
      : audio.filter((a) => a.tags.some((t) => t.name === activeTag))

  return (
    <AuthGuard>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
            <div>
              <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">
                Hello, {user?.name} 👋
              </h1>
              <p className="text-[#F4EBDC]/70 text-lg">
                Ready to capture your thoughts?
              </p>
            </div>
            <div className="mt-4 lg:mt-0">
              <RecordButton />
            </div>
          </div>

          {/* Stats Cards */}
          {stats ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#1FB2A6]">
                        {stats.audioToday}
                      </p>
                      <p className="text-sm text-[#F4EBDC]/70">Today&apos;s Echoes</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-[#1FB2A6]/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#6BD49E]">
                        {stats.audioPending}
                      </p>
                      <p className="text-sm text-[#F4EBDC]/70">Pending</p>
                    </div>
                    <Clock className="h-8 w-8 text-[#6BD49E]/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#F4EBDC]">
                        {stats.audioTotal}
                      </p>
                      <p className="text-sm text-[#F4EBDC]/70">Total Memories</p>
                    </div>
                    <Target className="h-8 w-8 text-[#F4EBDC]/50" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-bold text-[#1FB2A6]">
                        {stats.audioThisWeek}
                      </p>
                      <p className="text-sm text-[#F4EBDC]/70">This Week</p>
                    </div>
                    <Zap className="h-8 w-8 text-[#1FB2A6]/50" />
                  </div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="text-center text-[#F4EBDC]/70">Loading stats...</div>
          )}
        </div>

        {/* Filters */}
        <div className="mb-6">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            <Badge
              onClick={() => setActiveTag("All")}
              variant="outline"
              className={`rounded-full px-4 py-2 cursor-pointer whitespace-nowrap ${activeTag === "All"
                  ? "bg-[#1FB2A6] text-[#0E0E0E] border-[#1FB2A6]"
                  : "bg-[#333333] text-[#F4EBDC]/70 border-[#333333]"
                }`}
            >
              All
            </Badge>
            {allTags.map((tag) => (
              <Badge
                key={tag}
                onClick={() => setActiveTag(tag)}
                variant="outline"
                className={`rounded-full px-4 py-2 cursor-pointer whitespace-nowrap ${activeTag === tag
                    ? "bg-[#1FB2A6] text-[#0E0E0E] border-[#1FB2A6]"
                    : "bg-[#333333] text-[#F4EBDC]/70 border-[#333333]"
                  }`}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Echo Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAudio.map((a) => (
            <EchoCard
              key={a.id}
              id={a.id}
              title={
                a.title
                  ? a.title.split(" ").slice(0, 5).join(" ") +
                  (a.title.split(" ").length > 5 ? "..." : "")
                  : "Untitled"
              }
              preview={
                a.description
                  ? a.description.length > 100
                    ? a.description.slice(0, 100) + "..."
                    : a.description
                  : ""
              }
              timestamp={formatDistanceToNow(new Date(a.created_at), {
                addSuffix: true,
              })}
              tags={a.tags.map((t) => t.name)}
            />
          ))}

          {filteredAudio.length === 0 && (
            <p className="text-center text-[#F4EBDC]/50 col-span-full">
              No echoes match your filter.
            </p>
          )}
        </div>
      </div>
    </AuthGuard>
  )
}
