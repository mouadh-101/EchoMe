"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { HorizontalWaveform } from "@/components/audio/horizontal-waveform"
import { Mic, Square, Keyboard } from "lucide-react"
import MicRecorder from "mic-recorder-to-mp3"

const Mp3Recorder = new MicRecorder({ bitRate: 128 })

export default function RecordPage() {
  const router = useRouter()
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRecording])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault()
        toggleRecording()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isRecording])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const toggleRecording = () => {
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  const startRecording = async () => {
    try {
      await Mp3Recorder.start()
      setIsRecording(true)
      setRecordingTime(0)
    } catch (err) {
      console.error("Microphone access denied or failed", err)
    }
  }

  const stopRecording = () => {
    Mp3Recorder.stop()
      .getMp3()
      .then(([buffer, blob]) => {
        const audioUrl = URL.createObjectURL(blob)
        sessionStorage.setItem("audioUrl", audioUrl)

        // Optional: encode to base64 to send to backend
        const reader = new FileReader()
        reader.onloadend = () => {
          const base64Audio = reader.result as string
          sessionStorage.setItem("audioBase64", base64Audio)
          router.push("/review")
        }
        reader.readAsDataURL(blob)

        setIsRecording(false)
      })
      .catch((err) => {
        console.error("Recording failed", err)
        setIsRecording(false)
      })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold mb-4">
            {isRecording ? "Listening..." : "Ready to Record"}
          </h1>
          {isRecording && <p className="text-2xl text-[#1FB2A6] font-mono">{formatTime(recordingTime)}</p>}
          <p className="text-[#F4EBDC]/70 mt-2">
            {isRecording
              ? "Speak naturally, I'm capturing your thoughts"
              : "Click the microphone or press Ctrl+Space to start"}
          </p>
        </div>

        <div className="w-full mb-12">
          <HorizontalWaveform isActive={isRecording} height={120} />
        </div>

        <div className="flex justify-center mb-12">
          <Button
            onClick={toggleRecording}
            className={`w-24 h-24 lg:w-32 lg:h-32 rounded-full flex items-center justify-center transition-all duration-300 ${isRecording
                ? "bg-[#FF4E4E] hover:bg-[#FF4E4E]/90 shadow-[0_0_40px_rgba(255,78,78,0.6)]"
                : "bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 shadow-[0_0_40px_rgba(31,178,166,0.6)]"
              } hover:scale-105`}
          >
            {isRecording ? (
              <Square className="h-12 w-12 lg:h-16 lg:w-16 text-[#0E0E0E]" />
            ) : (
              <Mic className="h-12 w-12 lg:h-16 lg:w-16 text-[#0E0E0E]" />
            )}
          </Button>
        </div>

        {!isRecording && (
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-[#F4EBDC]/70">
              <Keyboard className="h-4 w-4" />
              <span>Keyboard shortcut: Ctrl + Space</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
