import { motion } from 'framer-motion'
import { useState } from 'react'

const GlowCard = ({ 
  children, 
  className = '', 
  glowColor = 'from-blue-500 to-purple-600',
  hoverScale = 1.05 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={`relative group ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: hoverScale,
        rotateY: 5,
        rotateX: 2
      }}
      transition={{ 
        type: 'spring',
        stiffness: 200,
        damping: 20
      }}
    >
      {/* Glow Effect */}
      <motion.div
        className={`absolute -inset-1 bg-gradient-to-r ${glowColor} rounded-3xl blur-lg opacity-0 group-hover:opacity-30`}
        animate={isHovered ? {
          scale: [1, 1.05, 1],
          opacity: [0, 0.3, 0.2]
        } : {}}
        transition={{ duration: 0.6 }}
      />
      
      {/* Border Glow */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${glowColor} rounded-3xl opacity-0 group-hover:opacity-20`}
        animate={isHovered ? {
          background: [
            `linear-gradient(45deg, ${glowColor.split(' ')[1]}, ${glowColor.split(' ')[3]})`,
            `linear-gradient(90deg, ${glowColor.split(' ')[3]}, ${glowColor.split(' ')[1]})`,
            `linear-gradient(135deg, ${glowColor.split(' ')[1]}, ${glowColor.split(' ')[3]})`
          ]
        } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      
      {/* Card Content */}
      <div className="relative glass-strong rounded-3xl p-8 h-full overflow-hidden backdrop-blur-md">
        {/* Animated Background Pattern */}
        <motion.div
          className="absolute inset-0 opacity-5"
          animate={isHovered ? {
            background: [
              'radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3), transparent 50%)',
              'radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3), transparent 50%)',
              'radial-gradient(circle at 40% 80%, rgba(119, 198, 255, 0.3), transparent 50%)'
            ]
          } : {}}
          transition={{ duration: 3, repeat: Infinity }}
        />
        
        {children}
        
        {/* Corner Highlights */}
        <motion.div
          className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/20 to-transparent rounded-tr-3xl"
          animate={isHovered ? { opacity: [0, 0.5, 0] } : {}}
          transition={{ duration: 1.5 }}
        />
      </div>
    </motion.div>
  )
}

export default GlowCard