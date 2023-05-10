import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import React from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"

const Sidebar: React.FC = () => {
    const router = useRouter()

    return (
        <div className="sidebar justify-container animate__animated animate__fadeInLeft">
            <OverlayTrigger
                key={"right"}
                placement="right"
                overlay={
                    <Tooltip id={`tooltip-right`}>
                        View All Presentations
                    </Tooltip>
                }
            >
                <div
                    className="sidebar-option shadowHover pointer center-container"
                    onClick={() => router.push("/presentations")}
                >
                    <FontAwesomeIcon icon={faFile} size="lg" />
                </div>
            </OverlayTrigger>
        </div>
    )
}

export default Sidebar
