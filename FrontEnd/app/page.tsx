"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HorizontalWaveform } from "@/components/audio/horizontal-waveform"
import { ArrowRight, Mic, Brain, FolderOpen } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0E0E0E] text-[#F4EBDC] p-4">
      <div className="w-full max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left side - Content */}
          <div className="flex flex-col justify-center space-y-8 px-4 lg:px-8">
            <div className="space-y-6">
              <h1 className="font-serif text-4xl lg:text-6xl font-bold leading-tight">
                Welcome to <span className="text-[#1FB2A6]">EchoMe</span>
              </h1>
              <p className="text-xl lg:text-2xl opacity-80 leading-relaxed">
                Your intelligent audio memory assistant that captures, understands, and organizes your thoughts.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8">
              <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-[#333333]">
                <div className="bg-[#1FB2A6]/20 p-4 rounded-full mb-4">
                  <Mic className="h-8 w-8 text-[#1FB2A6]" />
                </div>
                <h3 className="font-medium mb-2">Capture</h3>
                <p className="text-sm text-[#F4EBDC]/70">Record voice notes naturally</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-[#333333]">
                <div className="bg-[#1FB2A6]/20 p-4 rounded-full mb-4">
                  <Brain className="h-8 w-8 text-[#1FB2A6]" />
                </div>
                <h3 className="font-medium mb-2">Understand</h3>
                <p className="text-sm text-[#F4EBDC]/70">AI summarizes and tags</p>
              </div>

              <div className="flex flex-col items-center text-center p-6 bg-[#1A1A1A] rounded-2xl border border-[#333333]">
                <div className="bg-[#1FB2A6]/20 p-4 rounded-full mb-4">
                  <FolderOpen className="h-8 w-8 text-[#1FB2A6]" />
                </div>
                <h3 className="font-medium mb-2">Organize</h3>
                <p className="text-sm text-[#F4EBDC]/70">Find memories instantly</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                className="w-full sm:w-auto px-8 py-6 text-lg bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 text-[#0E0E0E] font-medium rounded-2xl shadow-[0_0_20px_rgba(31,178,166,0.5)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(31,178,166,0.7)]"
                onClick={() => (window.location.href = "/auth")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <div className="text-center sm:text-left">
                <Link
                  href="/auth"
                  className="text-[#F4EBDC]/70 hover:text-[#F4EBDC] underline underline-offset-4 transition-colors"
                >
                  Already have an account? Sign In
                </Link>
              </div>
            </div>
          </div>

          {/* Right side - Animation */}
          <div className="flex flex-col items-center justify-center lg:min-h-screen">
            {/* Horizontal waveform at the top */}
            <div className="w-full max-w-md mb-12">
              <div className="text-center mb-6">
                <h2 className="font-serif text-2xl font-medium text-[#1FB2A6]">Voice First Experience</h2>
              </div>
              <HorizontalWaveform isActive={true} height={100} />
            </div>

            {/* Mic button */}
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 bg-[#1FB2A6] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(31,178,166,0.6)] animate-pulse">
                <Mic className="h-12 w-12 lg:h-16 lg:w-16 text-[#0E0E0E]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
