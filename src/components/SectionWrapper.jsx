import { motion } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'

/**
 * Reusable section layout: animated title + optional subtitle + underline + children.
 */
export default function SectionWrapper({ id, title, subtitle, children, className = '', noReveal }) {
  const { ref, isInView, variants, itemVariants } = useScrollReveal(0.08, true)

  return (
    <motion.section
      id={id}
      ref={ref}
      className={`py-20 md:py-28 px-6 relative ${className}`}
      variants={noReveal ? undefined : variants}
      initial={noReveal ? undefined : 'hidden'}
      animate={noReveal ? undefined : isInView ? 'visible' : 'hidden'}
    >
      {(title || subtitle) && (
        <motion.div
          className="text-center mb-16 max-w-3xl mx-auto"
          variants={noReveal ? undefined : itemVariants}
        >
          {title && (
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-slate-800 dark:text-slate-bright mb-4"
              initial={noReveal ? undefined : { opacity: 0, y: 20 }}
              animate={noReveal ? undefined : isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              {title}
            </motion.h2>
          )}
          {subtitle && (
            <motion.p
              className="text-slate-600 dark:text-slate text-lg"
              initial={noReveal ? undefined : { opacity: 0 }}
              animate={noReveal ? undefined : isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {subtitle}
            </motion.p>
          )}
          {title && (
            <motion.div
              className="h-1 w-24 mx-auto mt-6 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
              initial={noReveal ? undefined : { scaleX: 0 }}
              animate={noReveal ? undefined : isInView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ transformOrigin: 'center' }}
            />
          )}
        </motion.div>
      )}
      {children}
    </motion.section>
  )
}
