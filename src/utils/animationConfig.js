// Global animation configuration for consistent smooth animations
export const springConfig = {
  default: {
    type: 'spring',
    stiffness: 120,
    damping: 15
  },
  gentle: {
    type: 'spring',
    stiffness: 80,
    damping: 20
  },
  snappy: {
    type: 'spring',
    stiffness: 200,
    damping: 15
  },
  bouncy: {
    type: 'spring',
    stiffness: 300,
    damping: 20
  }
}

export const easingConfig = {
  smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  ease: 'ease-in-out'
}

export const durationConfig = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6
}