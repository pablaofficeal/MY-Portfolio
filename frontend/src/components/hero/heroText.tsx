import TextConfig from "../../libs/configs/site/text.configs"
import HeroTitle from "./heroTitle"

function HeroText() {
    return (
        <section className="hero-text">
            <HeroTitle />
            <p className="hero-text-description">{TextConfig.DESCRIPTION_TITLE}</p>
        </section>
    )
}

export default HeroText