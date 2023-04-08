import {
    faBugSlash,
    faDoorOpen,
    faInfoCircle,
    faMobile,
} from "@fortawesome/free-solid-svg-icons"
import iVersion from "../models/version"

const versions: iVersion[] = [
    {
        version: "1.0.1",
        isBeta: true,
        date: "4/12/23",
        data: [
            {
                icon: faInfoCircle,
                title: "Favicon",
                description:
                    "Fixed an issue where the favicon would not render for the site.",
            },
            {
                icon: faBugSlash,
                title: "Bug Fixed",
                description:
                    "Fixed a bug where users would not be able to create presentations due to an error of 504 status code.",
            },
            {
                icon: faMobile,
                title: "Mobile UI",
                description:
                    "Fixed some portions of the site so that it is more responsive, specifically when creating a presentation.",
            },
        ],
    },
    {
        version: "1.0.0",
        isBeta: true,
        date: "4/6/23",
        data: [
            {
                icon: faDoorOpen,
                title: "Welcome",
                description:
                    "Here, you will find info about our latest release and the new features added with it. We don't currently have any updates for you as this is our first release, but check in again soon when we release the next version!",
            },
        ],
    },
]

export default versions
