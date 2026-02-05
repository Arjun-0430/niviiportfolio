import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect } from 'react'

const FloatingNavigation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const { scrollY } = useScroll()

  const navItems = [
    { id: 'hero', label: 'Home', href: '#' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'certifications', label: 'Certifications', href: '#certifications' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ]

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 100)
  })

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => document.getElementById(item.id))
      const scrollPosition = window.scrollY + 200

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-40"
      initial={{ opacity: 0, y: -20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : -20 
      }}
      transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <div className="glass-strong rounded-full px-4 py-2 border border-accent-cyan/20 shadow-xl">
        <div className="flex flex-wrap items-center justify-center gap-1">
          {navItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.href}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                activeSection === item.id
                  ? 'bg-accent-cyan text-space'
                  : 'text-slate hover:text-accent-cyan'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

export default FloatingNavigation