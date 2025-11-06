import { motion } from 'framer-motion'

const FooterSection = ({ data }) => {
  return (
    <footer className="py-16 px-6 bg-apple-black dark:bg-apple-black text-apple-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-display font-semibold gradient-text mb-4">
              Nivetha V
            </h3>
            <p className="text-apple-white/70 leading-relaxed">
              SQL Developer & UI Technologist crafting data-driven solutions with precision and creativity.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-apple-white">Quick Links</h4>
            <div className="space-y-2">
              {['About', 'Skills', 'Experience', 'Projects', 'Contact'].map((link) => (
                <motion.a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="block text-apple-white/70 hover:text-apple-blue apple-transition"
                  whileHover={{ x: 5 }}
                >
                  {link}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-semibold mb-4 text-apple-white">Connect</h4>
            <div className="space-y-3">
              <a
                href={`mailto:${data.contact.email}`}
                className="flex items-center gap-3 text-apple-white/70 hover:text-apple-blue apple-transition"
              >
                <span>✉️</span>
                <span>{data.contact.email}</span>
              </a>
              <a
                href={data.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-apple-white/70 hover:text-apple-blue apple-transition"
              >
                <span>💼</span>
                <span>GitHub</span>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="pt-8 border-t border-apple-white/10 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-apple-white/60 text-sm">
            © 2025 Nivetha V — Built with 💙 React + Framer Motion + AI
          </p>
          <div className="flex items-center gap-4 text-sm text-apple-white/60">
            <span>Made with precision</span>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border border-apple-blue/50 rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default FooterSection