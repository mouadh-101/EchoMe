"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { EchoCard } from "@/components/echo-card"
import { Search, Filter, Grid, List } from "lucide-react"

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
          >
            All (154)
          </Badge>
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Ideas (42)
          </Badge>
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Meetings (28)
          </Badge>
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Tasks (35)
          </Badge>
          <Badge
            variant="outline"
            className="bg-transparent hover:bg-[#1A1A1A]/80 text-[#F4EBDC]/70 border-[#333333] rounded-full px-4 py-2 cursor-pointer whitespace-nowrap"
          >
            Personal (49)
          </Badge>
        </div>
      </div>

      <div
        className={`${
          viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-4"
        }`}
      >
        <EchoCard
          title="Morning Reflection"
          preview="I need to remember to follow up with the team about the project timeline and make sure we're all aligned on the deliverables for next week's sprint..."
          timestamp="Today, 8:32 AM"
          tags={["Work", "Ideas"]}
          isPinned={true}
        />

        <EchoCard
          title="Project Brainstorm"
          preview="The new feature should include a way for users to categorize their notes automatically using AI. We could implement machine learning algorithms to detect patterns..."
          timestamp="Yesterday, 2:15 PM"
          tags={["Work", "Meeting"]}
          isPinned={false}
        />

        <EchoCard
          title="Shopping List"
          preview="Need to pick up: milk, eggs, bread, and that new book I've been wanting to read about productivity and time management techniques..."
          timestamp="Jun 1, 4:45 PM"
          tags={["Personal", "Tasks"]}
          isPinned={false}
        />

        <EchoCard
          title="Book Recommendations"
          preview="John suggested 'Atomic Habits' and 'Deep Work' as good productivity books that could help with focus and building better systems for personal growth..."
          timestamp="May 28, 11:20 AM"
          tags={["Personal", "Ideas"]}
          isPinned={false}
        />

        <EchoCard
          title="Weekly Goals"
          preview="This week I want to finish the project proposal, start the new exercise routine, and organize my workspace to be more conducive to deep work..."
          timestamp="May 25, 9:05 AM"
          tags={["Personal", "Tasks"]}
          isPinned={false}
        />

        <EchoCard
          title="Meeting Notes"
          preview="Key takeaways from the client meeting: they want to prioritize mobile experience and need delivery by Q3. Budget approved for additional resources..."
          timestamp="May 23, 3:30 PM"
          tags={["Work", "Meeting"]}
          isPinned={false}
        />
      </div>
    </div>
  )
}
