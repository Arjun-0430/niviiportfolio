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
      className="fixed bottom-8 right-8 w-14 h-14 glass-strong rounded-full border border-accent-cyan/30 flex items-center justify-center z-50 group overflow-hidden"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: visible ? 1 : 0, scale: visible ? 1 : 0 }}
      whileHover={{
        scale: 1.1,
        boxShadow: '0 0 30px rgba(100, 255, 218, 0.4)',
        borderColor: 'rgba(100, 255, 218, 0.6)',
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      aria-label="Back to top"
    >
      <motion.span className="relative z-10 text-xl" aria-hidden>
        ↑
      </motion.span>
    </motion.button>
  )
}

export default BackToTop
