import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionWrapper from './SectionWrapper'

function getPlatform(cert) {
  const lower = cert.toLowerCase()
  if (lower.includes('hackerrank')) return 'hackerrank'
  if (lower.includes('udemy')) return 'udemy'
  if (lower.includes('skill india')) return 'skillindia'
  if (lower.includes('workshop')) return 'workshop'
  if (lower.includes('cyber')) return 'security'
  return 'institution'
}

function platformGradient(platform) {
  switch (platform) {
    case 'hackerrank':
      return 'from-emerald-400 to-emerald-600'
    case 'udemy':
      return 'from-purple-500 to-fuchsia-500'
    case 'skillindia':
      return 'from-orange-400 to-rose-500'
    case 'workshop':
      return 'from-sky-400 to-cyan-500'
    case 'security':
      return 'from-amber-400 to-red-500'
    default:
      return 'from-blue-500 to-sky-500'
  }
}

function platformLabel(platform) {
  switch (platform) {
    case 'hackerrank':
      return 'HackerRank Certification'
    case 'udemy':
      return 'Udemy Course'
    case 'skillindia':
      return 'Skill India Program'
    case 'workshop':
      return 'Technical Workshop'
    case 'security':
      return 'Security Training'
    default:
      return 'Professional Development'
  }
}

export default function CertificationsBadges({ data }) {
  const { ref, isInView } = useScrollReveal(0.08, true)
  const certs = data?.certifications || []

  return (
    <SectionWrapper
      id="certifications"
      title="Certifications & Achievements"
      subtitle="Continuous learning and professional development"
      className="bg-slate-50 dark:bg-space relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 pb-4"
            animate={isInView ? { x: [0, -320] } : {}}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {[...certs, ...certs].map((cert, index) => (
              (() => {
                const platform = getPlatform(cert)
                const gradient = platformGradient(platform)
                const label = platformLabel(platform)
                return (
              <motion.div
                key={`${cert}-${index}`}
                className="min-w-[300px] shrink-0"
                initial={{ opacity: 0, y: 30, rotate: -2 }}
                animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
                transition={{ delay: (index % certs.length) * 0.1, type: 'spring', stiffness: 200 }}
              >
                <motion.div
                  className="glass-strong rounded-2xl p-6 border border-accent-cyan/20 h-full flex items-start gap-4 relative overflow-hidden"
                  whileHover={{
                    y: -6,
                    borderColor: 'rgba(100, 255, 218, 0.4)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Platform-colored badge icon */}
                  <div
                    className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-2xl shrink-0 shadow-lg`}
                  >
                    🏆
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800 dark:text-slate-bright leading-tight">
                      {cert}
                    </p>
                    <p className="text-slate-600 dark:text-slate text-sm mt-1">
                      {label}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
                )
              })()
            ))}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  )
}
