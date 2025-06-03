"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from "lucide-react"

interface EchoAlertProps {
  message: string
  subMessage?: string
  type: "success" | "error" | "info" | "warning"
  dismissible?: boolean
  timeout?: number
  onDismiss?: () => void
  className?: string
}

export function EchoAlert({
  message,
  subMessage,
  type,
  dismissible = true,
  timeout,
  onDismiss,
  className = "",
}: EchoAlertProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    if (timeout) {
      const timer = setTimeout(() => {
        handleDismiss()
      }, timeout)

      return () => clearTimeout(timer)
    }
  }, [timeout])

  const handleDismiss = () => {
    setIsVisible(false)
    setTimeout(() => {
      onDismiss?.()
    }, 300) // Wait for animation to complete
  }

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5" />
      case "error":
        return <AlertCircle className="h-5 w-5" />
      case "warning":
        return <AlertTriangle className="h-5 w-5" />
      case "info":
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getColors = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-green-500/20",
          border: "border-green-500/50",
          text: "text-green-400",
          icon: "text-green-400",
        }
      case "error":
        return {
          bg: "bg-red-500/20",
          border: "border-red-500/50",
          text: "text-red-400",
          icon: "text-red-400",
        }
      case "warning":
        return {
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/50",
          text: "text-yellow-400",
          icon: "text-yellow-400",
        }
      case "info":
      default:
        return {
          bg: "bg-[#1FB2A6]/20",
          border: "border-[#1FB2A6]/50",
          text: "text-[#1FB2A6]",
          icon: "text-[#1FB2A6]",
        }
    }
  }

  const colors = getColors()

  if (!isVisible) return null

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 max-w-md w-full mx-4
        ${colors.bg} ${colors.border} border rounded-2xl p-4
        shadow-[0_0_20px_rgba(0,0,0,0.5)]
        transform transition-all duration-300 ease-out
        ${isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"}
        ${className}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`${colors.icon} mt-0.5`}>{getIcon()}</div>

        <div className="flex-1 min-w-0">
          <p className={`font-medium ${colors.text}`}>{message}</p>
          {subMessage && <p className="text-sm text-[#F4EBDC]/70 mt-1">{subMessage}</p>}
        </div>

        {dismissible && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-6 w-6 rounded-full hover:bg-[#F4EBDC]/10 text-[#F4EBDC]/70 hover:text-[#F4EBDC]"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
