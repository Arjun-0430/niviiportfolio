import { useEffect, useState } from 'react'

const TypeWriter = ({ 
  text, 
  className = '', 
  speed = 100, 
  startDelay = 0,
  showCursor = true 
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showCursorBlink, setShowCursorBlink] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      } else {
        setShowCursorBlink(true)
      }
    }, currentIndex === 0 ? startDelay : speed)

    return () => clearTimeout(timer)
  }, [currentIndex, text, speed, startDelay])

  return (
    <span className={className}>
      {displayText}
      {showCursor && (
        <span className={`inline-block w-0.5 h-6 bg-current ml-1 ${showCursorBlink ? 'animate-pulse' : ''}`}>
          |
        </span>
      )}
    </span>
  )
}

export default TypeWriter