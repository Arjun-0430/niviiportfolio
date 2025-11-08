import { motion } from 'framer-motion'
import { useState } from 'react'

const ImageReveal = ({ 
  icon, 
  className = '', 
  revealColor = 'from-blue-500 to-purple-600' 
}) => {
  const [isRevealed, setIsRevealed] = useState(false)

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => setIsRevealed(true)}
      onHoverEnd={() => setIsRevealed(false)}
    >
      {/* Icon Container */}
      <motion.div
        className="relative z-20 text-7xl mb-4 flex items-center justify-center"
        animate={isRevealed ? {
          scale: [1, 1.2, 1.1],
          rotateY: [0, 180, 360]
        } : {}}
        transition={{ duration: 0.8 }}
      >
        {icon}
      </motion.div>
      
      {/* Reveal Mask */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${revealColor} z-10`}
        initial={{ x: '-100%' }}
        animate={isRevealed ? { x: '100%' } : { x: '-100%' }}
        transition={{ 
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
      />
      
      {/* Shimmer Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent z-30"
        initial={{ x: '-100%', skewX: -20 }}
        animate={isRevealed ? { 
          x: '200%',
          transition: { duration: 0.8, delay: 0.2 }
        } : {}}
      />
      
      {/* Glow Effect */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${revealColor} opacity-0 blur-xl z-0`}
        animate={isRevealed ? { 
          opacity: [0, 0.3, 0],
          scale: [1, 1.2, 1]
        } : {}}
        transition={{ duration: 1 }}
      />
    </motion.div>
  )
}

export default ImageReveal