import { faFile, faSun } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import React from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { useStore } from "../lib/frontend/context/store"

const Sidebar: React.FC = () => {
    const router = useRouter()

    const { user } = useStore()

    return (
        <div className="sidebar justify-container column animate__animated animate__fadeInLeft">
            <OverlayTrigger
                key={"right"}
                placement="right"
                overlay={<Tooltip id={`tooltip-right`}>Light Mode</Tooltip>}
            >
                <div
                    className={`sidebar-option lightPurpleBackground shadowHover pointer center-container`}
                    onClick={() => user && router.push("/presentations")}
                >
                    <FontAwesomeIcon icon={faSun} size="lg" />
                </div>
            </OverlayTrigger>
            <OverlayTrigger
                key={"right"}
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
