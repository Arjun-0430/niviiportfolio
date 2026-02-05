import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import MatrixBackground from './MatrixBackground'
import TypeWriter from './TypeWriter'
import RippleButton from './RippleButton'

function getSocialLinks(data) {
  const c = data?.contact || {}
  return [
    { label: 'LinkedIn', href: c.linkedin || 'https://www.linkedin.com/in/nivethavenkatraman/', icon: 'in' },
    { label: 'GitHub', href: c.github || 'https://github.com/Nivetha-1235', icon: 'gh' },
    { label: 'Email', href: `mailto:${c.email || 'nivethavenkatraman48@gmail.com'}`, icon: 'mail' },
  ]
}

export default function Hero({ data }) {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.35], [1, 0])

  // Subtle 3D parallax tilt for the hero name based on mouse position
  const tiltX = useMotionValue(0)
  const tiltY = useMotionValue(0)
  const smoothTiltX = useSpring(tiltX, { stiffness: 120, damping: 18 })
  const smoothTiltY = useSpring(tiltY, { stiffness: 120, damping: 18 })

  const handleMouseMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const yPos = (event.clientY - rect.top) / rect.height - 0.5
    // Limit tilt to ±8 degrees
    tiltX.set(x * 8)
    tiltY.set(-yPos * 8)
  }

  const resetTilt = () => {
    tiltX.set(0)
    tiltY.set(0)
  }

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="hero-section relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-slate-100 dark:bg-space transition-colors duration-300"
      style={{ y, opacity }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
    >
      {/* Background layers - blue accent */}
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/15 via-transparent to-blue-400/10 dark:from-blue-500/20 dark:to-blue-400/15" />
      <MatrixBackground opacity={0.12} color="blue" />

      {/* Deep SQL/data glow behind the name for extra depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-accent-cyan/18 via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.4 }}
      />

      {/* Floating SQL keywords in the deep background */}
      <div className="absolute inset-0 pointer-events-none select-none hidden sm:block">
        {['SELECT * FROM', 'INNER JOIN', 'WHERE status = \'ACTIVE\'', 'GROUP BY region', 'ORDER BY created_at DESC'].map(
          (phrase, index) => (
            <motion.span
              key={phrase}
              className="absolute text-[10px] md:text-xs font-mono text-slate-500/40 dark:text-slate/60"
              style={{
                top: `${20 + index * 12}%`,
                left: index % 2 === 0 ? '8%' : '72%',
              }}
              initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
              animate={{ opacity: [0, 1, 0.4], x: [0, index % 2 === 0 ? 10 : -10, 0] }}
              transition={{
                duration: 12 + index * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1 + index * 0.6,
              }}
            >
              {phrase}
            </motion.span>
          )
        )}
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Name: white text + letter glitch (light: white/blue, dark: black/white) */}
        <motion.div
          className="mb-6 relative hero-glitch-wrap text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-bold tracking-tight"
          initial={{ opacity: 0, filter: 'blur(20px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{
            opacity: { duration: 1.2, delay: 0.2 },
            filter: { duration: 1, delay: 0.5 },
          }}
          style={{
            rotateY: smoothTiltX,
            rotateX: smoothTiltY,
            transformPerspective: 1000,
          }}
        >
          <span className="glitch-layer-1" aria-hidden>NIVETHA V</span>
          <span className="glitch-layer-2" aria-hidden>NIVETHA V</span>
          <span className="hero-glitch-name block" data-text="NIVETHA V">
            NIVETHA V
          </span>
          {/* Holographic scan line sweep */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-accent-cyan/20 to-transparent h-24 pointer-events-none"
            initial={{ y: '-100%' }}
            animate={{ y: '200%' }}
            transition={{ duration: 0.8, delay: 1.8, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Tagline: < SQL Developer /> with typewriter */}
        <motion.div
          className="font-mono text-lg sm:text-xl md:text-2xl text-slate-600 dark:text-slate mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
        >
          <span className="text-accent-cyan">&lt;</span>
          <TypeWriter text={data?.title || 'SQL Developer'} startDelay={2500} speed={60} showCursor />
          <span className="text-accent-cyan"> /&gt;</span>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.8 }}
        >
          <RippleButton
            className="px-8 py-4 rounded-lg font-semibold text-space bg-accent-cyan text-space hover:bg-accent-cyan/90 transition-colors ripple-cyan"
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            rippleColor="rgba(10, 25, 47, 0.3)"
          >
            Explore My Work
          </RippleButton>
          {data?.contact?.resumePdf && (
            <motion.a
              href={`${import.meta.env.BASE_URL}${encodeURIComponent(data.contact.resumePdf)}`}
              download
              className="px-8 py-4 rounded-lg font-semibold border-2 border-accent-cyan/50 text-accent-cyan hover:bg-accent-cyan/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Download Resume
            </motion.a>
          )}
        </motion.div>

        {/* Social links - stagger from sides */}
        <motion.div
          className="flex justify-center gap-6 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2, duration: 0.6 }}
        >
          {getSocialLinks(data).map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate hover:text-accent-cyan transition-colors text-sm font-medium"
              initial={{ opacity: 0, x: i === 0 ? -20 : i === 2 ? 20 : 0 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 3.4 + i * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              aria-label={link.label}
            >
              {link.icon === 'in' && 'LinkedIn'}
              {link.icon === 'gh' && 'GitHub'}
              {link.icon === 'mail' && 'Email'}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-accent-cyan/50 rounded-full flex justify-center pt-2"
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="w-1 h-2 bg-accent-cyan rounded-full" />
        </motion.div>
        <p className="text-slate-500 dark:text-slate text-xs">Scroll to explore</p>
      </motion.div>
    </motion.section>
  )
}
