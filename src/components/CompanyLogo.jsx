import { motion } from 'framer-motion'
import { useState } from 'react'

const CompanyLogo = ({ 
  src, 
  alt, 
  className = '',
  size = 'w-40 h-40' 
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  
  if (!src || !alt) {
    return null
  }

  return (
    <motion.div
      className={`${size} opacity-80 ${className}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      {!imageError ? (
        <motion.img
          src={src}
          alt={alt}
          className="w-full h-full object-contain filter drop-shadow-lg"
          animate={isHovered ? {
            rotateY: [0, 180, 360],
            filter: [
              'drop-shadow(0 4px 8px rgba(0,0,0,0.1))',
              'drop-shadow(0 8px 16px rgba(59, 130, 246, 0.3))',
              'drop-shadow(0 4px 8px rgba(0,0,0,0.1))'
            ]
          } : {}}
          transition={{ duration: 1 }}
          onError={(e) => {
            console.log('Image failed to load:', src)
            setImageError(true)
            e.target.style.display = 'none'
          }}
        />
      ) : (
        <motion.div
          className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg"
          animate={isHovered ? {
            background: [
              'linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))',
              'linear-gradient(90deg, rgba(168, 85, 247, 0.1), rgba(59, 130, 246, 0.1))',
              'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(168, 85, 247, 0.1))'
            ]
          } : {}}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs text-gray-500 dark:text-gray-400 text-center px-2">
            {alt}
          </span>
        </motion.div>
      )}
      
      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-lg blur-lg opacity-0"
        animate={isHovered ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default CompanyLogo