import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const Skills = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()
  const [hoveredSkill, setHoveredSkill] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [50, -50])

  const skillGroups = [
    { 
      title: 'Programming', 
      items: data.skills.programming, 
      icon: '💻',
      color: 'from-blue-400 to-purple-500',
      proficiency: [90, 85, 80, 88]
    },
    { 
      title: 'Scripting', 
      items: data.skills.scripting, 
      icon: '🐍',
      color: 'from-green-400 to-blue-500',
      proficiency: [85]
    },
    { 
      title: 'Web Technologies', 
      items: data.skills.webTech, 
      icon: '🌐',
      color: 'from-orange-400 to-red-500',
      proficiency: [82]
    },
    { 
      title: 'Design Platforms', 
      items: data.skills.designPlatforms, 
      icon: '🎨',
      color: 'from-pink-400 to-purple-500',
      proficiency: [88, 85, 80]
    },
    { 
      title: 'Tools', 
      items: data.skills.tools, 
      icon: '🛠️',
      color: 'from-gray-400 to-gray-600',
      proficiency: [92, 88, 85, 75]
    },
    { 
      title: 'Competencies', 
      items: data.skills.competencies, 
      icon: '⚡',
      color: 'from-yellow-400 to-orange-500',
      proficiency: [90, 88, 85, 82]
    },
  ]

  return (
    <motion.section 
      id="skills" 
      ref={ref} 
      className="py-32 px-6 relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/10 to-indigo-50/5 dark:from-slate-900 dark:via-slate-800/10 dark:to-slate-900"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Dynamic Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-neutral-100 via-primary-50/20 to-accent-50/20 dark:from-neutral-800 dark:via-neutral-700/20 dark:to-neutral-800"
        style={{ y }}
      />
      
      {/* Floating Geometric Shapes */}
      {Array.from({ length: 12 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-5"
          style={{
            left: `${(i * 8) % 100}%`,
            top: `${(i * 12) % 100}%`,
            width: 40 + (i % 3) * 20,
            height: 40 + (i % 3) * 20,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
            x: [0, Math.sin(i) * 50, 0],
            y: [0, Math.cos(i) * 30, 0],
          }}
          transition={{
            duration: 10 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className={`w-full h-full bg-gradient-to-br ${skillGroups[i % skillGroups.length].color} ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg rotate-45'}`} />
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="text-6xl lg:text-7xl font-display font-bold gradient-text mb-6"
            animate={{ 
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.p 
            className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Crafting digital solutions with precision and creativity
          </motion.p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillGroups.map((group, idx) => (
            <motion.div
              key={group.title}
              className="group relative"
              initial={{ opacity: 0, y: 100, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{ 
                duration: 0.8, 
                delay: idx * 0.15,
                type: 'spring',
                stiffness: 120,
                damping: 15
              }}
              onHoverStart={() => setHoveredSkill(idx)}
              onHoverEnd={() => setHoveredSkill(null)}
            >
              <motion.div
                className="glass-strong rounded-3xl p-8 h-full relative overflow-hidden"
                whileHover={{ 
                  scale: 1.05, 
                  rotateY: 5,
                  boxShadow: '0 30px 60px rgba(14, 165, 233, 0.3)'
                }}
                transition={{ 
                  type: 'spring',
                  stiffness: 200,
                  damping: 20
                }}
              >
                {/* Animated Background Gradient */}
                <motion.div
                  className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-10`}
                  transition={{ duration: 0.3 }}
                />
                
                {/* Icon with Animation */}
                <motion.div 
                  className="text-6xl mb-6 relative z-10"
                  animate={{
                    rotate: hoveredSkill === idx ? [0, 10, -10, 0] : 0,
                    scale: hoveredSkill === idx ? 1.2 : 1
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {group.icon}
                </motion.div>
                
                <h3 className="text-2xl font-display font-bold mb-6 relative z-10 text-neutral-800 dark:text-neutral-200">
                  {group.title}
                </h3>
                
                {/* Skills with Progress Bars */}
                <div className="space-y-4 relative z-10">
                  {group.items.map((item, itemIdx) => (
                    <motion.div
                      key={item}
                      className="space-y-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: idx * 0.1 + itemIdx * 0.05 }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">{item}</span>
                        <span className="text-xs text-neutral-600 dark:text-neutral-400">{group.proficiency[itemIdx] || 85}%</span>
                      </div>
                      <div className="w-full bg-neutral-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${group.color} rounded-full`}
                          initial={{ width: 0 }}
                          animate={isInView ? { width: `${group.proficiency[itemIdx] || 85}%` } : {}}
                          transition={{ 
                            duration: 1.5, 
                            delay: idx * 0.2 + itemIdx * 0.1,
                            ease: 'easeOut'
                          }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                {/* Floating Particles */}
                {hoveredSkill === idx && Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-white/60 rounded-full"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      y: [0, -30, 0],
                      opacity: [0, 1, 0],
                      scale: [0, 1, 0],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Skills
