import { useEffect, useState, useRef } from 'react'

const TextScramble = ({ 
  text, 
  className = '', 
  scrambleSpeed = 50, 
  revealSpeed = 100,
  startDelay = 0 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const chars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      startScramble()
    }, startDelay)

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [text, startDelay])

  const startScramble = () => {
    setIsScrambling(true)
    let frame = 0
    const maxFrames = text.length * 3

    intervalRef.current = setInterval(() => {
      let scrambled = ''
      
      for (let i = 0; i < text.length; i++) {
        if (frame > i * 3) {
          scrambled += text[i]
        } else {
          scrambled += chars[Math.floor(Math.random() * chars.length)]
        }
      }
      
      setDisplayText(scrambled)
      frame++

      if (frame >= maxFrames) {
        clearInterval(intervalRef.current)
        setDisplayText(text)
        setIsScrambling(false)
      }
    }, scrambleSpeed)
  }

  return (
    <span className={`${className} ${isScrambling ? 'animate-pulse' : ''}`}>
      {displayText}
    </span>
  )
}

export default TextScramble