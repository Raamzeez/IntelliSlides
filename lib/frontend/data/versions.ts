import {
    faBugSlash,
    faDoorOpen,
    faFileContract,
    faInfoCircle,
    faMobile,
    faPager,
} from "@fortawesome/free-solid-svg-icons"
import iVersion from "../models/version"

const versions: iVersion[] = [
    {
        version: "1.0.1",
        isBeta: true,
        date: new Date("2023-4-26"),
        data: [
            {
                icon: faInfoCircle,
                title: "Favicon",
                description:
                    "Fixed an issue where the favicon would not render for the site.",
            },
            {
                icon: faBugSlash,
                title: "Creating Presentation Error",
                description:
                    "Fixed a bug where users would not be able to create presentations due to an error of 504 status code.",
            },
            {
                icon: faBugSlash,
                title: "Category Incorrectly Disabled",
                description:
                    "Fixed a bug where users would not be able to choose a category even if the 'Auto' button was not enabled.",
            },
            {
                icon: faBugSlash,
                title: "Banner Not Disappearing",
                description:
                    "Fixed a bug where the banner on the app page would return upon page refresh.",
            },
            {
                icon: faMobile,
                title: "Mobile UI",
                description:
                    "Fixed some portions of the site so that it is more responsive, specifically when creating a presentation.",
            },
            {
                icon: faPager,
                title: "Versions Webpage",
                description:
                    "Added a new webpage that shows all versions released for IntelliSlides, as well as the features associated with each",
            },
            {
                icon: faFileContract,
                title: "Privacy Policy Update",
                description:
                    "Added a disclosure to the privacy agreement stating to the user that IntelliSlides complies with Google API Services User Data Policy",
            },
        ],
        policyChange: true,
    },
    {
        version: "1.0.0",
        isBeta: true,
        date: new Date("2023-4-6"),
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
