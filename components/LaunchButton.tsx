import React, { FC, useState } from "react"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocket } from "@fortawesome/free-solid-svg-icons"

const LaunchButton: FC = () => {
    const { width } = useWindowDimensions()

    const threshold = 431

    return (
        <div
            className={`pointer secondary shadowHover ${
                width > 380 ? "launch-button" : "launch-button-sm"
            }`}
        >
            {width > 380 ? (
                <p className="launch-text">
                    {width > threshold ? "Launch App" : "Launch"}
                </p>
            ) : (
                <></>
            )}
            {(width > threshold || width < 380) && (
                <FontAwesomeIcon className="launch-icon" icon={faRocket} />
            )}
        </div>
    )
}

export default LaunchButton
