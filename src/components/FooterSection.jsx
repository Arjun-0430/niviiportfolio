import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export default function FooterSection({ data }) {
  const c = data?.contact || {}
  const links = [
    { label: 'LinkedIn', href: c.linkedin || 'https://www.linkedin.com/in/nivethavenkatraman/' },
    { label: 'GitHub', href: c.github || 'https://github.com/nivetha3004' },
    { label: 'Email', href: `mailto:${c.email || 'nivethavenkatraman48@gmail.com'}` },
  ]
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      ref={ref}
      className="relative py-16 px-6 bg-slate-100 dark:bg-space border-t border-slate-200 dark:border-accent-cyan/10 transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-10" />
      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <motion.p
          className="text-slate-600 dark:text-slate text-sm font-mono"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          © 2025 Nivetha V
        </motion.p>
        <motion.div
          className="flex justify-center gap-8 mt-6"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
        >
          {links.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-600 dark:text-slate hover:text-accent-cyan transition-colors text-sm"
              whileHover={{ y: -2 }}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
        <motion.button
          onClick={scrollToTop}
          className="mt-8 inline-flex items-center gap-2 text-slate-600 dark:text-slate hover:text-accent-cyan transition-colors text-sm"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
          whileHover={{ y: -4 }}
          aria-label="Back to top"
        >
          <span>Back to Top</span>
          <motion.span
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ↑
          </motion.span>
        </motion.button>
      </div>
    </footer>
  )
}
