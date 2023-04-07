import iVersion from "../models/version"

const versions: iVersion[] = [
    {
        version: "1.0.1",
        isBeta: true,
        date: "4/12/23",
        data: [
            {
                title: "Favicon",
                description:
                    "Fixed an issue where the favicon would not render for the site.",
            },
            {
                title: "Bug Fixed",
                description:
                    "Fixed a bug where users would not be able to create presentations due to an error of 504 status code.",
            },
            {
                title: "Mobile UI",
                description:
                    "Fixed some portions of the site so that it is more responsive, specifically when creating a presentation.",
            },
        ],
    },
    { version: "1.0.0", isBeta: true, date: "4/6/23", data: [] },
]

export default versions
