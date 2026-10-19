import TextConfig from "../../libs/configs/site/text.configs"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

const LETTER_OFFSETS = [
  { x: -260, y: -170, rotate: -60 },
  { x: -150, y: 210, rotate: 45 },
  { x: 10, y: -240, rotate: -30 },
  { x: 160, y: 220, rotate: 50 },
  { x: 260, y: -160, rotate: -55 },
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
        setTimeout(() => setShowName(true), 400)
      }
    }, 140)

    return () => clearInterval(timer)
  }, [prefix])

  const displayedPrefix = prefix.slice(0, typedLength)
  const isTypingDone = typedLength >= prefix.length

  return (
    <h1 className="hero-text-title">
      <span className="hero-prefix">{displayedPrefix}</span>
      {!isTypingDone && (
        <motion.span
          className="hero-cursor"
          animate={{ opacity: [1, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "easeInOut" }}
        >
          |
        </motion.span>
      )}
      <span className="hero-name">
        {name.split("").map((char, index) => {
          const offset = LETTER_OFFSETS[index % LETTER_OFFSETS.length]
          return (
            <motion.span
              key={index}
              className="hero-name-letter"
              initial={{
                x: isServer ? 0 : offset.x,
                y: isServer ? 0 : offset.y,
                rotate: isServer ? 0 : offset.rotate,
                opacity: isServer ? 1 : 0,
                scale: isServer ? 1 : 0.2,
                filter: isServer ? "blur(0px)" : "blur(10px)",
              }}
              animate={
                showName
                  ? {
                      x: 0,
                      y: 0,
                      rotate: 0,
                      opacity: 1,
                      scale: 1,
                      filter: "blur(0px)",
                    }
                  : undefined
              }
              transition={{
                duration: 1.1,
                delay: index * 0.16,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {char}
            </motion.span>
          )
        })}
      </span>
    </h1>
  )
}

export default HeroTitle