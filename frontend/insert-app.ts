import fs from "node:fs/promises"

const renderAppModule = "./dist/server/main-at-server.js"
const { render } = await import(renderAppModule)

const appHtml = render()
const template = await fs.readFile("./dist/client/index.html", "utf-8")

await fs.writeFile(
    "./dist/client/index.html",
    template.replace("%App%", appHtml)

)