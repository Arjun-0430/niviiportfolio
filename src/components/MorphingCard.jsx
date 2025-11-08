import { motion } from 'framer-motion'
import { useState } from 'react'

const MorphingCard = ({ 
  children, 
  className = '',
  morphColor = 'from-blue-400 to-purple-500' 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Morphing Background */}
      <motion.div
        className="morph-card rounded-3xl p-8 relative overflow-hidden"
        animate={isHovered ? {
          borderRadius: ['24px', '40px', '24px'],
          scale: [1, 1.02, 1.01]
        } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ 
          scale: 1.02,
          y: -5
        }}
      >
        {/* Dynamic Morphing Background */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          animate={isHovered ? {
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
              'linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
              'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))'
            ]
          } : {}}
          transition={{ duration: 4, repeat: Infinity }}
        />
        
        {/* Morphing Border */}
        <motion.div
          className="absolute inset-0 rounded-3xl border-2 border-transparent"
          animate={isHovered ? {
            borderColor: [
              'rgba(59, 130, 246, 0.3)',
              'rgba(168, 85, 247, 0.3)',
              'rgba(59, 130, 246, 0.3)'
            ],
            borderRadius: ['24px', '40px', '24px']
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        />
        
        {/* Content Container */}
        <div className="relative z-10">
          {children}
        </div>
        
        {/* Morphing Particles */}
        {isHovered && Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [0, 1.5, 0],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
    </motion.div>
  )
}

export default MorphingCard