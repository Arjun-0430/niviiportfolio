import { motion } from 'framer-motion'
import { useState } from 'react'

const CardStack = ({ 
  children, 
  className = '', 
  stackOffset = 8,
  hoverLift = 20 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{ perspective: '1000px' }}
    >
      {/* Background Stack Cards */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 dark:from-white/5 dark:to-white/2 rounded-3xl border border-white/20"
          initial={{ 
            rotateX: 0, 
            rotateY: 0, 
            z: -i * stackOffset,
            opacity: 0.7 - i * 0.2
          }}
          animate={isHovered ? {
            rotateX: -5 + i * 2,
            rotateY: 5 - i * 2,
            z: -i * stackOffset - hoverLift,
            opacity: 0.8 - i * 0.15
          } : {
            rotateX: 0,
            rotateY: 0,
            z: -i * stackOffset,
            opacity: 0.7 - i * 0.2
          }}
          transition={{ 
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      ))}
      
      {/* Main Card */}
      <motion.div
        className="relative z-10"
        animate={isHovered ? {
          rotateX: -8,
          rotateY: 8,
          z: hoverLift,
          scale: 1.02
        } : {
          rotateX: 0,
          rotateY: 0,
          z: 0,
          scale: 1
        }}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

export default CardStack