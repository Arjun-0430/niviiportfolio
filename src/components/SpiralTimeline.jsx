import { motion } from 'framer-motion'

const SpiralTimeline = ({ children, index, totalItems }) => {
  const isLeft = index % 2 === 0
  
  return (
    <motion.div
      className={`relative mb-16 ${isLeft ? 'md:pr-1/2' : 'md:pl-1/2 md:ml-auto'}`}
      initial={{ 
        opacity: 0,
        x: isLeft ? -150 : 150,
        y: 50,
        scale: 0.9
      }}
      whileInView={{ 
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1
      }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        type: 'spring',
        stiffness: 150,
        damping: 20
      }}
      viewport={{ once: true, margin: '-50px' }}
      style={{ perspective: '1000px' }}
    >
      {/* Timeline Node */}
      <motion.div
        className="absolute left-8 md:left-1/2 w-4 h-4 bg-apple-blue rounded-full -translate-x-1/2 z-20 shadow-lg"
        initial={{ scale: 0 }}
        whileInView={{ 
          scale: [0, 1.3, 1],
          boxShadow: [
            '0 0 0 0 rgba(0, 122, 255, 0.7)',
            '0 0 0 10px rgba(0, 122, 255, 0)',
            '0 0 0 0 rgba(0, 122, 255, 0)'
          ]
        }}
        transition={{ duration: 0.6, delay: index * 0.2 + 0.3 }}
        viewport={{ once: true }}
      />
      
      {/* Experience Card Container */}
      <div className={`ml-16 md:ml-0 ${isLeft ? 'md:mr-16' : 'md:ml-16'}`}>
        <motion.div
          whileHover={{
            scale: 1.02,
            y: -5
          }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </div>
      

    </motion.div>
  )
}

export default SpiralTimeline