import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import AdvancedSkillBar from './AdvancedSkillBar'
import GlowCard from './GlowCard'

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
              <GlowCard 
                glowColor={group.color}
                hoverScale={1.05}
                className="h-full"
              >
                
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
                
                {/* Advanced Skills with Animated Progress Bars */}
                <div className="space-y-4 relative z-10">
                  {group.items.map((item, itemIdx) => (
                    <AdvancedSkillBar
                      key={item}
                      skill={item}
                      percentage={group.proficiency[itemIdx] || 85}
                      color={group.color}
                      delay={idx * 200 + itemIdx * 100}
                      isVisible={isInView}
                    />
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
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Skills
