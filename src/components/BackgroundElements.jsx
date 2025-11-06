import { motion } from 'framer-motion'

const BackgroundElements = () => {
  return (
    <>
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-blue-200/20 to-purple-200/20 rounded-full"
            style={{
              top: `${20 + i * 15}%`,
              left: `${10 + i * 12}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Subtle grid overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.02]">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}
        />
      </div>

      {/* Animated gradient orbs */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          className="absolute w-32 h-32 bg-gradient-to-r from-pink-200/10 to-blue-200/10 rounded-full blur-xl"
          style={{ top: '20%', left: '80%' }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
        <motion.div
          className="absolute w-24 h-24 bg-gradient-to-r from-purple-200/10 to-pink-200/10 rounded-full blur-xl"
          style={{ top: '70%', left: '10%' }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 2,
          }}
        />
      </div>
    </>
  )
}

export default BackgroundElements