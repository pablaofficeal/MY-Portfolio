import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import type { MotionValue } from "framer-motion"
import type { ModelName } from "../../libs/models/loadModel"
import ScrollModel from "./scrollModel"
import "../../assets/css/modules/models.css"

type FloatingModelProps = {
  name: ModelName
  progress: MotionValue<number>
  enter: number
  shown: number
  leave: number
  end: number
}

function FloatingModel({ name, progress, enter, shown, leave, end }: FloatingModelProps) {
  const opacity = useTransform(progress, [enter, shown, leave, end], [0, 1, 1, 0])
  const y = useTransform(progress, [enter, end], [90, -70])
  const scale = useTransform(progress, [enter, end], [0.7, 0.85])

  return (
    <motion.div className={`space-model space-model--${name}`} style={{ opacity, y, scale }}>
      <ScrollModel name={name} progress={progress} />
    </motion.div>
  )
}

function ScrollModels() {
  const section = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })

  return (
    <section className="scroll-models" ref={section} aria-hidden="true">
      <div className="scroll-models-sticky">
        <FloatingModel name="galaxy" progress={scrollYProgress} enter={0} shown={0.1} leave={0.34} end={0.52} />
        <FloatingModel name="earth" progress={scrollYProgress} enter={0.06} shown={0.21} leave={0.43} end={0.59} />
        <FloatingModel name="mars" progress={scrollYProgress} enter={0.29} shown={0.43} leave={0.66} end={0.81} />
        <FloatingModel name="saturn" progress={scrollYProgress} enter={0.57} shown={0.71} leave={0.89} end={1} />
      </div>
    </section>
  )
}

export default ScrollModels