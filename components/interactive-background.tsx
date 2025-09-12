"use client"

import { useEffect, useRef } from "react"

interface FloatingElement {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  emoji: string
  rotation: number
  rotationSpeed: number
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const elementsRef = useRef<FloatingElement[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationRef = useRef<number>()

  const foodEmojis = [
    "🥬",
    "🥒",
    "🥦",
    "🥕",
    "🌿",
    "🍃", // Green vegetables and leafy greens
    "🥤",
    "🧃",
    "🍹",
    "🥛", // Fruit juices and drinks
    "🥜",
    "🌰",
    "🥨",
    "🍯", // Nuts and cereals
    "🫐",
    "🍇",
    "🍊",
    "🍎", // Fruits
    "🌾",
    "🥣", // Oats and cereals
  ]

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const initElements = () => {
      elementsRef.current = []
      const numElements = Math.floor((window.innerWidth * window.innerHeight) / 15000)

      for (let i = 0; i < numElements; i++) {
        elementsRef.current.push({
          id: i,
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 20 + 15,
          emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)],
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
        })
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      elementsRef.current.forEach((element) => {
        // Mouse interaction - elements move away from cursor
        const dx = element.x - mouseRef.current.x
        const dy = element.y - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 150

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          element.vx += (dx / distance) * force * 0.02
          element.vy += (dy / distance) * force * 0.02
        }

        // Apply velocity with damping
        element.x += element.vx
        element.y += element.vy
        element.vx *= 0.98
        element.vy *= 0.98

        // Rotation
        element.rotation += element.rotationSpeed

        // Boundary wrapping
        if (element.x < -element.size) element.x = canvas.width + element.size
        if (element.x > canvas.width + element.size) element.x = -element.size
        if (element.y < -element.size) element.y = canvas.height + element.size
        if (element.y > canvas.height + element.size) element.y = -element.size

        // Draw element
        ctx.save()
        ctx.translate(element.x, element.y)
        ctx.rotate(element.rotation)
        ctx.font = `${element.size}px Arial`
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        // Add subtle glow effect
        ctx.shadowColor = "rgba(34, 197, 94, 0.3)"
        ctx.shadowBlur = 10

        ctx.fillText(element.emoji, 0, 0)
        ctx.restore()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    resizeCanvas()
    initElements()
    animate()

    window.addEventListener("resize", () => {
      resizeCanvas()
      initElements()
    })
    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-60"
      style={{ background: "transparent" }}
    />
  )
}
