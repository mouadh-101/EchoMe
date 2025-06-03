"use client"

import { useEffect, useRef } from "react"

interface WaveformAnimationProps {
  isActive?: boolean
}

export function WaveformAnimation({ isActive = true }: WaveformAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) * 0.8

    const numBars = 60
    const barWidth = (2 * Math.PI * radius) / numBars / 2

    const bars: number[] = []
    for (let i = 0; i < numBars; i++) {
      bars.push(Math.random() * 0.5 + 0.2)
    }

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw circular waveform
      for (let i = 0; i < numBars; i++) {
        const angle = (i / numBars) * 2 * Math.PI

        if (isActive) {
          // Animate bar heights when active
          bars[i] += Math.random() * 0.1 - 0.05
          bars[i] = Math.max(0.1, Math.min(1, bars[i]))
        }

        const barHeight = radius * bars[i]

        const startX = centerX + (radius - barHeight) * Math.cos(angle)
        const startY = centerY + (radius - barHeight) * Math.sin(angle)
        const endX = centerX + radius * Math.cos(angle)
        const endY = centerY + radius * Math.sin(angle)

        ctx.beginPath()
        ctx.moveTo(startX, startY)
        ctx.lineTo(endX, endY)
        ctx.lineWidth = barWidth
        ctx.strokeStyle = `rgba(31, 178, 166, ${bars[i]})`
        ctx.stroke()
      }

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [isActive])

  return <canvas ref={canvasRef} className="w-full h-full" />
}
