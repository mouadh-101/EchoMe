"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio/audio-player"
import { Clock, MapPin, Smile, CheckSquare, Tag, Calendar, BookOpen } from "lucide-react"

export default function SummaryPage() {
  const [showFullTranscript, setShowFullTranscript] = useState(false)

  const fullTranscript = `I was thinking about the new project we're starting next week. We need to make sure we have all the resources lined up. First, we should check with the design team to see if they've finalized the mockups. Then, we need to set up the development environment and make sure everyone has access. I'm a bit concerned about the timeline - we only have three weeks to complete the first phase. Maybe we should schedule a kickoff meeting on Monday to go over the details and assign tasks. Also, don't forget to follow up with marketing about the launch plan.`

  const shortTranscript = fullTranscript.substring(0, 150) + "..."

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold mb-6">Smart Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Transcript and playback */}
        <div className="space-y-6">
          <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Project Planning</h2>

              <div className="flex items-center gap-2 text-sm text-[#F4EBDC]/70 mb-4">
                <Clock className="h-4 w-4" />
                <span>Today, 10:23 AM</span>
                <span>•</span>
                <span>1:45</span>
              </div>

              <AudioPlayer />

              <div className="flex items-center gap-2 mt-6 mb-4">
                <MapPin className="h-4 w-4 text-[#F4EBDC]/70" />
                <span className="text-sm text-[#F4EBDC]/70">Office</span>
                <Smile className="h-4 w-4 text-[#F4EBDC]/70 ml-2" />
                <span className="text-sm text-[#F4EBDC]/70">Focused</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                <Badge className="bg-[#1FB2A6]/20 text-[#1FB2A6] hover:bg-[#1FB2A6]/30 rounded-full">Work</Badge>
                <Badge className="bg-[#1FB2A6]/20 text-[#1FB2A6] hover:bg-[#1FB2A6]/30 rounded-full">Project</Badge>
                <Badge className="bg-[#1FB2A6]/20 text-[#1FB2A6] hover:bg-[#1FB2A6]/30 rounded-full">Planning</Badge>
              </div>

              <h3 className="font-medium text-lg mb-2">Transcript</h3>
              <p className="text-[#F4EBDC]/90 mb-2">{showFullTranscript ? fullTranscript : shortTranscript}</p>
              <Button
                variant="link"
                onClick={() => setShowFullTranscript(!showFullTranscript)}
                className="text-[#1FB2A6] p-0 h-auto"
              >
                {showFullTranscript ? "Show Less" : "Show More"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Right column - AI Summary and Smart Actions */}
        <div className="space-y-6">
          <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">AI Summary</h2>
              <p className="text-[#F4EBDC]/90 mb-6">
                Planning for next week's new project. Need to check with design team for mockups, set up development
                environment, and ensure team access. Concerned about the three-week timeline for phase one. Suggested
                Monday kickoff meeting to assign tasks. Remember to follow up with marketing about launch.
              </p>

              <h3 className="font-medium text-lg mb-4">Key Points</h3>
              <ul className="list-disc list-inside space-y-2 text-[#F4EBDC]/90 mb-6">
                <li>Check with design team about mockups</li>
                <li>Set up development environment</li>
                <li>Schedule kickoff meeting on Monday</li>
                <li>Follow up with marketing team</li>
                <li>Timeline concern: 3 weeks for phase one</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">Smart Actions</h2>

              <div className="grid grid-cols-2 gap-4">
                <Link href="/actions/todos">
                  <Button
                    variant="outline"
                    className="w-full h-24 flex flex-col items-center justify-center rounded-xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                  >
                    <CheckSquare className="h-6 w-6 mb-2 text-[#1FB2A6]" />
                    <span>Generate To-Do</span>
                  </Button>
                </Link>

                <Link href="/actions/keywords">
                  <Button
                    variant="outline"
                    className="w-full h-24 flex flex-col items-center justify-center rounded-xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                  >
                    <Tag className="h-6 w-6 mb-2 text-[#1FB2A6]" />
                    <span>Extract Keywords</span>
                  </Button>
                </Link>

                <Link href="/actions/journal">
                  <Button
                    variant="outline"
                    className="w-full h-24 flex flex-col items-center justify-center rounded-xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                  >
                    <BookOpen className="h-6 w-6 mb-2 text-[#1FB2A6]" />
                    <span>Generate Journal</span>
                  </Button>
                </Link>

                <Link href="/actions/calendar">
                  <Button
                    variant="outline"
                    className="w-full h-24 flex flex-col items-center justify-center rounded-xl bg-transparent border-[#333333] hover:bg-[#0E0E0E] hover:border-[#1FB2A6] transition-all"
                  >
                    <Calendar className="h-6 w-6 mb-2 text-[#1FB2A6]" />
                    <span>Suggest Events</span>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
