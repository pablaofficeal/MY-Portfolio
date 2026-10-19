import MainProjectLinks from "./links/main.project.links"
import HomeLinks from "./links/home.links"

function Menu() {
    return (
        <nav>
            <HomeLinks />
            <MainProjectLinks />
        </nav>
    )
}

export default Menu