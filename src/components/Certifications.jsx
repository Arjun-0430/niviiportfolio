import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const Certifications = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="certifications" ref={ref} className="py-24 px-6 bg-accent-50/20 dark:bg-neutral-800">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          className="text-5xl font-display font-bold text-center mb-16 gradient-text"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Certifications
        </motion.h2>

        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide">
          {data.certifications.map((cert, idx) => (
            <motion.div
              key={cert}
              className="glass rounded-2xl p-6 min-w-[300px] hover:shadow-xl transition-all"
              initial={{ opacity: 0, x: 100 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ scale: 1.05, rotateZ: 2 }}
            >
              <div className="text-4xl mb-4">🏆</div>
              <p className="text-lg font-medium text-neutral-800 dark:text-neutral-200">{cert}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Certifications
