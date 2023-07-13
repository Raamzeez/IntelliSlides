import { IconDefinition } from "@fortawesome/fontawesome-svg-core"

interface iMenuOption {
    icon: IconDefinition
    text: string
    url: string
    authRequired?: boolean
}

export default iMenuOption
