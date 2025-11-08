import { motion } from 'framer-motion'

const FloatingElements = ({ 
  elements = ['⚡', '🚀', '💎', '🔮', '✨'],
  count = 15,
  className = ''
}) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10 dark:opacity-20"
          style={{
            left: `${(i * 7) % 100}%`,
            top: `${(i * 11) % 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.5, 1],
            x: [0, Math.sin(i) * 100, 0],
            y: [0, Math.cos(i) * 50, 0],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div 
            className="text-4xl"
            animate={{
              rotateY: [0, 180, 360]
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {elements[i % elements.length]}
          </motion.div>
        </motion.div>
      ))}
    </div>
  )
}

export default FloatingElements