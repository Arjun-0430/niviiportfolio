import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const About = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()
  const [isHovered, setIsHovered] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const aboutWords = data.about.split(' ')

  return (
    <motion.section 
      id="about" 
      ref={ref} 
      className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/10 dark:from-slate-900 dark:via-slate-800/20 dark:to-slate-900"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/10 dark:from-slate-800/30 dark:via-slate-700/20 dark:to-slate-800/10"
        style={{ y: y }}
      />
      
      {/* Floating Elements */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-20 h-20 rounded-full opacity-10"
          style={{
            background: `radial-gradient(circle, ${['rgba(14, 165, 233, 0.1)', 'rgba(168, 85, 247, 0.1)', 'rgba(59, 130, 246, 0.1)'][i % 3]}, transparent)`,
            left: `${10 + i * 15}%`,
            top: `${20 + i * 10}%`,
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Enhanced Photo Card */}
          <motion.div
            className="relative group"
            variants={itemVariants}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.div
              className="glass-strong rounded-3xl p-8 shadow-2xl"
              style={{ perspective: '1000px' }}
              initial={{ rotateY: -15, rotateX: 10 }}
              animate={{ rotateY: -8, rotateX: 5 }}
              whileHover={{ 
                rotateY: 8, 
                rotateX: -5, 
                scale: 1.05,
                boxShadow: '0 40px 100px rgba(0, 122, 255, 0.4)'
              }}
              transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div 
                className="aspect-[3/4] bg-gradient-to-br from-primary-400 via-accent-400 to-primary-500 dark:from-primary-600 dark:via-accent-600 dark:to-primary-700 rounded-2xl flex items-center justify-center relative overflow-hidden p-2"
              >
                <motion.img
                  src="/niviiportfolio/nivii.jpg"
                  alt="Nivetha V"
                  className="w-full h-full object-fill rounded-xl"
                  animate={{ 
                    scale: isHovered ? 1.05 : 1
                  }}
                  transition={{ duration: 0.5 }}
                  loading="lazy"
                />
                
                {/* Floating Particles */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/50 rounded-full"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + i * 8}%`,
                    }}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0.3, 0.8, 0.3],
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Enhanced Info Tags */}
              <motion.div 
                className="mt-8 flex flex-wrap gap-3 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5, staggerChildren: 0.1 }}
              >
                <motion.span 
                  className="px-6 py-3 bg-primary-100 dark:bg-primary-800 text-primary-800 dark:text-primary-200 rounded-full text-sm font-medium glass backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  📍 {data.location}
                </motion.span>
                {data.languages.map((lang, i) => (
                  <motion.span 
                    key={lang} 
                    className="px-6 py-3 bg-accent-100 dark:bg-accent-800 text-accent-800 dark:text-accent-200 rounded-full text-sm font-medium glass backdrop-blur-sm"
                    whileHover={{ scale: 1.05, y: -2 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.7 + i * 0.1, type: 'spring' }}
                  >
                    🗣️ {lang}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Enhanced Content */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.h2 
              className="text-6xl lg:text-7xl font-display font-bold gradient-text leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              About Me
            </motion.h2>
            
            {/* Animated Text Reveal */}
            <motion.div className="text-xl lg:text-2xl text-neutral-700 dark:text-neutral-300 leading-relaxed space-y-6">
              {aboutWords.map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ 
                    duration: 0.3, 
                    delay: 0.6 + i * 0.03,
                    ease: 'easeOut'
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>

            {/* Stats or Highlights */}
            <motion.div 
              className="grid grid-cols-2 gap-6 mt-12"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <motion.div 
                className="glass rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, rotateY: 5 }}
              >
                <div className="text-3xl font-bold gradient-text">4+</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">Internships</div>
              </motion.div>
              <motion.div 
                className="glass rounded-2xl p-6 text-center"
                whileHover={{ scale: 1.05, rotateY: -5 }}
              >
                <div className="text-3xl font-bold gradient-text">8.6</div>
                <div className="text-sm text-neutral-600 dark:text-neutral-400 mt-1">CGPA</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default About
