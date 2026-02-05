import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionWrapper from './SectionWrapper'
import GlowCard from './GlowCard'
import { ChevronRightIcon } from './Icons'

const projectImages = {
  'SQL + Power BI': '/niviiportfolio/project-images/dashboard.svg',
  'MERN Stack + SQL': '/niviiportfolio/project-images/inventory.svg',
  'Figma + Flutterflow': '/niviiportfolio/project-images/portfolio.svg',
}

const FILTERS = ['All', 'SQL Projects', 'Web Dev', 'Data Analysis']

const cardColors = [
  'from-accent-cyan to-accent-purple',
  'from-accent-purple to-pink-500',
  'from-accent-cyan to-teal-500',
]

function getCategory(type) {
  if (!type) return 'Other'
  if (type.includes('SQL') || type.includes('Power BI')) return 'SQL Projects'
  if (type.includes('MERN') || type.includes('Figma')) return 'Web Dev'
  if (type.includes('Data') || type.includes('Power BI')) return 'Data Analysis'
  return 'Other'
}

export default function Projects({ data }) {
  const [filter, setFilter] = useState('All')
  const [modalProject, setModalProject] = useState(null)
  const { ref, isInView } = useScrollReveal(0.08, true)

  const projects = data?.projects || []
  const filtered =
    filter === 'All'
      ? projects
      : projects.filter((p) => getCategory(p.type) === filter)

  return (
    <>
      <SectionWrapper
        id="projects"
        title="Featured Projects"
        subtitle="Data-driven solutions and creative design"
        className="bg-slate-50 dark:bg-space relative overflow-hidden transition-colors duration-300"
      >
        <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
        <div ref={ref} className="relative z-10 max-w-6xl mx-auto">
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
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

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            variants={{
              visible: { transition: { staggerChildren: 0.08 } },
              hidden: {},
            }}
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, idx) => (
                <motion.div
                  key={project.name}
                  layout
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.95 },
                    visible: { opacity: 1, y: 0, scale: 1 },
                  }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="group"
                >
                  <GlowCard
                    glowColor={cardColors[idx % cardColors.length]}
                    hoverScale={1.03}
                    className="h-full"
                  >
                    <div
                      className="p-6 h-full flex flex-col cursor-pointer"
                      onClick={() => setModalProject(project)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setModalProject(project)}
                    >
                      <div className="mb-4">
                        <img
                          src={projectImages[project.type] || projectImages['SQL + Power BI']}
                          alt={project.name}
                          className="w-16 h-16 object-contain group-hover:scale-110 transition-transform"
                        />
                      </div>
                      <h3 className="text-xl font-display font-semibold text-slate-800 dark:text-slate-800 dark:text-slate-bright mb-2 group-hover:text-accent-cyan transition-colors">
                        {project.name}
                      </h3>
                      <p className="text-slate-600 dark:text-slate text-sm mb-4 flex-1 line-clamp-3">
                        {project.summary}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech?.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 rounded bg-white/10 dark:bg-white/5 text-slate-600 dark:text-slate text-xs font-mono"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4 flex gap-2">
                        <span className="text-accent-cyan text-sm font-medium">
                          View Details →
                        </span>
                      </div>
                    </div>
                  </GlowCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-space/90 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setModalProject(null)}
          >
            <motion.div
              className="glass-strong rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-8 border border-accent-cyan/20"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-display font-bold text-slate-800 dark:text-slate-bright">
                    {modalProject.name}
                  </h3>
                  <p className="text-accent-cyan font-medium">{modalProject.type}</p>
                  <p className="text-slate-600 dark:text-slate text-sm">{modalProject.category}</p>
                </div>
                <motion.button
                  className="text-slate-600 dark:text-slate hover:text-accent-cyan text-2xl p-2"
                  onClick={() => setModalProject(null)}
                  whileHover={{ rotate: 90 }}
                  aria-label="Close"
                >
                  ×
                </motion.button>
              </div>
              <p className="text-slate-600 dark:text-slate-light mb-6">{modalProject.summary}</p>
              {modalProject.details?.description && (
                <ul className="space-y-2 mb-6">
                  {modalProject.details.description.map((d, i) => (
                    <li key={i} className="flex gap-2 text-slate-600 dark:text-slate-light text-sm">
                      <ChevronRightIcon className="text-accent-cyan w-4 h-4" />
                      {d}
                    </li>
                  ))}
                </ul>
              )}
              {modalProject.details?.outcome && (
                <p className="text-accent-cyan/90 text-sm mb-6 p-4 rounded-lg bg-accent-cyan/10">
                  {modalProject.details.outcome}
                </p>
              )}
              <div className="flex flex-wrap gap-2">
                {modalProject.tech?.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 rounded-lg bg-white/10 dark:bg-white/5 text-slate-600 dark:text-slate text-sm"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
