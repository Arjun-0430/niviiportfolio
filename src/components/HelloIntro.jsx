import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const HelloIntro = ({ onComplete }) => {
  const [stage, setStage] = useState('hello') // hello -> name -> complete
  const [currentHello, setCurrentHello] = useState(0)
  const [showGlow, setShowGlow] = useState(false)

  const hellos = [
    { text: 'Hello', lang: 'English' },
    { text: 'Bonjour', lang: 'Français' },
    { text: 'Hola', lang: 'Español' },
    { text: 'Guten Tag', lang: 'Deutsch' },
    { text: 'Ciao', lang: 'Italiano' },
    { text: 'こんにちは', lang: '日本語' },
    { text: 'Hello', lang: 'English' }
  ]

  useEffect(() => {
    // Cycle through hellos
    const helloInterval = setInterval(() => {
      setCurrentHello(prev => {
        if (prev < hellos.length - 1) {
          return prev + 1
        }
        clearInterval(helloInterval)
        return prev
      })
    }, 800)

    const timer1 = setTimeout(() => {
      setShowGlow(true)
    }, 2000)

    const timer2 = setTimeout(() => {
      setStage('name')
    }, 6000)

    const timer3 = setTimeout(() => {
      setStage('complete')
      onComplete()
    }, 8500)

    return () => {
      clearInterval(helloInterval)
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          className="fixed inset-0 bg-apple-black flex items-center justify-center z-50"
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Glow Effect */}
          {showGlow && (
            <motion.div
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 3 }}
              transition={{ duration: 2, ease: 'easeOut' }}
            >
              <div className="absolute inset-0 bg-gradient-radial from-white/10 via-white/5 to-transparent" />
            </motion.div>
          )}

          {/* Apple-style Hello Animation */}
          {stage === 'hello' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentHello}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <motion.h1
                    className="text-6xl md:text-8xl font-display font-light text-apple-white mb-4"
                    animate={currentHello === hellos.length - 1 ? {
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={{ duration: 1.5, ease: 'easeInOut' }}
                  >
                    {hellos[currentHello].text}
                  </motion.h1>
                  <motion.p
                    className="text-lg text-apple-white/60 font-light"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 0.3 }}
                  >
                    {hellos[currentHello].lang}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}

          {/* Name Reveal */}
          {stage === 'name' && (
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.p
                className="text-2xl md:text-3xl font-body font-light text-apple-white/80 mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                Hi, I'm
              </motion.p>
              <motion.h1
                className="text-5xl md:text-7xl font-display font-semibold gradient-text"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.6, 
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 100,
                  damping: 15
                }}
              >
                Nivetha V.
              </motion.h1>
            </motion.div>
          )}

          {/* Apple-style Progress Ring */}
          <motion.div
            className="absolute bottom-20 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.div
              className="w-8 h-8 border-2 border-apple-white/20 rounded-full relative"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <motion.div
                className="absolute inset-0 border-2 border-transparent border-t-apple-white/80 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default HelloIntro