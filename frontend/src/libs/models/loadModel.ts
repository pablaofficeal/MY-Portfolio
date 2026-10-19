import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js"
import type { GLTF } from "three/addons/loaders/GLTFLoader.js"

export type ModelName = "earth" | "mars" | "saturn" | "galaxy"

const loader = new GLTFLoader()

export function loadModel(name: ModelName, onProgress?: (percent: number) => void): Promise<GLTF> {
  return loader.loadAsync(`/${name}.glb`, (event) => {
    if (event.total > 0) onProgress?.(Math.min(100, Math.round(event.loaded / event.total * 100)))
  })
}