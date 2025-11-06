import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const AboutSection = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()

  return (
    <motion.section
      id="about"
      ref={ref}
      className="py-24 px-6 bg-apple-white dark:bg-apple-black"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Professional Portrait */}
          <motion.div
            className="relative"
            variants={itemVariants}
          >
            <div className="frosted-glass rounded-3xl p-8 apple-hover">
              <div className="aspect-[3/4] bg-gradient-to-br from-apple-blue/10 to-apple-blue/5 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <img
                  src="/nivii.jpg"
                  alt="Nivetha V"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              
              {/* Quick Facts */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-apple-black/70 dark:text-apple-white/70">
                  <span className="text-lg">📍</span>
                  <span className="font-medium">{data.location}</span>
                </div>
                <div className="flex items-center gap-3 text-apple-black/70 dark:text-apple-white/70">
                  <span className="text-lg">🗣️</span>
                  <span className="font-medium">{data.languages.join(' • ')}</span>
                </div>
                <div className="flex items-center gap-3 text-apple-black/70 dark:text-apple-white/70">
                  <span className="text-lg">🎓</span>
                  <span className="font-medium">B.E Computer Science (8.6 CGPA)</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            className="space-y-8"
            variants={itemVariants}
          >
            <motion.h2
              className="text-5xl lg:text-6xl font-display font-light text-apple-black dark:text-apple-white"
              variants={itemVariants}
            >
              About Me
            </motion.h2>
            
            <motion.div
              className="text-xl lg:text-2xl text-apple-black/70 dark:text-apple-white/70 leading-relaxed font-light"
              variants={itemVariants}
            >
              <p>{data.about}</p>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              className="grid grid-cols-2 gap-6 mt-12"
              variants={itemVariants}
            >
              <div className="frosted-glass rounded-2xl p-6 text-center apple-hover">
                <div className="text-3xl font-light gradient-text mb-2">4+</div>
                <div className="text-sm text-apple-black/60 dark:text-apple-white/60">Internships</div>
              </div>
              <div className="frosted-glass rounded-2xl p-6 text-center apple-hover">
                <div className="text-3xl font-light gradient-text mb-2">8.6</div>
                <div className="text-sm text-apple-black/60 dark:text-apple-white/60">CGPA</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default AboutSection