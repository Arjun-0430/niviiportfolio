import { ReactLenis } from 'lenis/react'
import 'lenis/dist/lenis.css'

export default function LenisRoot({ children }) {
  return (
    <ReactLenis
      root
      options={{
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.08,
      }}
    >
      {children}
    </ReactLenis>
  )
}
