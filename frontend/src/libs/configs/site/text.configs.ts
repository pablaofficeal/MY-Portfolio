import { getCurrentLanguage } from "../../i18n/i18n"

const currentLang = getCurrentLanguage()
const langDicts = import.meta.glob<Record<string, string>>("../../meta/*.json", { eager: true })
const langDict = langDicts[`../../meta/${currentLang}.json`];

function TextConfig() {
    return {
        HI: langDict.HI,
        DESCRIPTION_TITLE: langDict.DESCRIPTION_TITLE,
    }
}
export default TextConfig()