import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

export default function LenisRoot({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        lerp: 0.12,
        syncTouch: true,
        syncTouchLerp: 0.1,
      }}
    >
      {children}
    </ReactLenis>
  )
}
