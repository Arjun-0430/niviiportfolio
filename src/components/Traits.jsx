import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Traits = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="traits" ref={ref} className="py-24 px-6 bg-gradient-to-b from-primary-50/30 to-neutral-50 dark:from-neutral-800/30 dark:to-neutral-900">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-5xl font-display font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Traits & Values
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-6">
          {data.traits.map((trait, idx) => (
            <motion.div
              key={trait}
              className="glass rounded-full px-8 py-4 text-lg font-medium text-neutral-800 dark:text-neutral-200"
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.1, type: 'spring' }}
              whileHover={{ scale: 1.1, boxShadow: '0 10px 30px rgba(14, 165, 233, 0.3)' }}
            >
              {trait}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Traits
