import React, { FC, useEffect, useState } from "react"
import useWindowDimensions from "../lib/util/useWindowDimensions"

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
        localStorage.setItem("auto", JSON.stringify(!clicked))
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
                // left: width > 1000 ? 40 : 0,
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
