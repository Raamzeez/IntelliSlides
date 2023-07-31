import {
    faEnvelope,
    faFile,
    faGear,
    faHome,
    faMessage,
    faMoon,
    faSun,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import React, { useEffect, useState } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap"
import { useStore } from "../lib/frontend/context/store"
import { useTheme } from "next-themes"
import menuData from "../lib/frontend/data/menuData"

const Sidebar: React.FC = () => {
    const router = useRouter()

    const { user } = useStore()

    const getText = (authRequired: boolean, text: string) => {
        let finalText = text
        if (authRequired && !user) {
            finalText += " (Login Required)"
        }
        return finalText
    }

    const getClasses = (authRequired: boolean, text: string) => {
        let finalClasses =
            "sidebar-option lightPurpleBackground shadowHover pointer center-container"
        if ((authRequired && user) || !authRequired) {
            finalClasses += " pointer"
        }
        return finalClasses
    }

    return (
        <div className="sidebar justify-container column">
            {menuData.map(({ icon, text, url, authRequired }, index) => {
                return (
                        <OverlayTrigger
                            key={index}
                            placement="right"
                            overlay={
                                <Tooltip id={`tooltip-right`}>
                                    {getText(authRequired, text)}
                                </Tooltip>
                            }
                        >
                            <div
                                className={`sidebar-option lightPurpleBackground shadowHover pointer center-container ${getClasses(
                                    authRequired,
                                    text
                                )}`}
                                onClick={() =>
                                    router.push(
                                        !authRequired || (authRequired && user)
                                            ? url
                                            : ""
                                    )
                                }
                                style={
                                    authRequired && !user
                                        ? { opacity: 0.35 }
                                        : {}
                                }
                            >
                                <FontAwesomeIcon icon={icon} size="lg" />
                            </div>
                        </OverlayTrigger>
                )
            })}
        </div>
    )
}

export default Sidebar
