import { useEffect, useState } from "react"
import TextConfig from "../../libs/configs/site/text.configs"

const LETTER_OFFSETS = [
  { x: -180, y: -110, r: -50 },
  { x: -80, y: 140, r: 40 },
  { x: 0, y: -160, r: -25 },
  { x: 90, y: 150, r: 45 },
  { x: 180, y: -110, r: -45 },
]

function HeroTitle() {
  const fullText = TextConfig.HI
  const lastSpaceIndex = fullText.lastIndexOf(" ")
  const prefix = lastSpaceIndex !== -1 ? fullText.slice(0, lastSpaceIndex + 1) : fullText
  const name = lastSpaceIndex !== -1 ? fullText.slice(lastSpaceIndex + 1) : ""

  const isServer = typeof window === "undefined"
  const [typedLength, setTypedLength] = useState(isServer ? prefix.length : 0)
  const [showName, setShowName] = useState(isServer)

  useEffect(() => {
    let current = 0
    setTypedLength(0)
    setShowName(false)

    const timer = setInterval(() => {
      current += 1
      setTypedLength(current)
      if (current >= prefix.length) {
        clearInterval(timer)
        setTimeout(() => setShowName(true), 120)
      }
    }, 75)

    return () => clearInterval(timer)
  }, [prefix])

  const displayedPrefix = prefix.slice(0, typedLength)
  const isTypingDone = typedLength >= prefix.length

  return (
    <h1 className="hero-text-title">
      <span className="hero-prefix">{displayedPrefix}</span>
      {!isTypingDone && <span className="hero-cursor">|</span>}
      <span className="hero-name">
        {name.split("").map((char, index) => {
          const offset = LETTER_OFFSETS[index % LETTER_OFFSETS.length]
          return (
            <span
              key={index}
              className={`hero-name-letter ${showName ? "fly-in" : ""}`}
              style={
                {
                  "--fly-x": `${offset.x}px`,
                  "--fly-y": `${offset.y}px`,
                  "--fly-r": `${offset.r}deg`,
                  "--delay": `${index * 80}ms`,
                } as React.CSSProperties
              }
            >
              {char}
            </span>
          )
        })}
      </span>
    </h1>
  )
}

export default HeroTitle