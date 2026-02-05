import { motion } from 'framer-motion'
import { useTheme } from '../contexts/ThemeContext'

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-6 right-6 z-[45] w-12 h-12 rounded-full flex items-center justify-center text-xl border border-slate-300 dark:border-accent-cyan/30 bg-white/80 dark:bg-space-light/80 backdrop-blur-md shadow-lg hover:scale-105 transition-transform"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        delay: 0.5,
        type: 'spring',
        stiffness: 200,
        damping: 15
      }}
    >
      <motion.span
        key={isDark ? 'sun' : 'moon'}
        initial={{ rotate: -180, opacity: 0 }}
        animate={{ rotate: 0, opacity: 1 }}
        exit={{ rotate: 180, opacity: 0 }}
        transition={{ 
          type: 'spring',
          stiffness: 200,
          damping: 15,
          duration: 0.4
        }}
      >
        {isDark ? '☀️' : '🌙'}
      </motion.span>
    </motion.button>
  )
}

export default ThemeToggle