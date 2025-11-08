import { motion } from 'framer-motion'

const TimelineGlow = ({ 
  progress = 100, 
  className = '',
  glowColor = 'from-blue-500 to-purple-600' 
}) => {
  return (
    <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 ${className}`}>
      {/* Base Timeline */}
      <div className="absolute inset-0 bg-apple-black/20 dark:bg-apple-white/20" />
      
      {/* Animated Progress Line */}
      <motion.div
        className={`absolute inset-0 bg-gradient-to-b ${glowColor}`}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        style={{ transformOrigin: 'top' }}
        transition={{ duration: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
      />
    </div>
  )
}

export default TimelineGlow