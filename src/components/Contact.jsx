import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import FormValidation from './FormValidation'
import RippleButton from './RippleButton'
import SectionWrapper from './SectionWrapper'
import { EmailIcon, PhoneIcon, LinkIcon, BriefcaseIcon, LocationIcon, CheckIcon, UserIcon } from './Icons'

const contactMethods = [
  { icon: EmailIcon, label: 'Email', hrefKey: 'email', value: 'nivethavenkatraman48@gmail.com' },
  { icon: PhoneIcon, label: 'Phone', hrefKey: 'phone', value: '8825701235' },
  { icon: LinkIcon, label: 'GitHub', hrefKey: 'github', value: 'View Profile' },
  { icon: BriefcaseIcon, label: 'LinkedIn', hrefKey: 'linkedin', value: 'Connect' },
]

export default function Contact({ data }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [20, -20])

  const contact = data?.contact || {}
  const getHref = (method) => {
    if (method.hrefKey === 'email') return `mailto:${contact.email || method.value}`
    if (method.hrefKey === 'phone') return `tel:${contact.phone || method.value}`
    if (method.hrefKey === 'github') return contact.github || '#'
    return contact.linkedin || 'https://www.linkedin.com/in/nivethavenkatraman/'
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <SectionWrapper
      id="contact"
      title="Connect & Collaborate"
      subtitle="Let's build something amazing together"
      className="bg-slate-50 dark:bg-space relative overflow-hidden transition-colors duration-300"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-grid opacity-20" />
      <motion.div className="absolute inset-0 bg-gradient-to-t from-accent-purple/10 to-transparent" style={{ y }} />
      <div ref={ref} className="relative z-10 max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Contact methods - orbital style */}
          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            {contactMethods.map((method, i) => (
              <motion.a
                key={method.label}
                href={getHref(method)}
                target={method.hrefKey === 'github' || method.hrefKey === 'linkedin' ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="glass-neon rounded-2xl p-6 min-w-[140px] text-center transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * i }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 30px rgba(100, 255, 218, 0.25)',
                  borderColor: 'rgba(100, 255, 218, 0.5)',
                }}
              >
                <span className="text-3xl block mb-2">{method.icon}</span>
                <span className="text-slate-800 dark:text-slate-bright font-medium text-sm">{method.label}</span>
                <span className="text-slate-600 dark:text-slate text-xs block mt-1">{method.value}</span>
              </motion.a>
            ))}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="glass-strong rounded-2xl p-8 border border-accent-cyan/20">
              <h3 className="text-xl font-display font-semibold text-slate-800 dark:text-slate-bright mb-6">
                Send a message
              </h3>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <span className="block mb-4 flex justify-center">
                    <CheckIcon className="w-12 h-12 text-accent-cyan" />
                  </span>
                  <p className="text-accent-cyan font-semibold">Thank you!</p>
                  <p className="text-slate-600 dark:text-slate text-sm mt-1">I'll get back to you soon.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <FormValidation
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    icon={UserIcon}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <FormValidation
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    icon={EmailIcon}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                  <div>
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={4}
                      className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-space-light/50 border border-slate-300 dark:border-accent-cyan/20 focus:border-accent-cyan/50 text-slate-800 dark:text-slate-bright placeholder-slate-500 dark:placeholder-slate transition-colors resize-none"
                    />
                  </div>
                  <RippleButton
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-semibold bg-accent-cyan text-space hover:bg-accent-cyan/90"
                    rippleColor="rgba(10, 25, 47, 0.3)"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.span
                          className="w-4 h-4 border-2 border-space/30 border-t-space rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </RippleButton>
                </form>
              )}
            </div>
          </motion.div>
        </div>
        <motion.p
          className="text-center text-slate-600 dark:text-slate text-sm mt-10"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5">
            <LocationIcon className="w-4 h-4" />
            Chennai, India
          </span>
        </motion.p>
      </div>
    </SectionWrapper>
  )
}
