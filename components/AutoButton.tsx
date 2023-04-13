import React, { FC, useEffect, useState } from "react"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"

interface iProps {
    onClickHandler: () => void
}

const AutoButton: FC<iProps> = ({ onClickHandler }) => {
    const { width } = useWindowDimensions()

    const [clicked, setClicked] = useState(false)

    useEffect(() => {
        if (localStorage.getItem("auto") === "true") {
            setClicked(true)
        }
    }, [])

    const onClick = () => {
        setClicked(!clicked)
        if (typeof window !== "undefined" && window.localStorage) {
            localStorage.setItem("auto", JSON.stringify(!clicked))
        }
        onClickHandler()
    }

    const clickedStyle = () => {
        if (clicked) {
            return {
                backgroundColor: "#008CBA",
                color: "white",
                boxShadow: "0 4px #656565",
                transform: "translateY(3px)",
            }
        }
        return {}
    }

    return (
        <div
            className="auto autoButton"
            style={{
                position: "relative",
                bottom: 4,
                left: width > 400 ? 7 : 0,
                ...clickedStyle(),
            }}
            onClick={() => onClick()}
        >
            Auto
        </div>
    )
}

export default AutoButton
