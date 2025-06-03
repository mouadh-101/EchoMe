"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Mic } from "lucide-react"

export function RecordButton() {
  const router = useRouter()
  const [isPressed, setIsPressed] = useState(false)

  const handlePress = () => {
    setIsPressed(true)
    setTimeout(() => {
      setIsPressed(false)
      router.push("/record")
    }, 200)
  }

  return (
    <Button
      onClick={handlePress}
      className={`w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center bg-[#1FB2A6] hover:bg-[#1FB2A6]/90 shadow-[0_0_20px_rgba(31,178,166,0.5)] hover:shadow-[0_0_30px_rgba(31,178,166,0.7)] transition-all duration-300 ${
        isPressed ? "scale-95" : "scale-100 hover:scale-105"
      }`}
    >
      <Mic className="h-8 w-8 lg:h-10 lg:w-10 text-[#0E0E0E]" />
    </Button>
  )
}
