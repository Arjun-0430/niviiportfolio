import { motion } from 'framer-motion'
import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'

const ContactSection = ({ data }) => {
  const { ref, isInView, variants, itemVariants } = useScrollReveal()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [focusedField, setFocusedField] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setSubmitted(true)
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
    
    setTimeout(() => setSubmitted(false), 4000)
  }

  const contactMethods = [
    {
      icon: '✉️',
      label: 'Email',
      value: data.contact.email,
      href: `mailto:${data.contact.email}`,
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '📞',
      label: 'Phone',
      value: data.contact.phone,
      href: `tel:${data.contact.phone}`,
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: '💼',
      label: 'GitHub',
      value: 'View Profile',
      href: data.contact.github,
      gradient: 'from-gray-600 to-slate-700'
    }
  ]

  return (
    <motion.section
      id="contact"
      ref={ref}
      className="py-24 px-6 bg-gradient-to-b from-apple-white to-apple-black/5 dark:from-apple-black dark:to-apple-gray/20"
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <h2 className="text-5xl lg:text-6xl font-display font-light text-apple-black dark:text-apple-white mb-6">
            Let's Build Something
            <br />
            <span className="gradient-text font-medium">Exceptional Together</span>
          </h2>
          <motion.div
            className="w-32 h-1 bg-gradient-to-r from-apple-blue to-blue-600 mx-auto mb-8 rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: 128 } : {}}
            transition={{ duration: 1, delay: 0.5 }}
          />
          <p className="text-xl text-apple-black/60 dark:text-apple-white/60 max-w-4xl mx-auto font-light leading-relaxed">
            I'm open to SQL development, data engineering, and UI integration roles.
            <br />
            Ready to collaborate on your next project?
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Contact Methods */}
          <motion.div
            className="space-y-6"
            variants={itemVariants}
          >
            <h3 className="text-3xl font-display font-medium text-apple-black dark:text-apple-white mb-8">
              Get In Touch
            </h3>
            
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.label}
                href={method.href}
                target={method.label === 'GitHub' ? '_blank' : undefined}
                rel={method.label === 'GitHub' ? 'noopener noreferrer' : undefined}
                className="group block"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="frosted-glass rounded-2xl p-6 flex items-center gap-6 apple-hover">
                  <motion.div
                    className="text-4xl"
                    whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                    transition={{ duration: 0.3 }}
                  >
                    {method.icon}
                  </motion.div>
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-apple-black dark:text-apple-white mb-1">
                      {method.label}
                    </h4>
                    <p className="text-apple-black/60 dark:text-apple-white/60">
                      {method.value}
                    </p>
                  </div>
                  
                  <motion.div
                    className="text-apple-blue text-xl"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    →
                  </motion.div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
          >
            <div className="frosted-glass rounded-3xl p-8">
              <h3 className="text-3xl font-display font-medium text-apple-black dark:text-apple-white mb-8 text-center">
                Send a Message
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  { name: 'name', type: 'text', placeholder: 'Your Name', icon: '👤' },
                  { name: 'email', type: 'email', placeholder: 'Your Email', icon: '✉️' }
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <motion.div
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-xl"
                      animate={{
                        scale: focusedField === field.name ? 1.1 : 1
                      }}
                    >
                      {field.icon}
                    </motion.div>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={formData[field.name]}
                      onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full pl-14 pr-6 py-4 rounded-xl bg-apple-white/50 dark:bg-apple-black/20 border-2 border-transparent focus:border-apple-blue/50 apple-transition text-apple-black dark:text-apple-white placeholder-apple-black/40 dark:placeholder-apple-white/40"
                    />
                  </div>
                ))}
                
                <div className="relative">
                  <motion.div
                    className="absolute left-4 top-4 text-xl"
                    animate={{
                      scale: focusedField === 'message' ? 1.1 : 1
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
                    className="w-full pl-14 pr-6 py-4 rounded-xl bg-apple-white/50 dark:bg-apple-black/20 border-2 border-transparent focus:border-apple-blue/50 apple-transition resize-none text-apple-black dark:text-apple-white placeholder-apple-black/40 dark:placeholder-apple-white/40"
                  />
                </div>
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full apple-button py-4 text-white rounded-xl font-medium text-lg relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-3">
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
                        <span>✈️</span>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>

              {/* Success Message */}
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl text-center border border-green-200 dark:border-green-700"
                >
                  <div className="text-4xl mb-2">✨</div>
                  <h4 className="font-semibold text-lg mb-1 text-green-800 dark:text-green-200">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-green-600 dark:text-green-300 text-sm">
                    Thank you for reaching out. I'll get back to you soon!
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default ContactSection