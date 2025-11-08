import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import SectionBackground from './SectionBackground'
import MorphingCard from './MorphingCard'
import CompanyLogo from './CompanyLogo'
import SpiralTimeline from './SpiralTimeline'

const ExperienceTimeline = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start']
  })
  
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  
  // Safety check for data
  if (!data || !data.experience || !Array.isArray(data.experience)) {
    return null
  }
  
  const companyLogos = {
    'Photon Interactive Pvt Ltd': '/company-logos/photon.svg',
    'VR Della Pvt Ltd': '/company-logos/vrdella.svg',
    'Varutech Solutions Pvt Ltd': '/company-logos/varutech.svg',
    'Core Idea Innovations': '/company-logos/core idea innovations.svg'
  }

  return (
    <motion.section
      id="experience"
      ref={ref}
      className="py-24 px-6 bg-apple-white dark:bg-apple-black relative"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <SectionBackground type="experience" />
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-light text-apple-black dark:text-apple-white mb-6">
            Professional Experience
          </h2>
          <p className="text-xl text-apple-black/60 dark:text-apple-white/60 font-light">
            Building expertise through hands-on experience
          </p>
        </motion.div>

        {/* Enhanced Animated Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-apple-black/20 dark:bg-apple-white/20" />
          
          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-apple-blue to-blue-600 origin-top"
            style={{ height: lineHeight }}
          />

          {data.experience.map((exp, index) => (
            <SpiralTimeline 
              key={index} 
              index={index} 
              totalItems={data.experience.length}
            >
                <MorphingCard 
                  morphColor="from-blue-400 to-purple-500"
                  className="h-full"
                >

                  
                  {/* Role & Company */}
                  <div className="mb-4 relative z-10">
                    <motion.h3 
                      className="text-2xl font-display font-semibold text-apple-black dark:text-apple-white mb-2"
                      whileHover={{ x: 5 }}
                    >
                      {exp.role}
                    </motion.h3>
                    <motion.div 
                      className="text-apple-blue font-medium text-lg mb-1 flex items-center justify-between"
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-apple-blue rounded-full animate-pulse" />
                        {exp.company}
                      </div>
                      {/* Enhanced Company Logo */}
                      {companyLogos[exp.company] && (
                        <CompanyLogo
                          src={companyLogos[exp.company]}
                          alt={exp.company}
                          size="w-40 h-40"
                        />
                      )}
                    </motion.div>
                    <p className="text-apple-black/60 dark:text-apple-white/60 text-sm">
                      📍 {exp.location} • 📅 {exp.period}
                    </p>
                  </div>

                  {/* Interactive Achievement Bubbles */}
                  <div className="space-y-4 relative z-10">
                    {exp.bullets && exp.bullets.map((bullet, bulletIndex) => (
                      <motion.div
                        key={bulletIndex}
                        className="group relative"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ 
                          delay: bulletIndex * 0.2, 
                          type: 'spring',
                          stiffness: 200
                        }}
                        viewport={{ once: true }}
                      >
                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md border border-white/30">
                          {/* Static Icon */}
                          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white font-bold">
                            {bulletIndex + 1}
                          </div>
                          
                          {/* Achievement Text */}
                          <span className="leading-relaxed text-apple-black/90 dark:text-apple-white/90 flex-1">
                            {bullet}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Highlight Badge */}
                  {index === 0 && (
                    <motion.div
                      className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-medium"
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5, type: 'spring' }}
                      viewport={{ once: true }}
                    >
                      <span className="w-2 h-2 bg-apple-blue rounded-full animate-pulse" />
                      Most Recent
                    </motion.div>
                  )}
                </MorphingCard>
            </SpiralTimeline>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default ExperienceTimeline