import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

const FormValidation = ({ 
  value, 
  type, 
  name, 
  placeholder, 
  icon, 
  onChange, 
  onFocus, 
  onBlur,
  required = false 
}) => {
  const [isValid, setIsValid] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)

  const validateField = (val) => {
    if (required && !val.trim()) {
      setIsValid(false)
      setErrorMessage(`${placeholder} is required`)
      return false
    }
    
    if (type === 'email' && val) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(val)) {
        setIsValid(false)
        setErrorMessage('Please enter a valid email')
        return false
      }
    }
    
    setIsValid(true)
    setErrorMessage('')
    return true
  }

  useEffect(() => {
    if (value) validateField(value)
  }, [value])

  const handleFocus = (e) => {
    setIsFocused(true)
    onFocus?.(e)
  }

  const handleBlur = (e) => {
    setIsFocused(false)
    validateField(e.target.value)
    onBlur?.(e)
  }

  return (
    <motion.div className="relative">
      {/* Input Container */}
      <motion.div
        className="relative"
        animate={isFocused ? { scale: 1.02 } : { scale: 1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated Icon */}
        <motion.div
          className="absolute left-4 top-1/2 -translate-y-1/2 text-xl z-10"
          animate={{
            scale: isFocused ? 1.2 : 1,
            rotate: isFocused ? [0, 10, -10, 0] : 0,
            color: !isValid ? '#ef4444' : isFocused ? '#3b82f6' : '#6b7280'
          }}
          transition={{ duration: 0.3 }}
        >
          {icon}
        </motion.div>

        {/* Input Field */}
        <motion.input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          required={required}
          className={`w-full pl-14 pr-6 py-4 rounded-xl bg-white/30 dark:bg-neutral-800/30 border-2 transition-all duration-300 backdrop-blur-sm text-neutral-900 dark:text-neutral-100 ${
            !isValid 
              ? 'border-red-500/50 focus:border-red-500' 
              : 'border-transparent focus:border-primary-500/50'
          } focus:bg-white/50 dark:focus:bg-neutral-700/50`}
          animate={{
            borderColor: !isValid ? '#ef4444' : isFocused ? '#3b82f6' : 'transparent'
          }}
        />

        {/* Validation Indicator */}
        <motion.div
          className="absolute right-4 top-1/2 -translate-y-1/2"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: value ? 1 : 0, 
            scale: value ? 1 : 0,
            rotate: isValid ? 0 : 360
          }}
          transition={{ duration: 0.3 }}
        >
          {value && (
            <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
              isValid ? 'bg-green-500' : 'bg-red-500'
            }`}>
              <span className="text-white text-sm">
                {isValid ? '✓' : '✗'}
              </span>
            </div>
          )}
        </motion.div>
      </motion.div>

      {/* Error Message */}
      <motion.div
        initial={{ opacity: 0, y: -10, height: 0 }}
        animate={{ 
          opacity: !isValid && errorMessage ? 1 : 0,
          y: !isValid && errorMessage ? 0 : -10,
          height: !isValid && errorMessage ? 'auto' : 0
        }}
        transition={{ duration: 0.3 }}
        className="overflow-hidden"
      >
        <p className="text-red-500 text-sm mt-2 ml-2">
          {errorMessage}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default FormValidation