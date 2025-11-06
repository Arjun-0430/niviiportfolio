import { useInView } from 'framer-motion'
import { useRef } from 'react'

export const useScrollReveal = (threshold = 0.1, once = true) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { 
    threshold, 
    once,
    margin: '-100px 0px -100px 0px'
  })

  const variants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  return { ref, isInView, variants, itemVariants }
}