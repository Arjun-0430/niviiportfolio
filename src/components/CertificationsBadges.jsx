import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const CertificationsBadges = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()

  return (
    <motion.section
      id="certifications"
      ref={ref}
      className="py-24 px-6 bg-apple-white dark:bg-apple-black"
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
            Certifications & Courses
          </h2>
          <p className="text-xl text-apple-black/60 dark:text-apple-white/60 font-light">
            Continuous learning and professional development
          </p>
        </motion.div>

        {/* Auto-scroll Badge Strip */}
        <motion.div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 pb-6"
            animate={{
              x: [0, -50]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'linear'
            }}
          >
            {[...data.certifications, ...data.certifications].map((cert, index) => (
              <motion.div
                key={`${cert}-${index}`}
                className="frosted-glass rounded-2xl p-6 min-w-[320px] apple-hover group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: '0 20px 40px rgba(0, 122, 255, 0.15)'
                }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              >
                <div className="flex items-center gap-4">
                  <motion.div
                    className="text-3xl"
                    whileHover={{ rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    🏆
                  </motion.div>
                  
                  <div className="flex-1">
                    <p className="font-medium text-apple-black dark:text-apple-white leading-tight">
                      {cert}
                    </p>
                  </div>

                  {/* Glow Effect on Hover */}
                  <motion.div
                    className="w-3 h-3 bg-apple-blue rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

export default CertificationsBadges