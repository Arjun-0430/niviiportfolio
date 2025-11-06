import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ProjectsShowcase = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()
  const containerRef = useRef(null)
  const [hoveredProject, setHoveredProject] = useState(null)
  const [expandedProject, setExpandedProject] = useState(null)
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })
  
  const x = useTransform(scrollYProgress, [0, 1], [0, -100])

  const projectIcons = {
    'SQL + Power BI': '📊',
    'MERN Stack + SQL': '⚡',
    'Figma + Flutterflow': '🎨'
  }

  const projectGradients = {
    'SQL + Power BI': 'from-blue-500 to-cyan-500',
    'MERN Stack + SQL': 'from-green-500 to-emerald-500',
    'Figma + Flutterflow': 'from-purple-500 to-pink-500'
  }

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-blue-50/20 to-apple-white dark:from-apple-gray/20 dark:to-apple-black overflow-hidden"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-light text-apple-black dark:text-apple-white mb-6">
            Featured Projects
          </h2>
          <motion.div
            className="w-24 h-1 bg-gradient-to-r from-apple-blue to-blue-600 mx-auto mb-6 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 96 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-xl text-apple-black/60 dark:text-apple-white/60 max-w-3xl mx-auto font-light">
            Showcasing innovation through data-driven solutions and creative design
          </p>
        </motion.div>

        {/* Horizontal Cinematic Scroll */}
        <div ref={containerRef} className="relative">
          <div className="grid lg:grid-cols-3 gap-8">
            {data.projects.map((project, index) => (
              <motion.div
                key={project.name}
                className="group relative"
                variants={itemVariants}
                onHoverStart={() => setHoveredProject(index)}
                onHoverEnd={() => setHoveredProject(null)}
              >
                <motion.div
                  className="frosted-glass rounded-3xl p-8 h-full relative overflow-hidden apple-transition"
                  whileHover={{
                    scale: 1.03,
                    rotateY: 3,
                    boxShadow: '0 25px 50px rgba(0, 122, 255, 0.15)'
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                >
                  {/* Light Streak Reflection */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
                    initial={{ x: '-100%' }}
                    animate={hoveredProject === index ? { x: '200%' } : {}}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}
                  />

                  {/* Project Icon */}
                  <motion.div
                    className="mb-6"
                    animate={{
                      scale: hoveredProject === index ? 1.1 : 1,
                      rotate: hoveredProject === index ? [0, 5, -5, 0] : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="text-6xl mb-4">
                      {projectIcons[project.type] || '💼'}
                    </div>
                    <motion.div
                      className={`w-16 h-1 bg-gradient-to-r ${projectGradients[project.type] || 'from-gray-500 to-gray-600'} rounded-full`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: 64 } : {}}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                    />
                  </motion.div>

                  {/* Project Content */}
                  <div className="space-y-4">
                    <h3 className="text-2xl font-display font-semibold text-apple-black dark:text-apple-white leading-tight">
                      {project.name}
                    </h3>

                    <span className={`inline-block px-4 py-2 bg-gradient-to-r ${projectGradients[project.type] || 'from-gray-500 to-gray-600'} text-white rounded-full text-sm font-medium`}>
                      {project.type}
                    </span>

                    <p className="text-apple-black/70 dark:text-apple-white/70 leading-relaxed">
                      {project.summary}
                    </p>

                    {/* Tech Stack */}
                    {project.tech && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {project.tech.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 bg-apple-black/5 dark:bg-apple-white/5 text-apple-black/60 dark:text-apple-white/60 rounded-lg text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Highlights */}
                    {project.highlights && (
                      <div className="mt-4">
                        <p className="text-sm font-medium text-apple-black/50 dark:text-apple-white/50 mb-2">
                          Key Features:
                        </p>
                        <ul className="space-y-1">
                          {project.highlights.map((highlight, highlightIndex) => (
                            <li
                              key={highlightIndex}
                              className="text-sm text-apple-black/60 dark:text-apple-white/60 flex items-center gap-2"
                            >
                              <span className="w-1 h-1 bg-apple-blue rounded-full" />
                              {highlight}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* View Details Button */}
                    <motion.button
                      className="flex items-center gap-2 text-apple-blue font-medium mt-6 apple-transition"
                      whileHover={{ x: 5 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setExpandedProject(expandedProject === index ? null : index)}
                    >
                      <span>{expandedProject === index ? 'Hide Details' : 'View Details'}</span>
                      <motion.span
                        animate={{ 
                          x: hoveredProject === index ? 3 : 0,
                          rotate: expandedProject === index ? 90 : 0
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        →
                      </motion.span>
                    </motion.button>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedProject === index && project.details && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="mt-6 pt-6 border-t border-apple-black/10 dark:border-apple-white/10"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                              <span className="text-sm font-medium text-apple-blue">
                                {project.category}
                              </span>
                              <span className="w-1 h-1 bg-apple-black/30 dark:bg-apple-white/30 rounded-full" />
                              <span className="text-sm text-apple-black/60 dark:text-apple-white/60">
                                {project.type}
                              </span>
                            </div>
                            
                            <div>
                              <h4 className="text-lg font-semibold text-apple-black dark:text-apple-white mb-3">
                                Project Details
                              </h4>
                              <ul className="space-y-2">
                                {project.details.description.map((detail, detailIndex) => (
                                  <motion.li
                                    key={detailIndex}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: detailIndex * 0.1 }}
                                    className="text-sm text-apple-black/70 dark:text-apple-white/70 flex items-start gap-3"
                                  >
                                    <span className="w-2 h-2 bg-apple-blue rounded-full mt-2 flex-shrink-0" />
                                    {detail}
                                  </motion.li>
                                ))}
                              </ul>
                            </div>
                            
                            <div className="bg-gradient-to-r from-apple-blue/5 to-blue-500/5 dark:from-apple-blue/10 dark:to-blue-500/10 rounded-xl p-4">
                              <h4 className="text-sm font-semibold text-apple-blue mb-2">
                                Outcome
                              </h4>
                              <p className="text-sm text-apple-black/70 dark:text-apple-white/70">
                                {project.details.outcome}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default ProjectsShowcase