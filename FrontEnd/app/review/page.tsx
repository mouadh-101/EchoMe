"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { AudioPlayer } from "@/components/audio/audio-player"
import { MapPin, Smile, Tag, Check, X } from "lucide-react"

export default function ReviewPage() {
  const router = useRouter()
  const [description, setDescription] = useState("")

  // Auto-generated tags, location, and mood (would come from AI in a real app)
  const autoTags = ["Work", "Meeting", "Project"]
  const location = "Office"
  const mood = "Focused"

  const handleSubmit = () => {
    // In a real app, would save the recording and metadata
    router.push("/summary")
  }

  const handleCancel = () => {
    // In a real app, would delete the recording
    router.push("/dashboard")
  }

  return (
    <div className="container max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold mb-6">Review Your Echo</h1>

      <Card className="bg-[#1A1A1A] border-[#333333] rounded-2xl shadow-lg mb-6">
        <CardContent className="p-6">
          <h2 className="text-xl font-medium mb-4">Listen to your recording</h2>

          <AudioPlayer title="Voice Note - Just Now" />

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="text-sm font-medium text-[#F4EBDC]/70 mb-2">Auto-detected Tags</h3>
              <div className="flex flex-wrap gap-2">
                {autoTags.map((tag) => (
                  <Badge key={tag} className="bg-[#1FB2A6]/20 text-[#1FB2A6] rounded-full px-3 py-1">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 text-[#F4EBDC]/70 mr-2" />
                <span className="text-sm text-[#F4EBDC]/70">{location}</span>
              </div>

              <div className="flex items-center">
                <Smile className="h-4 w-4 text-[#F4EBDC]/70 mr-2" />
                <span className="text-sm text-[#F4EBDC]/70">{mood}</span>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-[#F4EBDC]/70 mb-2">Add a description (optional)</h3>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add notes or context to your recording..."
                className="bg-[#0E0E0E] border-[#333333] rounded-xl resize-none h-32"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row gap-4 justify-end">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="rounded-xl border-[#333333] hover:bg-[#0E0E0E] hover:text-[#FF4E4E] hover:border-[#FF4E4E]"
        >
          <X className="mr-2 h-4 w-4" />
          Cancel
        </Button>

        <Button onClick={handleSubmit} className="rounded-xl bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E]">
          <Check className="mr-2 h-4 w-4" />
          Submit
        </Button>
      </div>
    </div>
  )
}
