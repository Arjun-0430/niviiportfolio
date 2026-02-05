import { useState, useEffect } from 'react'

/**
 * Animates a number from 0 to target when inView (or always if no ref).
 * @param {number} end - target value
 * @param {number} duration - ms
 * @param {boolean} inView - whether to run
 * @param {number} start - start value
 */
export function useCountUp(end, duration = 2000, inView = true, start = 0) {
  const [value, setValue] = useState(start)

  useEffect(() => {
    if (!inView) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setValue(Math.floor(progress * (end - start) + start))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, inView, start])

  return value
}
