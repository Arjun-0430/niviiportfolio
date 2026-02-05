import { motion, useScroll, useTransform } from 'framer-motion'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { useCountUp } from '../hooks/useCountUp'
import GlowCard from './GlowCard'

export default function About({ data }) {
  const { ref: revealRef, isInView, variants, itemVariants } = useScrollReveal(0.1, true)
  const { scrollYProgress } = useScroll({ target: revealRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  const certs = useCountUp(6, 1800, isInView)
  const projects = useCountUp(5, 1800, isInView)
  const techs = useCountUp(15, 2200, isInView)

  const about = data?.about || ''
  const paragraphs = about.split(/(?<=\.)\s+/).filter(Boolean)

  const highlightTerms = ['SQL', 'Python', 'Power BI', 'MERN', 'Figma', 'Flutterflow']
  const highlight = (text) => {
    let result = text
    highlightTerms.forEach((term) => {
      result = result.replace(
        new RegExp(`(${term})`, 'gi'),
        '<span class="text-accent-cyan font-semibold">$1</span>'
      )
    })
    return result
  }

  return (
    <motion.section
      id="about"
      ref={revealRef}
      className="py-24 md:py-32 px-6 relative overflow-hidden bg-slate-50 dark:bg-space transition-colors duration-300"
      variants={variants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-30" />
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-accent-purple/5 to-transparent"
        style={{ y }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Left: 60% content */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div variants={itemVariants}>
              <motion.h2
                className="text-4xl md:text-5xl font-display font-bold text-slate-800 dark:text-slate-bright mb-2 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                About Me
              </motion.h2>
              <motion.div
                className="h-1 w-32 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.2, duration: 0.5 }}
                style={{ transformOrigin: 'left' }}
              />
            </motion.div>

            <div className="space-y-4">
              {paragraphs.map((para, i) => (
                <motion.p
                  key={i}
                  className="text-slate-600 dark:text-slate-light text-lg leading-relaxed"
                  variants={itemVariants}
                  initial={{ opacity: 0, x: -15 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  dangerouslySetInnerHTML={{ __html: highlight(para) }}
                />
              ))}
            </div>

            {/* Stats - floating glass cards */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
            >
              {[
                { value: certs, label: 'Certifications', suffix: '' },
                { value: projects, label: 'Projects', suffix: '+' },
                { value: techs, label: 'Technologies', suffix: '' },
              ].map((stat, i) => (
                <GlowCard
                  key={stat.label}
                  className="p-6 text-center"
                  glowColor="from-accent-cyan to-accent-purple"
                  hoverScale={1.03}
                >
                  <span className="text-3xl md:text-4xl font-display font-bold text-accent-cyan">
                    {stat.value}{stat.suffix}
                  </span>
                  <p className="text-slate-600 dark:text-slate text-sm mt-1">{stat.label}</p>
                </GlowCard>
              ))}
            </motion.div>
          </div>

          {/* Right: 40% visual - 9:16 portrait frame + stacked skills */}
          <motion.div
            className="lg:col-span-2 relative flex flex-col items-center min-h-[500px] gap-6"
            variants={itemVariants}
          >
            {/* 9:16 aspect ratio frame - image covers */}
            <motion.div
              className="relative w-[min(280px,85vw)] aspect-[9/16] max-h-[520px] rounded-2xl overflow-hidden glass-strong border border-accent-cyan/20 shadow-2xl"
              initial={{ rotateY: -10, rotateX: 5 }}
              whileInView={{ rotateY: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              style={{ perspective: 1000 }}
            >
              <motion.img
                src={`${import.meta.env.BASE_URL}nivii.jpg`}
                alt="Nivetha V"
                className="absolute inset-0 w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-space/80 to-transparent pointer-events-none" />
            </motion.div>
            
            {/* Stacked key skills – clean chips below the image */}
            <motion.div
              className="flex flex-wrap justify-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
            >
              {['SQL', 'Python', 'Power BI', 'SSMS', 'Figma', 'MERN'].map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 rounded-full bg-white/80 dark:bg-space-light/80 border border-accent-cyan/30 text-xs font-mono text-slate-800 dark:text-slate-bright shadow-sm"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
