import React, { FC } from "react"
import VersionOption from "./VersionOption"
import versions from "../lib/frontend/data/versions"

const VersionSelector: FC = () => {
    return (
        <div
            style={{
                height: "80vh",
                width: "100%",
                backgroundColor: "black",
                overflowY: "auto",
            }}
            className="shadow purpleBlueBackground"
        >
            {versions.map(({ version, isBeta, date }) => {
                return (
                    <VersionOption
                        version={version}
                        isBeta={isBeta}
                        date={date}
                    />
                )
            })}
        </div>
    )
}

export default VersionSelector
