import { motion } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import GlowCard from './GlowCard'
import SectionWrapper from './SectionWrapper'

const FILTERS = ['All', 'Core', 'Learning']

const categoryMeta = {
  programming: { icon: '💻', color: 'from-accent-cyan to-accent-purple', core: true },
  scripting: { icon: '🐍', color: 'from-green-400 to-accent-cyan', core: true },
  webTech: { icon: '🌐', color: 'from-accent-purple to-pink-500', core: false },
  designPlatforms: { icon: '🎨', color: 'from-pink-400 to-accent-purple', core: false },
  tools: { icon: '🛠️', color: 'from-slate to-accent-cyan', core: true },
  competencies: { icon: '⚡', color: 'from-accent-cyan to-accent-purple', core: false },
}

export default function Skills({ data }) {
  const [filter, setFilter] = useState('All')
  const { ref, isInView, itemVariants } = useScrollReveal(0.08, true)

  const skills = data?.skills || {}
  const groups = [
    { key: 'programming', title: 'Database & SQL', items: skills.programming },
    { key: 'scripting', title: 'Programming', items: skills.scripting },
    { key: 'webTech', title: 'Web Technologies', items: skills.webTech },
    { key: 'designPlatforms', title: 'Design', items: skills.designPlatforms },
    { key: 'tools', title: 'Tools', items: skills.tools },
    { key: 'competencies', title: 'Competencies', items: skills.competencies },
  ].filter((g) => Array.isArray(g.items) && g.items.length > 0)

  const filteredGroups =
    filter === 'All'
      ? groups
      : filter === 'Core'
        ? groups.filter((g) => categoryMeta[g.key]?.core)
        : groups.filter((g) => !categoryMeta[g.key]?.core)

  return (
    <SectionWrapper
      id="skills"
      title="Technical Skills"
      subtitle="Data ecosystem & design tools"
      className="bg-slate-50 dark:bg-space relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {FILTERS.map((f) => (
            <motion.button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2.5 rounded-full font-medium text-sm transition-colors ${
                filter === f
                  ? 'bg-accent-cyan text-space'
                  : 'text-slate-600 dark:text-slate border border-slate-300 dark:border-slate/40 hover:border-accent-cyan/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {f}
            </motion.button>
          ))}
        </motion.div>

        {/* Bento grid - asymmetric */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: { transition: { staggerChildren: 0.08 } },
            hidden: {},
          }}
        >
          {filteredGroups.map((group, i) => {
            const meta = categoryMeta[group.key] || {}
            const isLarge = i === 0 || (filteredGroups.length >= 4 && i === 3)
            return (
              <motion.div
                key={group.key}
                className={isLarge ? 'md:col-span-2' : ''}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <GlowCard
                  glowColor={meta.color || 'from-accent-cyan to-accent-purple'}
                  className="h-full"
                  hoverScale={1.02}
                >
                  <div className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">{meta.icon}</span>
                      <h3 className="text-xl font-display font-semibold text-slate-800 dark:text-slate-bright">
                        {group.title}
                      </h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item, j) => (
                        <motion.span
                          key={item}
                          className="px-3 py-1.5 rounded-lg bg-white/5 dark:bg-white/5 border border-slate-200 dark:border-accent-cyan/20 text-slate-600 dark:text-slate-light text-sm font-mono"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={isInView ? { opacity: 1, scale: 1 } : {}}
                          transition={{ delay: 0.1 * j }}
                          whileHover={{
                            borderColor: 'rgba(100, 255, 218, 0.5)',
                            color: '#e6f1ff',
                          }}
                        >
                          {item}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
