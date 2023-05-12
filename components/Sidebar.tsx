import {
    faFile,
    faGear,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { useStore } from "../lib/frontend/context/store"
import { useTheme } from "next-themes"

const Sidebar: React.FC = () => {
    const router = useRouter()

    const { user } = useStore()

    return (
        <div className="sidebar justify-container column animate__animated animate__fadeInLeft">
            <OverlayTrigger
                key={"0"}
                placement="right"
                overlay={<Tooltip id={`tooltip-right`}>Settings</Tooltip>}
            >
                <div
                    className={`sidebar-option lightPurpleBackground shadowHover pointer center-container`}
                    onClick={() => router.push("/settings")}
                >
                    <FontAwesomeIcon icon={faGear} size="lg" />
                </div>
            </OverlayTrigger>
            <OverlayTrigger
                key={"2"}
                placement="right"
                overlay={
                    <Tooltip id={`tooltip-right`}>
                        View Presentations {!user && "(Login Required)"}
                    </Tooltip>
                }
            >
                <div
                    className={`sidebar-option lightPurpleBackground shadowHover ${
                        user && "pointer"
                    } center-container`}
                    onClick={() => user && router.push("/presentations")}
                    style={!user ? { opacity: 0.35 } : {}}
                >
                    <FontAwesomeIcon icon={faFile} size="lg" />
                </div>
            </OverlayTrigger>
        </div>
    )
}

export default Sidebar
