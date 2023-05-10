import { faFile } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import React from "react"

const Sidebar: React.FC = () => {
    const router = useRouter()

    return (
        <div className="sidebar justify-container">
            <div
                className="sidebar-option shadowHover pointer center-container"
                onClick={() => router.push("/presentations")}
            >
                <FontAwesomeIcon icon={faFile} size="lg" />
            </div>
        </div>
    )
}

export default Sidebar
