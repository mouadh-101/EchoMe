import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Brain, Pin, Clock, Trash, Play } from "lucide-react"

interface EchoCardProps {
  title: string
  preview: string
  timestamp: string
  tags: string[]
  isPinned: boolean
}

export function EchoCard({ title, preview, timestamp, tags, isPinned }: EchoCardProps) {
  return (
    <Card className="bg-[#1A1A1A] border-[#333333] hover:border-[#1FB2A6]/50 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(31,178,166,0.2)] group">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-3">
          <Link href="/summary" className="flex-1">
            <h3 className="font-medium text-lg lg:text-xl hover:text-[#1FB2A6] transition-colors cursor-pointer">
              {title}
            </h3>
          </Link>
          {isPinned && <Pin className="h-5 w-5 text-[#1FB2A6] ml-2" />}
        </div>

        <Link href="/summary">
          <p className="text-[#F4EBDC]/70 text-sm lg:text-base mb-4 line-clamp-3 hover:text-[#F4EBDC]/90 transition-colors cursor-pointer">
            {preview}
          </p>
        </Link>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className="bg-[#1FB2A6]/20 text-[#1FB2A6] hover:bg-[#1FB2A6]/30 rounded-full text-xs transition-colors cursor-pointer"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-xs lg:text-sm text-[#F4EBDC]/50">
            <Clock className="h-3 w-3 lg:h-4 lg:w-4 mr-1" />
            {timestamp}
          </div>

          <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#0E0E0E] hover:text-[#1FB2A6]">
              <Play className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#0E0E0E] hover:text-[#1FB2A6]">
              <Brain className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#0E0E0E] hover:text-[#1FB2A6]">
              <Pin className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-[#0E0E0E] hover:text-[#FF4E4E]">
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
