import iMenuOption from "../models/menuOption"
import {
    faEnvelope,
    faFile,
    faGear,
    faHome,
} from "@fortawesome/free-solid-svg-icons"

const menuData: iMenuOption[] = [
    {
        icon: faHome,
        text: "Home",
        url: "/app",
    },
    {
        icon: faFile,
        text: "View Presentations",
        url: "/presentations",
        authRequired: true,
    },
    { icon: faGear, text: "Settings", url: "/settings" },
    { icon: faEnvelope, text: "Contact", url: "/contact" },
]

export default menuData
