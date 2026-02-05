import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { useLenis } from 'lenis/react'

const navItems = [
  { id: 'hero', label: 'Home', href: '#' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'experience', label: 'Experience', href: '#experience' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'certifications', label: 'Certifications', href: '#certifications'},
  { id: 'contact', label: 'Contact', href: '#contact' },
]

const FloatingNavigation = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollY } = useScroll()
  const lenis = useLenis()

  // Visibility on scroll (throttled via useMotionValueEvent - already efficient)
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setIsVisible(latest > 100)
  })

  // Active section via Intersection Observer (no scroll listener = no lag)
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id || 'hero')
          }
        })
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  // Lenis-compatible smooth scroll + close menu
  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault()
      if (href === '#') {
        lenis?.scrollTo(0, { duration: 1 })
      } else {
        const el = document.querySelector(href)
        if (el && lenis) {
          lenis.scrollTo(el, { duration: 1, offset: 0 })
        } else if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      }
      setIsMenuOpen(false)
    },
    [lenis]
  )

  // Close menu on escape
  useEffect(() => {
    const onEscape = (e) => {
      if (e.key === 'Escape') setIsMenuOpen(false)
    }
    window.addEventListener('keydown', onEscape)
    return () => window.removeEventListener('keydown', onEscape)
  }, [])

  // Prevent scroll when menu open (mobile) - body + html for iOS Safari
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
      document.body.style.touchAction = 'none'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [isMenuOpen])

  const NavLinks = ({ variant = 'mobile' }) =>
    navItems.map((item) => {
      const isActive = activeSection === item.id
      const isDesktop = variant === 'desktop'
      return (
        <motion.a
          key={item.id}
          href={item.href}
          onClick={(e) => {
            handleNavClick(e, item.href)
          }}
          className={
            isDesktop
              ? `px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-cyan text-space'
                    : 'text-slate-600 dark:text-slate hover:text-accent-cyan'
                }`
              : `block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-accent-cyan/20 text-accent-cyan dark:bg-accent-cyan/20 dark:text-accent-cyan'
                    : 'text-slate-600 hover:text-accent-cyan dark:text-slate hover:dark:text-accent-cyan'
                }`
          }
          whileHover={isDesktop ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.98 }}
        >
          {item.label}
        </motion.a>
      )
    })

  return (
    <>
      {/* Desktop: full nav bar (md and up) */}
      <motion.nav
        className="fixed top-6 left-1/2 -translate-x-1/2 z-40 hidden md:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="glass-strong rounded-full px-4 py-2 border border-accent-cyan/20 shadow-xl">
          <div className="flex flex-wrap items-center justify-center gap-1">
            <NavLinks variant="desktop" />
          </div>
        </div>
      </motion.nav>

      {/* Mobile: hamburger button */}
      <motion.button
        className="fixed top-6 left-6 z-50 flex md:hidden w-12 h-12 rounded-xl items-center justify-center border border-slate-300 dark:border-accent-cyan/30 bg-white/90 dark:bg-space-light/90 backdrop-blur-md shadow-lg"
        onClick={() => setIsMenuOpen((o) => !o)}
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        initial={{ opacity: 0, y: -20 }}
        animate={{
          opacity: isVisible ? 1 : 0,
          y: isVisible ? 0 : -20,
        }}
        transition={{ duration: 0.3 }}
        whileTap={{ scale: 0.95 }}
      >
        <div className="flex flex-col gap-1.5">
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-slate-700 dark:bg-slate-bright"
            animate={{
              rotate: isMenuOpen ? 45 : 0,
              y: isMenuOpen ? 4 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-slate-700 dark:bg-slate-bright"
            animate={{ opacity: isMenuOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
          />
          <motion.span
            className="block w-5 h-0.5 rounded-full bg-slate-700 dark:bg-slate-bright"
            animate={{
              rotate: isMenuOpen ? -45 : 0,
              y: isMenuOpen ? -4 : 0,
            }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.button>

      {/* Mobile: slide-in drawer overlay */}
      <motion.div
        className="fixed inset-0 z-[48] md:hidden"
        initial={false}
        animate={{ pointerEvents: isMenuOpen ? 'auto' : 'none' }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden
        />

        {/* Drawer panel */}
        <motion.aside
          className="absolute top-0 right-0 w-[min(280px,85vw)] h-full bg-white/95 dark:bg-space/98 backdrop-blur-xl border-l border-slate-200 dark:border-accent-cyan/20 shadow-2xl"
          initial={{ x: '100%' }}
          animate={{ x: isMenuOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          aria-label="Navigation menu"
        >
          <div className="pt-20 px-6 pb-8 flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate mb-4">
              Menu
            </p>
            <NavLinks />
          </div>
        </motion.aside>
      </motion.div>
    </>
  )
}

export default FloatingNavigation
