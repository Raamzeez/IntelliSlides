import React, { FC } from "react"
import isMobile from "../lib/frontend/util/isMobile"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

interface iProps {
    isLoading: boolean
    text: string
    className: string
    onCloseHandler: () => void
    onClickHandler?: () => void
}

const Alert: FC<iProps> = ({
    isLoading,
    text,
    className,
    onCloseHandler,
    onClickHandler,
}) => {
    const { height, width } = useWindowDimensions()

    const alertStyling = (): {
        fontSize: number
        icon: { fontSize: number; top: number; right: number }
    } => {
        if (width <= 300) {
            return { fontSize: 8, icon: { fontSize: 13, top: 18, right: 10 } }
        } else if (width <= 480) {
            return { fontSize: 10, icon: { fontSize: 13, top: 18, right: 10 } }
        } else if (width <= 550) {
            return { fontSize: 12, icon: { fontSize: 15, top: 18, right: 15 } }
        } else if (width <= 600) {
            return {
                fontSize: 14,
                icon: { fontSize: 17.5, top: 15, right: 30 },
            }
        } else {
            return { fontSize: 16, icon: { fontSize: 20, top: 15, right: 30 } }
        }
    }

    const widthStyle = () => {
        if (width > 1220) {
            return {}
        }
        return { width: "80%" }
    }

    return (
        <div
            style={{
                position:
                    isMobile(height, width) && !isLoading
                        ? "relative"
                        : "absolute",
                top: 0,
                height: 50,
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
            className={`shadow animate__animated animate__fadeInDown ${className} ${
                onClickHandler && "pointer"
            }`}
            onClick={onClickHandler}
        >
            <p
                style={{
                    fontSize: alertStyling().fontSize,
                    marginTop: 10,
                    ...widthStyle(),
                }}
            >
                {text}
            </p>
            <FontAwesomeIcon
                icon={faX}
                className="pointer"
                style={{
                    color: "white",
                    position: "absolute",
                    ...alertStyling().icon,
                }}
                onClick={onCloseHandler}
            />
        </div>
    )
}

export default Alert
