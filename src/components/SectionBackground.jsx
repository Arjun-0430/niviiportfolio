import { motion } from 'framer-motion'

const SectionBackground = ({ type = 'default' }) => {
  const patterns = {
    experience: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23007AFF' fill-opacity='0.3'%3E%3Cpath d='M40 20l20 20-20 20-20-20z'/%3E%3Ccircle cx='40' cy='40' r='3'/%3E%3C/g%3E%3C/svg%3E")`,
    
    projects: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300D4AA' fill-opacity='0.3'%3E%3Crect x='20' y='20' width='20' height='20' rx='2'/%3E%3Ccircle cx='15' cy='15' r='2'/%3E%3Ccircle cx='45' cy='45' r='2'/%3E%3C/g%3E%3C/svg%3E")`,
    
    education: `url("data:image/svg+xml,%3Csvg width='70' height='70' viewBox='0 0 70 70' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FF6B6B' fill-opacity='0.3'%3E%3Cpolygon points='35,15 50,35 35,55 20,35'/%3E%3Cpath d='M25 25h20M25 35h20M25 45h20' stroke='%23FF6B6B' stroke-width='2' stroke-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`,
    
    traits: `url("data:image/svg+xml,%3Csvg width='90' height='90' viewBox='0 0 90 90' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23A855F7' fill-opacity='0.3'%3E%3Ccircle cx='45' cy='45' r='15' fill='none' stroke='%23A855F7' stroke-width='2'/%3E%3Cpath d='M30 30l30 30M60 30l-30 30' stroke='%23A855F7' stroke-width='1' stroke-opacity='0.2'/%3E%3C/g%3E%3C/svg%3E")`
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <motion.div
        className="w-full h-full opacity-[0.08]"
        style={{
          backgroundImage: patterns[type] || patterns.default,
          backgroundSize: type === 'traits' ? '90px 90px' : '60px 60px'
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      
      <motion.div
        className="absolute top-10 right-10 w-20 h-20 opacity-[0.15]"
        style={{
          backgroundImage: patterns[type] || patterns.default,
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      />
    </div>
  )
}

export default SectionBackground