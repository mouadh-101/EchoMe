"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RecordButton } from "@/components/record-button"
import { EchoCard } from "@/components/echo-card"
import { TrendingUp, Clock, Target, Zap } from "lucide-react"
import { authService, UserData } from "../services/authService"
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("all")
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold text-[#1FB2A6]">12</p>
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
                  <p className="text-2xl font-bold text-[#6BD49E]">3</p>
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
                  <p className="text-2xl font-bold text-[#F4EBDC]">154</p>
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
                  <p className="text-2xl font-bold text-[#1FB2A6]">8</p>
                  <p className="text-sm text-[#F4EBDC]/70">This Week</p>
                </div>
                <Zap className="h-8 w-8 text-[#1FB2A6]/50" />
              </div>
            </CardContent>
          </Card>
        </div>
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
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Ideas
          </Badge>
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Meetings
          </Badge>
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Tasks
          </Badge>
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Personal
          </Badge>
        </div>
      </div>

      {/* Echo Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <EchoCard
          title="Morning Reflection"
          preview="I need to remember to follow up with the team about the project timeline and make sure we're all aligned on the deliverables..."
          timestamp="Today, 8:32 AM"
          tags={["Work", "Ideas"]}
          isPinned={true}
        />

        <EchoCard
          title="Project Brainstorm"
          preview="The new feature should include a way for users to categorize their notes automatically using AI..."
          timestamp="Yesterday, 2:15 PM"
          tags={["Work", "Meeting"]}
          isPinned={false}
        />

        <EchoCard
          title="Shopping List"
          preview="Need to pick up: milk, eggs, bread, and that new book I've been wanting to read about productivity..."
          timestamp="Jun 1, 4:45 PM"
          tags={["Personal", "Tasks"]}
          isPinned={false}
        />

        <EchoCard
          title="Book Recommendations"
          preview="John suggested 'Atomic Habits' and 'Deep Work' as good productivity books that could help with focus..."
          timestamp="May 28, 11:20 AM"
          tags={["Personal", "Ideas"]}
          isPinned={false}
        />

        <EchoCard
          title="Weekly Goals"
          preview="This week I want to finish the project proposal, start the new exercise routine, and organize my workspace..."
          timestamp="May 25, 9:05 AM"
          tags={["Personal", "Tasks"]}
          isPinned={false}
        />

        <EchoCard
          title="Meeting Notes"
          preview="Key takeaways from the client meeting: they want to prioritize mobile experience and need delivery by Q3..."
          timestamp="May 23, 3:30 PM"
          tags={["Work", "Meeting"]}
          isPinned={false}
        />
      </div>
    </div>
  )
}
