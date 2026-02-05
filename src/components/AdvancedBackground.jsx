import { motion } from 'framer-motion'
import MatrixBackground from './MatrixBackground'
import ParticleField3D from './ParticleField3D'

/**
 * Advanced React-based background: grid, gradient orbs, matrix rain, particles.
 * Fixed, non-interactive, works in light and dark mode.
 */
export default function AdvancedBackground() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    >
      {/* Base gradient - theme aware */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-100 dark:from-space dark:via-space-light/50 dark:to-space transition-colors duration-300" />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] transition-opacity duration-300"
        style={{
          backgroundImage: `
            linear-gradient(rgba(100, 255, 218, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 218, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating gradient orbs */}
      {[
        { size: 400, x: '10%', y: '20%', color: 'from-accent-cyan/20 to-accent-purple/10', duration: 25 },
        { size: 300, x: '75%', y: '60%', color: 'from-accent-purple/15 to-pink-500/10', duration: 30 },
        { size: 250, x: '50%', y: '80%', color: 'from-accent-cyan/10 to-transparent', duration: 22 },
        { size: 200, x: '85%', y: '15%', color: 'from-accent-purple/20 to-transparent', duration: 28 },
      ].map((orb, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full bg-gradient-to-br ${orb.color} blur-3xl dark:blur-[100px]`}
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, -25, 15, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Matrix rain - dark mode only, low opacity */}
      <div className="hidden dark:block absolute inset-0">
        <MatrixBackground opacity={0.06} color="cyan" />
      </div>

      {/* Particle field - dark mode only */}
      <div className="hidden dark:block absolute inset-0 opacity-30">
        <ParticleField3D />
      </div>

      {/* Top gradient vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 dark:from-transparent dark:via-transparent dark:to-transparent" />
    </div>
  )
}
