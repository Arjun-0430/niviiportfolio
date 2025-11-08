import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import HelloIntro from './components/HelloIntro'
import SmoothScroll from './components/SmoothScroll'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import ExperienceTimeline from './components/ExperienceTimeline'
import Projects from './components/Projects'
import EducationSection from './components/EducationSection'
import CertificationsBadges from './components/CertificationsBadges'
import TraitsVisualization from './components/TraitsVisualization'
import Contact from './components/Contact'
import FooterSection from './components/FooterSection'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'

import ThemeToggle from './components/ThemeToggle'
import ScrollArt from './components/ScrollArt'
import InnovativeElements from './components/InnovativeElements'
import FloatingNavigation from './components/FloatingNavigation'
import BackgroundElements from './components/BackgroundElements'
import resumeData from './data/resumeData.json'

function App() {
  const [showIntro, setShowIntro] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  const handleIntroComplete = () => {
    setShowIntro(false)
    setTimeout(() => setIsLoading(false), 500)
  }

  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setShowIntro(false)
      setIsLoading(false)
    }, 6000)
    return () => clearTimeout(fallbackTimer)
  }, [])

  // Removed problematic Lenis smooth scroll

  if (isLoading) {
    return (
      <motion.div 
        className="fixed inset-0 bg-gradient-to-br from-neutral-50 via-primary-50/20 to-accent-50/20 dark:from-neutral-900 dark:via-neutral-800 dark:to-neutral-900 flex items-center justify-center z-50"
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 border-4 border-primary-200 border-t-primary-500 dark:border-primary-700 dark:border-t-primary-400 rounded-full mx-auto mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
          <motion.h1 
            className="text-4xl font-display gradient-text font-bold"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Nivetha V
          </motion.h1>
          <motion.p 
            className="text-neutral-600 dark:text-neutral-400 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Crafting digital experiences...
          </motion.p>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {showIntro && (
          <HelloIntro key="intro" onComplete={handleIntroComplete} />
        )}
        
        {!showIntro && (
          <motion.div 
            key="main"
            className="relative text-apple-black dark:text-apple-white min-h-screen transition-colors duration-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Enhanced Background */}
            <div className="innovative-bg" />
            <div className="mesh-gradient fixed inset-0 z-0" />
            <BackgroundElements />
            
            {/* Floating Orbs */}
            <div className="floating-orbs">
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="orb"
                  style={{
                    width: Math.random() * 100 + 50,
                    height: Math.random() * 100 + 50,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 3}s`,
                    animationDuration: `${15 + Math.random() * 10}s`
                  }}
                />
              ))}
            </div>
            <ScrollArt />
            <InnovativeElements />
            <FloatingNavigation />
            <ScrollProgress />
            <ThemeToggle />

            <div className="relative z-10">
              <SmoothScroll>
                <Hero data={resumeData} />
                <About data={resumeData} />
                <Skills data={resumeData} />
                <ExperienceTimeline data={resumeData} />
                <Projects data={resumeData} />
                <EducationSection data={resumeData} />
                <CertificationsBadges data={resumeData} />
                <TraitsVisualization data={resumeData} />
                <Contact data={resumeData} />
                <FooterSection data={resumeData} />
              </SmoothScroll>
            </div>
            
            <BackToTop />
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default App
