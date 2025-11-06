import { motion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'

const ScrollArt = () => {
  const { scrollYProgress } = useScroll()
  const [elements, setElements] = useState([])
  
  // Pre-calculate transforms outside of map
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 0.1, 0.3, 0.6])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  // Generate art elements based on scroll
  useEffect(() => {
    const artElements = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 60 + 20,
      delay: i * 0.02,
      type: ['circle', 'square', 'triangle'][i % 3]
    }))
    setElements(artElements)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element) => {
        
        return (
          <motion.div
            key={element.id}
            className={`absolute ${element.type === 'circle' ? 'rounded-full' : element.type === 'square' ? 'rounded-lg' : ''}`}
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              width: element.size,
              height: element.size,
              background: element.type === 'circle' 
                ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
                : element.type === 'square'
                ? 'linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1))'
                : 'linear-gradient(60deg, rgba(245, 101, 101, 0.1), rgba(59, 130, 246, 0.1))',
              clipPath: element.type === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 'none'
            }}
            animate={{
              opacity: [0, 0.3, 0.6],
              scale: [0, 0.5, 1],
              rotate: element.type === 'triangle' ? [0, 360] : 0
            }}
            transition={{ 
              duration: 8,
              delay: element.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        )
      })}
    </div>
  )
}

export default ScrollArt