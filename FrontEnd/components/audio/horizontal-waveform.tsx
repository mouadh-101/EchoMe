"use client"

import { useEffect, useRef, useState } from "react"

interface HorizontalWaveformProps {
  isActive?: boolean
  height?: number
  color?: string
  backgroundColor?: string
}

export function HorizontalWaveform({
  isActive = false,
  height = 80,
  color = "#1FB2A6",
  backgroundColor = "transparent",
}: HorizontalWaveformProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [amplitudes, setAmplitudes] = useState<number[]>([])

  // Initialize amplitudes
  useEffect(() => {
    const numBars = 50
    const initialAmplitudes = Array.from({ length: numBars }, () => (isActive ? Math.random() * 0.5 + 0.2 : 0.1))
    setAmplitudes(initialAmplitudes)
  }, [isActive])

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = height
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    let animationFrameId: number

    const render = () => {
      if (!canvas || !ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Set background if specified
      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      const barWidth = Math.max(2, Math.floor(canvas.width / amplitudes.length) - 2)
      const centerY = canvas.height / 2

      // Update amplitudes if active
      if (isActive) {
        setAmplitudes((prev) =>
          prev.map((amp) => {
            const change = (Math.random() - 0.5) * 0.1
            return Math.max(0.1, Math.min(0.9, amp + change))
          }),
        )
      }

      // Draw bars
      ctx.fillStyle = color
      amplitudes.forEach((amplitude, index) => {
        const barHeight = amplitude * canvas.height * 0.8
        const x = index * (barWidth + 2) + (canvas.width - amplitudes.length * (barWidth + 2)) / 2
        const y = centerY - barHeight / 2

        // Draw rounded bars
        ctx.beginPath()
        ctx.roundRect(x, y, barWidth, barHeight, 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [amplitudes, isActive, height, color, backgroundColor])

  return <canvas ref={canvasRef} className="w-full" style={{ height: `${height}px` }} />
}
