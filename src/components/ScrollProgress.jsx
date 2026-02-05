import { motion, useScroll } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-cyan via-accent-purple to-accent-cyan origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  )
}

export default ScrollProgress
