import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // GSAP smooth scroll setup
    let ctx = gsap.context(() => {
      gsap.set(container, { 
        transformOrigin: "center center",
        force3D: true 
      })

      // Smooth scroll physics
      ScrollTrigger.normalizeScroll(true)
      ScrollTrigger.config({ 
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load" 
      })

    }, container)

    return () => ctx.revert()
  }, [])

  return (
    <div 
      ref={containerRef}
      className="smooth-scroll-container"
      style={{ 
        willChange: 'transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </div>
  )
}

export default SmoothScroll