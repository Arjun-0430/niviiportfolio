import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import SectionWrapper from './SectionWrapper'
import CompanyLogo from './CompanyLogo'
import { LocationIcon, ChevronRightIcon } from './Icons'

const companyLogos = {
  'Photon Interactive Pvt Ltd': '/niviiportfolio/company-logos/photon.svg',
  'VR Della Pvt Ltd': '/niviiportfolio/company-logos/vrdella.svg',
  'Varutech Solutions Pvt Ltd': '/niviiportfolio/company-logos/varutech.svg',
  'Core Idea Innovations': '/niviiportfolio/company-logos/core idea innovations.svg',
}

const gradientColors = [
  'from-accent-cyan to-accent-purple',
  'from-accent-purple to-pink-500',
  'from-accent-cyan to-teal-500',
  'from-accent-purple to-accent-cyan',
]

const roleIcons = ['⚡', '🎨', '🗄️', '🖥️']

export default function ExperienceTimeline({ data }) {
  const timelineRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start center', 'end center'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  if (!data?.experience?.length) return null

  return (
    <SectionWrapper
      id="experience"
      title="Professional Experience"
      subtitle="Journey through data"
      className="bg-slate-50/80 dark:bg-space relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20 dark:opacity-25" />
      <div ref={timelineRef} className="relative z-10 max-w-4xl mx-auto">
        {/* Central track */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-slate-200 dark:bg-slate/30 -translate-x-1/2 rounded-full" />
        <motion.div
          className="absolute left-6 md:left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-accent-cyan via-accent-purple to-accent-cyan shadow-[0_0_12px_rgba(100,255,218,0.4)]"
          style={{ height: lineHeight }}
        />

        {data.experience.map((exp, index) => {
          const isLeft = index % 2 === 0
          const gradient = gradientColors[index % gradientColors.length]
          const icon = roleIcons[index % roleIcons.length]
          return (
            <motion.div
              key={`${exp.company}-${index}`}
              className={`relative flex items-start gap-8 mb-16 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              initial={{ opacity: 0, x: isLeft ? -60 : 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true, margin: '-50px' }}
            >
              {/* Timeline node with pulse */}
              <motion.div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 shrink-0 flex items-center justify-center"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="absolute w-6 h-6 rounded-full bg-accent-cyan/30"
                  animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="relative w-5 h-5 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple border-2 border-white dark:border-space shadow-lg" />
              </motion.div>

              {/* Card with gradient border */}
              <div className={`ml-14 md:ml-0 ${isLeft ? 'md:pr-16' : 'md:pl-16'} w-full md:w-[calc(50%-2rem)]`}>
                <motion.div
                  className="group relative rounded-2xl p-[1px] bg-gradient-to-r from-accent-cyan/50 via-accent-purple/50 to-accent-cyan/50 dark:from-accent-cyan/40 dark:via-accent-purple/40 dark:to-accent-cyan/40 shadow-xl"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="rounded-2xl bg-white/90 dark:bg-space-light/95 backdrop-blur p-6 md:p-8 border border-slate-200/50 dark:border-accent-cyan/10 transition-colors group-hover:border-accent-cyan/25">
                    <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                      <div className="flex gap-3">
                        <span className="text-2xl opacity-90">{icon}</span>
                        <div>
                          <h3 className="text-xl font-display font-semibold text-slate-800 dark:text-slate-bright">
                            {exp.role}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-accent-cyan font-medium">
                            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                            {exp.company}
                          </div>
                          <p className="text-slate-500 dark:text-slate text-sm mt-1 flex items-center gap-1">
                            <LocationIcon className="w-4 h-4 inline" /> {exp.location} · <span className="font-mono text-xs">{exp.period}</span>
                          </p>
                        </div>
                      </div>
                      {companyLogos[exp.company] && (
                        <CompanyLogo
                          src={companyLogos[exp.company]}
                          alt={exp.company}
                          size="w-16 h-16 md:w-20 md:h-20"
                        />
                      )}
                    </div>
                    <ul className="space-y-3 mt-5">
                      {exp.bullets?.slice(0, 5).map((bullet, i) => (
                        <motion.li
                          key={i}
                          className="flex gap-3 text-slate-600 dark:text-slate-light text-sm leading-relaxed pl-1"
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.08 * i }}
                          viewport={{ once: true }}
                        >
                          <ChevronRightIcon className="text-accent-cyan shrink-0 mt-0.5 w-4 h-4" />
                          {bullet}
                        </motion.li>
                      ))}
                    </ul>
                    {index === 0 && (
                      <motion.span
                        className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full text-xs font-medium bg-accent-cyan/15 dark:bg-accent-cyan/20 text-accent-cyan border border-accent-cyan/30"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        viewport={{ once: true }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-cyan animate-pulse" />
                        Most Recent
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </SectionWrapper>
  )
}
