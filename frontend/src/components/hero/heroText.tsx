import TextConfig from "../../libs/configs/site/text.configs"

function HeroText() {
    return (
        <section className="hero-text">
            <h1 className="hero-text-title">{TextConfig.HI}</h1>
            <p className="hero-text-description">{TextConfig.DESCRIPTION_TITLE}</p>
        </section>
    )
}

export default HeroText