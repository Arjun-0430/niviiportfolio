import { motion, useScroll, useTransform } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import FormValidation from './FormValidation'
import RippleButton from './RippleButton'

const Contact = ({ data }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [focusedField, setFocusedField] = useState(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -50])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', message: '' })
  }

  const contactMethods = [
    { 
      icon: '✉️', 
      label: 'Email', 
      value: data.contact.email, 
      href: `mailto:${data.contact.email}`,
      color: 'from-blue-500 to-purple-600'
    },
    { 
      icon: '📞', 
      label: 'Phone', 
      value: data.contact.phone, 
      href: `tel:${data.contact.phone}`,
      color: 'from-green-500 to-teal-600'
    },
    { 
      icon: '🔗', 
      label: 'GitHub', 
      value: 'View Profile', 
      href: data.contact.github,
      color: 'from-gray-600 to-gray-800'
    }
  ]

  return (
    <section id="contact" ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Cinematic Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary-50/10 via-accent-50/20 to-primary-100/10 dark:from-neutral-800 dark:via-neutral-700/20 dark:to-neutral-800"
        style={{ y: backgroundY }}
      />
      
      {/* Floating Communication Icons */}
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-5"
          style={{
            left: `${(i * 10) % 100}%`,
            top: `${(i * 15) % 100}%`,
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.3, 1],
            x: [0, Math.sin(i) * 80, 0],
            y: [0, Math.cos(i) * 40, 0],
          }}
          transition={{
            duration: 15 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div className="text-5xl">{['✉️', '📞', '💬', '✨', '🚀'][i % 5]}</div>
        </motion.div>
      ))}

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <motion.h2
            className="text-6xl lg:text-8xl font-display font-bold gradient-text mb-8 leading-tight"
            animate={{
              backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
            }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            Let's Create
            <br />
            <span className="text-5xl lg:text-7xl">Something Amazing</span>
          </motion.h2>
          
          <motion.div 
            className="w-40 h-1 bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 160 } : {}}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
          
          <motion.p 
            className="text-xl lg:text-2xl text-neutral-600 dark:text-neutral-400 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.7 }}
          >
            Ready to collaborate on SQL development, data workflows, or UI-focused engineering? 
            <br className="hidden md:block" />
            Let's turn ideas into reality.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Methods */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <h3 className="text-3xl font-display font-bold mb-8 text-neutral-800 dark:text-neutral-200">Get In Touch</h3>
            
            {contactMethods.map((method, idx) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.label === 'GitHub' ? '_blank' : undefined}
                rel={method.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                className="group block"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + idx * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <motion.div 
                  className="glass-strong rounded-2xl p-6 flex items-center gap-6 relative overflow-hidden"
                  whileHover={{ 
                    boxShadow: '0 20px 40px rgba(200, 162, 200, 0.3)',
                    y: -5
                  }}
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-r ${method.color} opacity-0 group-hover:opacity-10`}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <motion.div 
                    className="text-4xl relative z-10"
                    whileHover={{ rotate: [0, -10, 10, 0], scale: 1.2 }}
                    transition={{ duration: 0.5 }}
                  >
                    {method.icon}
                  </motion.div>
                  
                  <div className="relative z-10">
                    <h4 className="font-semibold text-lg mb-1 text-neutral-800 dark:text-neutral-200">{method.label}</h4>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm">{method.value}</p>
                  </div>
                  
                  <motion.div
                    className="ml-auto text-2xl text-neutral-400 dark:text-neutral-500 relative z-10"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          {/* Enhanced Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <motion.div
              className="glass-strong rounded-3xl p-8 relative overflow-hidden"
              whileHover={{ boxShadow: '0 30px 60px rgba(200, 162, 200, 0.2)' }}
            >
              <h3 className="text-3xl font-display font-bold mb-8 text-center text-neutral-800 dark:text-neutral-200">Send a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'name', type: 'text', placeholder: 'Your Name', icon: '👤' },
                  { name: 'email', type: 'email', placeholder: 'Your Email', icon: '✉️' },
                ].map((field) => (
                  <FormValidation
                    key={field.name}
                    type={field.type}
                    name={field.name}
                    placeholder={field.placeholder}
                    icon={field.icon}
                    value={formData[field.name]}
                    onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                    onFocus={() => setFocusedField(field.name)}
                    onBlur={() => setFocusedField(null)}
                    required
                  />
                ))}
                
                <motion.div 
                  className="relative"
                  whileFocus={{ scale: 1.02 }}
                >
                  <motion.div
                    className="absolute left-4 top-4 text-xl z-10"
                    animate={{
                      scale: focusedField === 'message' ? 1.2 : 1,
                      rotate: focusedField === 'message' ? [0, 10, -10, 0] : 0
                    }}
                  >
                    💬
                  </motion.div>
                  <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    required
                    rows="5"
                    className="w-full pl-14 pr-6 py-4 rounded-xl bg-white/30 dark:bg-neutral-800/30 border-2 border-transparent focus:border-primary-500/50 focus:bg-white/50 dark:focus:bg-neutral-700/50 transition-all duration-300 resize-none backdrop-blur-sm text-neutral-900 dark:text-neutral-100"
                  />
                </motion.div>
                
                <RippleButton
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold text-lg group"
                  rippleColor="rgba(255, 255, 255, 0.4)"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-600 opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                  
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          ✈️
                        </motion.span>
                      </>
                    )}
                  </span>
                </RippleButton>
              </form>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  className="mt-6 p-6 bg-gradient-to-r from-green-100/20 to-green-200/30 dark:from-green-800/20 dark:to-green-700/30 rounded-2xl text-center border border-green-300/30 dark:border-green-600/30"
                >
                  <motion.div
                    className="text-4xl mb-2"
                    animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                  >
                    ✨
                  </motion.div>
                  <h4 className="font-semibold text-lg mb-1 text-neutral-800 dark:text-neutral-200">Message Sent Successfully!</h4>
                  <p className="text-neutral-600 dark:text-neutral-400 text-sm">Thank you for reaching out. I'll get back to you soon!</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact
