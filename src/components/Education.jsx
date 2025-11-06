import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Education = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" ref={ref} className="py-24 px-6 bg-neutral-50 dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-5xl font-display font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {data.education.map((edu, idx) => (
            <motion.div
              key={edu.degree}
              className="glass rounded-2xl p-6 hover:shadow-xl transition-all"
              initial={{ opacity: 0, rotateY: 90 }}
              animate={isInView ? { opacity: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">{idx === 0 ? '🎓' : idx === 1 ? '📚' : '📖'}</div>
              <h3 className="text-xl font-display font-semibold mb-2 text-neutral-800 dark:text-neutral-200">{edu.degree}</h3>
              <p className="text-neutral-600 dark:text-neutral-400 mb-2">{edu.institution}</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-500 mb-2">{edu.period}</p>
              <p className="text-primary-600 dark:text-primary-400 font-semibold">{edu.detail}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
