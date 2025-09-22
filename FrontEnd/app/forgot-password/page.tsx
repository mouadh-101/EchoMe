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
import { formatDistanceToNow } from 'date-fns';

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
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-2">Under construction</h1>
          </div>
        </div>
      </div>
    </div>
  )
}
