import { motion, useScroll, useTransform } from 'framer-motion'
import { ThemeProvider } from './contexts/ThemeContext'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import ExperienceTimeline from './components/ExperienceTimeline'
import Projects from './components/Projects'
import CertificationsBadges from './components/CertificationsBadges'
import Contact from './components/Contact'
import FooterSection from './components/FooterSection'
import ScrollProgress from './components/ScrollProgress'
import BackToTop from './components/BackToTop'
import FloatingNavigation from './components/FloatingNavigation'
import ThemeToggle from './components/ThemeToggle'
import LenisRoot from './components/LenisRoot'
import AdvancedBackground from './components/AdvancedBackground'
import Galaxy from './components/Galaxy'
import resumeData from './data/resumeData.json'

function App() {
  const { scrollYProgress } = useScroll()
  // Galaxy fades in earlier and stays visible
  const galaxyOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1])

  return (
    <ThemeProvider>
      <LenisRoot>
        <motion.div
          className="relative min-h-screen text-slate-800 dark:text-slate-bright bg-slate-100 dark:bg-space transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <AdvancedBackground />
          {/* Galaxy: fades in on scroll from hero into main section */}
          <motion.div
            className="fixed inset-0 z-[1] pointer-events-none"
            style={{ opacity: galaxyOpacity }}
            aria-hidden
          >
            <Galaxy
              mouseRepulsion={false}
              mouseInteraction={false}
              density={2.8}
              glowIntensity={0.4}
              saturation={1}
              hueShift={140}
              twinkleIntensity={0.7}
              rotationSpeed={0.1}
              repulsionStrength={2}
              autoCenterRepulsion={0}
              starSpeed={0.3}
              speed={1}
              transparent
            />
          </motion.div>
          <ScrollProgress />
          <FloatingNavigation />
          <ThemeToggle />

          <main className="relative z-10">
            <Hero data={resumeData} />
            <About data={resumeData} />
            <Skills data={resumeData} />
            <ExperienceTimeline data={resumeData} />
            <Projects data={resumeData} />
            <CertificationsBadges data={resumeData} />
            <Contact data={resumeData} />
            <FooterSection data={resumeData} />
          </main>

          <BackToTop />
        </motion.div>
      </LenisRoot>
    </ThemeProvider>
  )
}

export default App
