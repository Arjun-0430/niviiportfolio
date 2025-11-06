import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const InnovativeElements = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ 
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {/* Interactive Light Beam */}
      <motion.div
        className="absolute w-1 h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
        style={{
          left: `${mousePos.x}%`,
          filter: 'blur(2px)'
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />
      
      {/* Floating Code Snippets */}
      {['{ }', '< />', '( )', '[ ]', '=> ', 'fn()'].map((code, i) => (
        <motion.div
          key={i}
          className="absolute text-blue-500/20 dark:text-blue-400/20 font-mono text-2xl"
          style={{
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            delay: i * 0.5
          }}
        >
          {code}
        </motion.div>
      ))}
      
      {/* Neural Network Lines */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${10 + i * 12}%`}
            y1="20%"
            x2={`${15 + i * 12}%`}
            y2="80%"
            stroke="url(#gradient)"
            strokeWidth="1"
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
          />
        ))}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  )
}

export default InnovativeElements