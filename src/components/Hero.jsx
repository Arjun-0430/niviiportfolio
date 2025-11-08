import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import ParticleField3D from './ParticleField3D'
import LetterGlitch from './LetterGlitch'
import TextScramble from './TextScramble'
import TypeWriter from './TypeWriter'

const Hero = ({ data }) => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-apple-white via-blue-50/20 to-indigo-50/10 dark:from-apple-black dark:via-apple-gray/30 dark:to-apple-black"
      style={{ y, opacity }}
    >
      <LetterGlitch glitchSpeed={50} centerVignette={true} smooth={true} />
      <ParticleField3D />
      
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-apple-blue/5 to-transparent" />

      <div className="relative z-10 text-center px-6 max-w-6xl">
        {/* Advanced Text Animations */}
        <motion.div className="mb-8 relative">
          <motion.h1
            className="text-7xl md:text-9xl font-display font-light text-apple-black dark:text-apple-white mb-4 relative z-10"
            initial={{ opacity: 0, filter: 'blur(20px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.span
              initial={{ opacity: 0, filter: 'blur(10px)' }}
              animate={{ opacity: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Hi, I'm{' '}
            </motion.span>
            <motion.span 
              className="gradient-text font-semibold relative inline-block"
              initial={{ opacity: 0, scale: 0.8, filter: 'blur(15px)' }}
              animate={{ 
                opacity: 1, 
                scale: 1,
                filter: 'blur(0px)',
                textShadow: [
                  '0 0 0px rgba(0,122,255,0)',
                  '0 0 30px rgba(0,122,255,0.6)',
                  '0 0 0px rgba(0,122,255,0)'
                ]
              }}
              transition={{ 
                duration: 1.5,
                delay: 0.8,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
            >
              <TextScramble 
                text="Nivetha V." 
                startDelay={1200}
                scrambleSpeed={30}
              />
              <motion.div
                className="absolute -inset-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-2xl blur-2xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ 
                  opacity: [0, 0.8, 0.3, 0.6, 0],
                  scale: [0.8, 1.2, 1, 1.1, 0.9]
                }}
                transition={{ duration: 3, delay: 1.8, ease: 'easeInOut' }}
              />
            </motion.span>
          </motion.h1>
          
          {/* Background blur effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl blur-3xl"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: [0, 0.4, 0.2],
              scale: [0.5, 1.5, 1.2]
            }}
            transition={{ duration: 2.5, delay: 1, ease: 'easeOut' }}
          />
        </motion.div>

        {/* Professional Title */}
        <motion.h2
          className="text-3xl md:text-5xl font-display font-medium text-apple-black/80 dark:text-apple-white/80 mb-6 relative"
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 1, 
            delay: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            {data.title}
          </motion.span>
          <motion.div
            className="absolute -inset-2 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-lg blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{ duration: 2, delay: 1.8 }}
          />
        </motion.h2>

        {/* Animated Tagline */}
        <motion.p
          className="text-xl md:text-2xl text-apple-black/60 dark:text-apple-white/60 mb-12 max-w-4xl mx-auto leading-relaxed font-light relative"
          initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 1, 
            delay: 2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <TypeWriter 
            text={data.tagline}
            startDelay={2500}
            speed={50}
            showCursor={false}
          />
        </motion.p>

        {/* Apple-style CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 30, filter: 'blur(3px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ 
            duration: 1, 
            delay: 2.2,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        >
          <motion.a
            href="#projects"
            className="apple-button px-8 py-4 text-white rounded-lg font-medium text-lg apple-transition relative overflow-hidden"
            initial={{ opacity: 0, filter: 'blur(2px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 2.5, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 10px 30px rgba(0,122,255,0.3)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View Projects</span>
          </motion.a>
          
          <motion.a
            href={data.contact.resumePdf}
            download
            className="px-8 py-4 frosted-glass rounded-lg font-medium text-lg apple-transition border border-apple-black/10 dark:border-apple-white/10 relative overflow-hidden"
            initial={{ opacity: 0, filter: 'blur(2px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ delay: 2.7, duration: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-white/10 dark:bg-white/5 blur-sm"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">Download Resume</span>
          </motion.a>
        </motion.div>
      </div>

      {/* Apple-style Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-apple-black/20 dark:border-apple-white/20 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-1 h-3 bg-apple-blue rounded-full" />
        </motion.div>
        <p className="text-sm text-apple-black/50 dark:text-apple-white/50 font-light">
          Scroll to explore
        </p>
      </motion.div>
    </motion.section>
  )
}

export default Hero
