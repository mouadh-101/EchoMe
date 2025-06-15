"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { AudioPlayer } from "@/components/audio/audio-player"
import { Clock, MapPin, Smile, CheckSquare, Tag, Calendar, BookOpen } from "lucide-react"
import { userAudioData } from "@/app/services/audioService"
import { audioService } from "@/app/services/audioService"

export default function SummaryPage() {
  const [audioData, setAudioData] = useState<userAudioData | null>(null)
  const [loading, setLoading] = useState(true)
  const formatDurationToHHMMSS = (seconds: any) => {
    if (!seconds || seconds < 0) return '0:00';

    const minutes = Math.floor(seconds / 60);
    if (minutes > 59) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      const remainingSeconds = seconds % 60;
      return `${hours}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Fetch audio data by ID (this would typically be done in a useEffect)
  const fetchAudioData = async (id: number) => {
    try {
      const response = await audioService.fetchAudioById(id)
      if (response.status === "success") {
        setAudioData(response.data)
      } else {
        console.error("Failed to fetch audio data:", response.message)
      }
    } catch (error) {
      console.error("Error fetching audio data:", error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    const audioId = Number(window.location.pathname.split('/').pop())
    fetchAudioData(audioId)
  }
    , [])

  const [showFullTranscript, setShowFullTranscript] = useState(false)

  const fullTranscript = audioData?.transcription?.text || "No summary available."

  const shortTranscript = fullTranscript?.substring(0, 150) + "..."

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold mb-6">Smart Summary</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left column - Transcript and playback */}
        <div className="space-y-6">
          <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg">
            <CardContent className="p-6">
              <h2 className="text-xl font-medium mb-4">{audioData?.title}</h2>

              <div className="flex items-center gap-2 text-sm text-[#F4EBDC]/70 mb-4">
                <Clock className="h-4 w-4" />
                <span>
                  {audioData?.created_at
                    ? new Date(audioData.created_at).toLocaleDateString()
                    : 'Unknown date'}
                </span>
                <span>•</span>
                <span>{formatDurationToHHMMSS(audioData?.duration)}</span>
              </div>

              <AudioPlayer
                src={audioData?.file_url}
                title={audioData?.title}
                compact={false}
               />

              <div className="flex items-center gap-2 mt-6 mb-4">
                <Smile className="h-4 w-4 text-[#F4EBDC]/70 ml-2" />
                <span className="text-sm text-[#F4EBDC]/70">{audioData?.mood}</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {audioData?.tags.map((tag, index) => (
                  <Badge
                    key={index}
                    className="bg-[#1FB2A6]/20 text-[#1FB2A6] hover:bg-[#1FB2A6]/30 rounded-full px-3 py-1 text-sm"
                  >
                    {tag.name}
                  </Badge>
                ))}
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
                {audioData?.summary?.summary_text || "No summary available."}
              </p>
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
