import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AdvancedSkillBar = ({ 
  skill, 
  percentage, 
  color, 
  delay = 0, 
  isVisible = false 
}) => {
  const [animatedPercentage, setAnimatedPercentage] = useState(0)

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setAnimatedPercentage(percentage)
      }, delay)
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage, delay])

  return (
    <motion.div
      className="space-y-3"
      initial={{ opacity: 0, x: -20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: delay / 1000 }}
    >
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          {skill}
        </span>
        <motion.span 
          className="text-xs font-bold text-neutral-600 dark:text-neutral-400"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: (delay + 800) / 1000 }}
        >
          {animatedPercentage}%
        </motion.span>
      </div>
      
      {/* Skill Bar Container */}
      <div className="relative w-full h-3 bg-neutral-200 dark:bg-neutral-700 rounded-full overflow-hidden">
        {/* Background Glow */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-20 rounded-full`}
          animate={isVisible ? { 
            scale: [1, 1.05, 1],
            opacity: [0.2, 0.4, 0.2]
          } : {}}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            delay: delay / 1000 
          }}
        />
        
        {/* Animated Progress Bar */}
        <motion.div
          className={`h-full bg-gradient-to-r ${color} rounded-full relative overflow-hidden`}
          initial={{ width: 0 }}
          animate={isVisible ? { width: `${percentage}%` } : {}}
          transition={{ 
            duration: 1.5, 
            delay: delay / 1000,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          {/* Wave Effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/30 to-transparent"
            animate={isVisible ? {
              x: ['-100%', '100%']
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: (delay + 1000) / 1000,
              ease: 'easeInOut'
            }}
          />
          
          {/* Shimmer Effect */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-white/50 rounded-full"
            animate={isVisible ? {
              opacity: [0, 1, 0],
              scaleX: [0, 1, 0]
            } : {}}
            transition={{
              duration: 1.5,
              delay: (delay + 500) / 1000
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export default AdvancedSkillBar