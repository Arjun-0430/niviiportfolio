import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import CardStack from './CardStack'
import ImageReveal from './ImageReveal'
import FloatingElements from './FloatingElements'

const Projects = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()
  const [hoveredProject, setHoveredProject] = useState(null)
  const [expandedProject, setExpandedProject] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const projectImages = {
    'SQL + Power BI': './project-images/dashboard.svg',
    'MERN Stack + SQL': './project-images/inventory.svg',
    'Figma + Flutterflow': './project-images/portfolio.svg'
  }
  
  const projectColors = [
    'from-blue-500 to-purple-600',
    'from-green-500 to-teal-600', 
    'from-pink-500 to-rose-600'
  ]

  return (
    <motion.section 
      id="projects" 
      ref={ref} 
      className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/10 to-purple-50/5 dark:from-slate-900 dark:via-slate-800/10 dark:to-slate-900"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary-50/20 via-accent-50/30 to-primary-100/20 dark:from-neutral-800 dark:via-neutral-700/30 dark:to-neutral-800"
        style={{ y: backgroundY }}
      />
      
      <FloatingElements 
        elements={['⚡', '🚀', '💎', '🔮', '✨', '🎯', '🌟', '💫']}
        count={15}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-6xl lg:text-8xl font-display font-bold gradient-text mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            Featured Projects
          </motion.h2>
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <motion.p 
            className="text-xl text-neutral-600 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Showcasing innovation through data-driven solutions and creative design
          </motion.p>
        </motion.div>

        {/* Project Grid with Cinematic Effects */}
        <div className="grid lg:grid-cols-3 gap-10">
          {data.projects.map((project, idx) => (
            <motion.div
              key={project.name}
              className="group relative"
              initial={{ opacity: 0, y: 100, rotateX: -20 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 1, 
                delay: idx * 0.3,
                type: 'spring',
                stiffness: 100,
                damping: 15
              }}
              onHoverStart={() => setHoveredProject(idx)}
              onHoverEnd={() => setHoveredProject(null)}
            >
              <CardStack 
                stackOffset={6}
                hoverLift={15}
                className="h-full"
              >
                <div className="glass-strong rounded-3xl p-8 h-full relative overflow-hidden">
                {/* Dynamic Background */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${projectColors[idx]} opacity-0 group-hover:opacity-10 rounded-3xl`}
                  transition={{ duration: 0.4 }}
                />
                
                {/* Project Image */}
                <div className="relative z-10 mb-8">
                  <motion.div
                    className="mb-4"
                    animate={{
                      scale: hoveredProject === idx ? 1.1 : 1,
                      rotate: hoveredProject === idx ? [0, 2, -2, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <img 
                      src={projectImages[project.type] || '/project-images/dashboard.svg'}
                      alt={project.name}
                      className="w-20 h-20 object-contain"
                    />
                  </motion.div>
                  <motion.div
                    className={`w-16 h-1 bg-gradient-to-r ${projectColors[idx]} rounded-full`}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: 64 } : {}}
                    transition={{ duration: 0.8, delay: idx * 0.2 + 0.5 }}
                  />
                </div>
                
                {/* Content */}
                <div className="relative z-10 space-y-4">
                  <motion.h3 
                    className="text-2xl font-display font-bold leading-tight"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.2 + 0.3 }}
                  >
                    {project.name}
                  </motion.h3>
                  
                  <motion.span 
                    className={`inline-block px-4 py-2 bg-gradient-to-r ${projectColors[idx]} text-white rounded-full text-sm font-medium`}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: idx * 0.2 + 0.5, type: 'spring' }}
                  >
                    {project.type}
                  </motion.span>
                  
                  <motion.p 
                    className="text-neutral-700 dark:text-neutral-300 leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ delay: idx * 0.2 + 0.7 }}
                  >
                    {project.summary}
                  </motion.p>
                  
                  {/* Interactive Elements */}
                  <motion.div 
                    className="flex items-center gap-4 pt-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: idx * 0.2 + 0.9 }}
                  >
                    <motion.button
                      className="flex items-center gap-2 text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-primary-500 dark:hover:text-primary-400 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedProject(expandedProject === idx ? null : idx)}
                    >
                      <span>{expandedProject === idx ? 'Hide Details' : 'View Details'}</span>
                      <motion.span
                        animate={{ 
                          x: hoveredProject === idx ? 5 : 0,
                          rotate: expandedProject === idx ? 90 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </motion.button>
                  </motion.div>

                    {/* Tech Stack */}
                    {project.tech && (
                      <motion.div 
                        className="flex flex-wrap gap-2 mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: idx * 0.2 + 1.1 }}
                      >
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </motion.div>
                    )}

                    {/* Highlights */}
                    {project.highlights && (
                      <motion.div 
                        className="mt-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ delay: idx * 0.2 + 1.3 }}
                      >
                        <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
                          Key Features:
                        </p>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2"
                            >
                              <span className="w-1 h-1 bg-primary-500 rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedProject === idx && project.details && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-700"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-sm font-medium text-primary-500">
                                {project.category}
                              </span>
                              <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                                {project.type}
                              </span>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-semibold text-neutral-800 dark:text-neutral-200 mb-3">
                                Project Details
                              </h4>
                              <ul className="space-y-2">
                                {project.details.description.map((detail, detailIndex) => (
                                  <motion.li
                                    key={detailIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: detailIndex * 0.1 }}
                                    className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-3"
                                  >
                                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                                    {detail}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2">
                                Outcome
                              </h4>
                              <p className="text-sm text-neutral-700 dark:text-neutral-300">
                                {project.details.outcome}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
                
                {/* Hover Particles */}
                {hoveredProject === idx && Array.from({ length: 8 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/80 rounded-full"
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${30 + i * 8}%`,
                    }}
                    animate={{
                      y: [0, -40, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.1,
                      repeat: Infinity,
                    }}
                  />
                ))}
                </div>
              </CardStack>
              
              {/* Reflection Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent rounded-3xl pointer-events-none"
                animate={{
                  opacity: hoveredProject === idx ? 0.3 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Projects
