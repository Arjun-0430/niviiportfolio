import { motion, useScroll } from 'framer-motion'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent-400 via-primary-400 to-accent-500 origin-left z-49 opacity-50"
        style={{ scaleX: scrollYProgress }}
        transition={{ delay: 0.1 }}
      />
    </>
  )
}

export default ScrollProgress
