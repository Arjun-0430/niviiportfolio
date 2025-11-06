import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

const TraitsVisualization = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()

  return (
    <motion.section
      id="traits"
      ref={ref}
      className="py-24 px-6 bg-apple-white dark:bg-apple-black relative overflow-hidden"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-6xl lg:text-7xl font-display font-light text-apple-black dark:text-apple-white mb-6"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 5, repeat: Infinity }}
            style={{
              background: 'linear-gradient(45deg, #007AFF, #FF6B6B, #4ECDC4, #45B7D1)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Traits & Values
          </motion.h2>
          <p className="text-xl text-apple-black/60 dark:text-apple-white/60 font-light">
            Core principles that drive my work
          </p>
        </motion.div>

        {/* Holographic Trait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.traits.map((trait, index) => (
            <motion.div
              key={trait}
              className="hologram-card rounded-3xl p-8 h-64 flex flex-col items-center justify-center relative"
              initial={{ opacity: 0, y: 100, rotateX: -90 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
                type: 'spring',
                stiffness: 100
              }}
              whileHover={{
                scale: 1.05,
                rotateY: 10,
                z: 50
              }}
            >
              {/* Holographic Scan Line */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{
                  x: ['-100%', '100%']
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.5
                }}
              />
              
              {/* Floating Icon */}
              <motion.div
                className="text-6xl mb-6 relative z-10"
                animate={{
                  y: [0, -10, 0],
                  rotateZ: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.3
                }}
              >
                {['🎯', '💪', '⚖️', '🚀', '🔥'][index % 5]}
              </motion.div>
              
              {/* Trait Name */}
              <motion.h3 
                className="text-2xl font-bold text-center relative z-10"
                style={{
                  background: 'linear-gradient(45deg, #007AFF, #FF6B6B)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                {trait}
              </motion.h3>
              
              {/* Energy Pulse */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                animate={{
                  scaleX: [0, 1, 0],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.4
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default TraitsVisualization