import TextConfig from "../../libs/configs/site/text.configs"
import ModelSection from "./modelSection"

function ScrollModels() {
  return (
    <div className="scroll-models">
      <ModelSection name="earth" title={TextConfig.EARTH} />
      <ModelSection name="mars" title={TextConfig.MARS} />
      <ModelSection name="saturn" title={TextConfig.SATURN} />
      <ModelSection name="galaxy" title={TextConfig.GALAXY} />
    </div>
  )
}

export default ScrollModels
