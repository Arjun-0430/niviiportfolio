import { useEffect, useRef } from 'react'

/**
 * Matrix-style code rain (cyan/green) for hero background. Reusable for any section.
 */
export default function MatrixBackground({ className = '', opacity = 0.15, color = 'cyan' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const chars = 'SELECT*FROM WHERE INSERT UPDATE DELETE JOIN CREATE TABLE INDEX 01'
    const columnCount = Math.floor(canvas.width / 18)
    const drops = Array(columnCount).fill(1)

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const hex = color === 'blue' ? '#60a5fa' : color === 'cyan' ? '#64ffda' : '#22c55e'
    const draw = () => {
      ctx.fillStyle = 'rgba(10, 25, 47, 0.03)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = hex
      ctx.font = '14px monospace'

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * 18, drops[i] * 18)
        if (drops[i] * 18 > canvas.height && Math.random() > 0.97) drops[i] = 0
        drops[i]++
      }
    }

    const interval = setInterval(draw, 60)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', resize)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ opacity, zIndex: 0 }}
      aria-hidden
    />
  )
}
