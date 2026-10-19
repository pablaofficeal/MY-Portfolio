import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import TextConfig from "../../libs/configs/site/text.configs"
import type { ModelName } from "../../libs/models/loadModel"
import ScrollModel from "./scrollModel"

type ModelSectionProps = {
  name: ModelName
  title: string
}

function ModelSection({ name, title }: ModelSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [160, 0, 0, -60])
  const opacity = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0, 1, 1, 0])

  return (
    <section className="scroll-model-section" ref={sectionRef} aria-label={title}>
      <motion.div className="scroll-model-content" style={{ y, opacity }}>
        <ScrollModel
          name={name}
          label={title}
          progress={scrollYProgress}
          loadingText={TextConfig.MODEL_LOADING}
          errorText={TextConfig.MODEL_ERROR}
        />
        <h2>{title}</h2>
      </motion.div>
    </section>
  )
}

export default ModelSection
