import { motion, useScroll } from 'framer-motion'
import { useState, useEffect } from 'react'

const BackToTop = () => {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useEffect(() => {
    return scrollY.onChange((latest) => {
      setVisible(latest > 500)
    })
  }, [scrollY])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-16 h-16 glass-strong rounded-full shadow-2xl flex items-center justify-center text-3xl z-50 group overflow-hidden"
      initial={{ opacity: 0, scale: 0, rotate: -180 }}
      animate={{ 
        opacity: visible ? 1 : 0, 
        scale: visible ? 1 : 0,
        rotate: visible ? 0 : -180
      }}
      whileHover={{ 
        scale: 1.2, 
        rotate: [0, -10, 10, 0],
        boxShadow: '0 20px 40px rgba(14, 165, 233, 0.4)'
      }}
      whileTap={{ scale: 0.9 }}
      transition={{ 
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 opacity-0 group-hover:opacity-100 rounded-full"
        transition={{ duration: 0.3 }}
      />
      <motion.span
        className="relative z-10"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: 'linear' },
          scale: { duration: 2, repeat: Infinity }
        }}
      >
        🌸
      </motion.span>
      
      {/* Ripple Effect */}
      <motion.div
        className="absolute inset-0 border-2 border-primary-400/50 dark:border-primary-500/50 rounded-full"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }}
      />
    </motion.button>
  )
}

export default BackToTop
