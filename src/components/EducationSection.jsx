import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const EducationSection = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()

  const educationIcons = ['🎓', '📚', '📖']

  return (
    <motion.section
      id="education"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-apple-white to-blue-50/10 dark:from-apple-black dark:to-apple-gray/10"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-light text-apple-black dark:text-apple-white mb-6">
            Education
          </h2>
          <p className="text-xl text-apple-black/60 dark:text-apple-white/60 font-light">
            Academic foundation in computer science and engineering
          </p>
        </motion.div>

        {/* Education Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {data.education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              className="group"
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
            >
              <div className="frosted-glass rounded-3xl p-8 h-full apple-hover text-center">
                {/* Icon */}
                <motion.div
                  className="text-5xl mb-6"
                  whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {educationIcons[index]}
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-display font-semibold text-apple-black dark:text-apple-white mb-3 leading-tight">
                  {edu.degree}
                </h3>
                
                <p className="text-apple-black/70 dark:text-apple-white/70 mb-3 font-medium">
                  {edu.institution}
                </p>
                
                <p className="text-apple-black/50 dark:text-apple-white/50 text-sm mb-4">
                  {edu.period}
                </p>
                
                <motion.div
                  className="inline-flex items-center gap-2 px-4 py-2 bg-apple-blue/10 text-apple-blue rounded-full text-sm font-semibold"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="w-2 h-2 bg-apple-blue rounded-full" />
                  {edu.detail}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default EducationSection