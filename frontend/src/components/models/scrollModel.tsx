import { useEffect, useRef, useState } from "react"
import type { MotionValue } from "framer-motion"
import * as THREE from "three"
import { loadModel } from "../../libs/models/loadModel"
import type { ModelName } from "../../libs/models/loadModel"

type ScrollModelProps = {
  name: ModelName
  label: string
  progress: MotionValue<number>
  loadingText: string
  errorText: string
}

function disposeModel(root: THREE.Object3D) {
  root.traverse((object) => {
    if (!(object instanceof THREE.Mesh)) return
    object.geometry.dispose()
    const materials = Array.isArray(object.material) ? object.material : [object.material]
    materials.forEach((material) => {
      if (material instanceof THREE.MeshStandardMaterial) material.map?.dispose()
      material.dispose()
    })
  })
}

function ScrollModel({ name, label, progress, loadingText, errorText }: ScrollModelProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const visibleRef = useRef(false)
  const rotationRef = useRef(0)
  const [shouldLoad, setShouldLoad] = useState(false)
  const [loadPercent, setLoadPercent] = useState<number | null>(null)
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading")

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (typeof IntersectionObserver === "undefined") {
      visibleRef.current = true
      setShouldLoad(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      visibleRef.current = entry.isIntersecting
      if (entry.isIntersecting) setShouldLoad(true)
    }, { rootMargin: "150px" })
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    rotationRef.current = progress.get() * Math.PI * 2
    return progress.on("change", (value) => {
      rotationRef.current = value * Math.PI * 2
    })
  }, [progress])

  useEffect(() => {
    const container = containerRef.current
    if (!container || !shouldLoad) return

    let disposed = false
    const scene = new THREE.Scene()
    const pivot = new THREE.Group()
    scene.add(pivot)
    const camera = new THREE.PerspectiveCamera(40, 1, 0.01, 1000)
    let renderer: THREE.WebGLRenderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    } catch {
      setStatus("error")
      return
    }

    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    container.appendChild(renderer.domElement)

    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const light = new THREE.DirectionalLight(0xffffff, 2.4)
    light.position.set(3, 4, 6)
    scene.add(light)

    const resize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      if (!width || !height) return
      camera.aspect = width / height
      camera.updateProjectionMatrix()
      renderer.setSize(width, height)
    }
    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const clock = new THREE.Clock()
    renderer.setAnimationLoop(() => {
      const delta = Math.min(clock.getDelta(), 0.05)
      if (!visibleRef.current) return
      pivot.rotation.y = THREE.MathUtils.damp(pivot.rotation.y, rotationRef.current, 8, delta)
      renderer.render(scene, camera)
    })

    loadModel(name, (percent) => {
      if (!disposed) setLoadPercent(percent)
    }).then((gltf) => {
      if (disposed) {
        disposeModel(gltf.scene)
        return
      }

      const bounds = new THREE.Box3().setFromObject(gltf.scene)
      const center = bounds.getCenter(new THREE.Vector3())
      const size = bounds.getSize(new THREE.Vector3())
      const radius = Math.max(size.length() / 2, 0.1)
      gltf.scene.position.sub(center)
      pivot.rotation.y = rotationRef.current
      pivot.add(gltf.scene)

      camera.position.set(radius * 0.5, radius * (name === "galaxy" ? 2.5 : 0.7), radius * 2.7)
      camera.lookAt(0, 0, 0)
      camera.near = Math.max(radius / 100, 0.01)
      camera.far = Math.max(radius * 100, 100)
      camera.updateProjectionMatrix()
      setStatus("ready")
    }).catch(() => {
      if (!disposed) setStatus("error")
    })

    return () => {
      disposed = true
      renderer.setAnimationLoop(null)
      resizeObserver.disconnect()
      disposeModel(pivot)
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [name, shouldLoad])

  return (
    <div className="scroll-model-canvas" ref={containerRef} role="img" aria-label={label}>
      {status !== "ready" && (
        <span className="scroll-model-status" role="status">
          {status === "error" ? errorText : `${loadingText}${loadPercent === null ? "" : ` ${loadPercent}%`}`}
        </span>
      )}
    </div>
  )
}

export default ScrollModel
