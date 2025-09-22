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
import {formatDistanceToNow} from 'date-fns';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [user, setUser] = useState<UserData | null>(null)
  const [audio, setAudio] = useState<userAudioData[]>([])
  const [tags, setTags] = useState<tag[]>([])
  const [stats, setStats] = useState<stats | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.whoami()
        const audioResponse = await audioService.userAudio()
        const statsResponse = await audioService.audioStats()
        if (response.status === "success" && audioResponse.status === "success" && statsResponse.status === "success") {
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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Hello, {user?.name} 👋</h1>
            <p className="text-[#F4EBDC]/70 text-lg">Ready to capture your thoughts?</p>
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
                    <p className="text-2xl font-bold text-[#1FB2A6]">{stats.audioToday}</p>
                    <p className="text-sm text-[#F4EBDC]/70">Today's Echoes</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-[#1FB2A6]/50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-[#6BD49E]">{stats.audioPending}</p>
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
                    <p className="text-2xl font-bold text-[#F4EBDC]">{stats.audioTotal}</p>
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

                    <p className="text-2xl font-bold text-[#1FB2A6]">{stats.audioThisWeek}</p>
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
            variant="outline"
            className="bg-[#1FB2A6] hover:bg-[#1FB2A6]/80 text-[#0E0E0E] border-[#1FB2A6] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            All
          </Badge>
          {audio.map((audio) => (
            audio.tags.map((tag) => (
              <Badge
                key={tag.id}
                variant="outline"
                className="bg-[#333333] hover:bg-[#333333]/80 text-[#F4EBDC] border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
              >
                {tag.name}
              </Badge>
            ))
          ))}
        </div>
      </div>

      {/* Echo Timeline */}

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {audio.map((audio) => (
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
