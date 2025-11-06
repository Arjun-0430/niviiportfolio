import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ParticleField3D = () => {
  const canvasRef = useRef(null)
  const animationRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const particles = []
    
    // Resize canvas
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Create particles
    const createParticles = () => {
      const particleCount = Math.min(50, Math.floor(window.innerWidth / 30))
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: (Math.random() - 0.5) * 2,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? '#007AFF' : '#0A84FF'
        })
      }
    }

    createParticles()
    particlesRef.current = particles

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // 3D projection
        const scale = 500 / (500 + particle.z)
        const x2d = particle.x * scale + canvas.width / 2
        const y2d = particle.y * scale + canvas.height / 2

        // Reset if out of bounds
        if (particle.z > 500 || x2d < 0 || x2d > canvas.width || y2d < 0 || y2d > canvas.height) {
          particle.x = (Math.random() - 0.5) * canvas.width
          particle.y = (Math.random() - 0.5) * canvas.height
          particle.z = -500
        }

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity * scale
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(x2d, y2d, particle.size * scale, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // Draw connections
        particles.forEach((otherParticle, otherIndex) => {
          if (index !== otherIndex) {
            const dx = particle.x - otherParticle.x
            const dy = particle.y - otherParticle.y
            const distance = Math.sqrt(dx * dx + dy * dy)
            
            if (distance < 100) {
              const otherScale = 500 / (500 + otherParticle.z)
              const otherX2d = otherParticle.x * otherScale + canvas.width / 2
              const otherY2d = otherParticle.y * otherScale + canvas.height / 2
              
              ctx.save()
              ctx.globalAlpha = (1 - distance / 100) * 0.1 * scale * otherScale
              ctx.strokeStyle = '#007AFF'
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(x2d, y2d)
              ctx.lineTo(otherX2d, otherY2d)
              ctx.stroke()
              ctx.restore()
            }
          }
        })
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-40"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default ParticleField3D