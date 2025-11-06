import { motion } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const SkillsGrid = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()
  const [hoveredCard, setHoveredCard] = useState(null)

  const skillCategories = [
    {
      title: 'Programming Languages',
      items: data.skills.programming,
      icon: '💻',
      gradient: 'from-apple-blue to-blue-600'
    },
    {
      title: 'Scripting',
      items: data.skills.scripting,
      icon: '🐍',
      gradient: 'from-green-500 to-emerald-600'
    },
    {
      title: 'Web Technologies',
      items: data.skills.webTech,
      icon: '🌐',
      gradient: 'from-orange-500 to-red-500'
    },
    {
      title: 'Design Platforms',
      items: data.skills.designPlatforms,
      icon: '🎨',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      title: 'Tools',
      items: data.skills.tools,
      icon: '🛠️',
      gradient: 'from-gray-600 to-slate-700'
    },
    {
      title: 'Key Competencies',
      items: data.skills.competencies,
      icon: '⚡',
      gradient: 'from-yellow-500 to-amber-600'
    }
  ]

  return (
    <motion.section
      id="skills"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-apple-white to-blue-50/20 dark:from-apple-black dark:to-apple-gray/20"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-light text-apple-black dark:text-apple-white mb-6">
            Skills & Core Competencies
          </h2>
          <p className="text-xl text-apple-black/60 dark:text-apple-white/60 max-w-3xl mx-auto font-light">
            Crafting digital solutions with precision and creativity
          </p>
        </motion.div>

        {/* Interactive Glass Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              className="group relative"
              variants={itemVariants}
              onHoverStart={() => setHoveredCard(index)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div
                className="frosted-glass rounded-3xl p-8 h-full relative overflow-hidden apple-transition"
                whileHover={{ 
                  scale: 1.02,
                  rotateY: 2,
                  boxShadow: '0 20px 40px rgba(0, 122, 255, 0.15)'
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                {/* Hover Gradient Overlay */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 rounded-3xl`}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-6 relative z-10"
                  animate={{
                    scale: hoveredCard === index ? 1.1 : 1,
                    rotate: hoveredCard === index ? [0, 5, -5, 0] : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {category.icon}
                </motion.div>
                
                {/* Title */}
                <h3 className="text-2xl font-display font-medium mb-6 text-apple-black dark:text-apple-white relative z-10">
                  {category.title}
                </h3>
                
                {/* Skills List */}
                <div className="space-y-3 relative z-10">
                  {category.items.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: index * 0.1 + skillIndex * 0.05 }}
                    >
                      <span className="text-apple-black/70 dark:text-apple-white/70 font-medium">
                        {skill}
                      </span>
                      <div className="flex space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < 4 ? 'bg-apple-blue' : 'bg-apple-black/20 dark:bg-apple-white/20'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Depth Light Pulse */}
                {hoveredCard === index && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(0, 122, 255, 0.1), transparent 70%)'
                    }}
                    animate={{
                      opacity: [0, 0.5, 0],
                      scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                )}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default SkillsGrid