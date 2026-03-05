"use client"

import { useEffect, useRef } from "react"

interface TechnologyRadarChartProps {
  data: Array<{
    name: string
    x: number
    y: number
    radius: number
    category: string
  }>
}

export function TechnologyRadarChart({ data }: TechnologyRadarChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw radar circles
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const maxRadius = Math.min(centerX, centerY) * 0.9

    // Draw radar rings
    ctx.strokeStyle = "hsl(210 40% 88%)"
    ctx.lineWidth = 1

    for (let i = 1; i <= 4; i++) {
      const radius = (maxRadius / 4) * i
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw radar quadrants
    ctx.beginPath()
    ctx.moveTo(centerX, centerY - maxRadius)
    ctx.lineTo(centerX, centerY + maxRadius)
    ctx.stroke()

    ctx.beginPath()
    ctx.moveTo(centerX - maxRadius, centerY)
    ctx.lineTo(centerX + maxRadius, centerY)
    ctx.stroke()

    // Draw quadrant labels
    ctx.font = "12px sans-serif"
    ctx.fillStyle = "hsl(215 35% 45%)"
    ctx.textAlign = "center"
    ctx.fillText("Techniques", centerX, centerY - maxRadius - 10)
    ctx.fillText("Tools", centerX + maxRadius + 30, centerY)
    ctx.fillText("Platforms", centerX, centerY + maxRadius + 20)
    ctx.fillText("Languages", centerX - maxRadius - 30, centerY)

    // Draw data points
    data.forEach((point) => {
      // Convert x,y coordinates (0-100) to canvas coordinates
      const x = centerX + (point.x - 50) * maxRadius * 0.02
      const y = centerY + (point.y - 50) * maxRadius * 0.02
      const radius = point.radius

      // Set color based on category
      let color
      switch (point.category) {
        case "adopt":
          color = "hsl(152 60% 35%)" // success green
          break
        case "trial":
          color = "hsl(210 80% 55%)" // chart-1 blue
          break
        case "assess":
          color = "hsl(38 90% 50%)"  // warning amber
          break
        case "hold":
          color = "hsl(0 84% 60%)"   // destructive red
          break
        default:
          color = "hsl(215 25% 60%)" // muted-foreground
      }

      // Draw circle
      ctx.beginPath()
      ctx.arc(x, y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `${color}80` // Add transparency
      ctx.fill()
      ctx.strokeStyle = color
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw label
      ctx.font = "10px sans-serif"
      ctx.fillStyle = "hsl(220 71% 14%)"
      ctx.textAlign = "center"
      ctx.fillText(point.name, x, y + radius + 12)
    })
  }, [data])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="w-full h-full" style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </div>
  )
}

