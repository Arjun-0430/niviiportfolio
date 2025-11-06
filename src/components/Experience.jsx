import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Experience = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={ref} className="py-24 px-6 bg-accent-50/20 dark:bg-neutral-800">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-5xl font-display font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Experience
        </motion.h2>

        <div className="relative">
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary-300/30 dark:bg-primary-600/30" />

          {data.experience.map((exp, idx) => (
            <motion.div
              key={idx}
              className={`relative mb-12 ${idx % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              <motion.div
                className="absolute left-8 md:left-1/2 w-4 h-4 bg-primary-500 dark:bg-primary-400 rounded-full -translate-x-1/2 z-10"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
              />

              <div className={`ml-16 md:ml-0 ${idx % 2 === 0 ? 'md:mr-12' : 'md:ml-12'}`}>
                <div className="glass rounded-2xl p-6 hover:shadow-xl transition-shadow">
                  <h3 className="text-2xl font-display font-semibold mb-2 text-neutral-800 dark:text-neutral-200">{exp.role}</h3>
                  <p className="text-primary-600 dark:text-primary-400 font-medium mb-1">{exp.company}</p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
                    {exp.location} • {exp.period}
                  </p>
                  <ul className="space-y-2">
                    {exp.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2 text-neutral-700 dark:text-neutral-300">
                        <span className="text-primary-500 dark:text-primary-400 mt-1">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
