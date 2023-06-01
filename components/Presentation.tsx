import React, { useState } from "react"
import { Image } from "react-bootstrap"
import { useSpring, animated } from "react-spring"
import iPresentation from "../lib/frontend/models/presentation"
import PresentationModal from "./PresentationModal"

interface iProps {
    presentation: iPresentation
    onClickHandler: () => void
}

const Presentation: React.FC<iProps> = ({ presentation, onClickHandler }) => {
    const [props, set] = useSpring(() => ({
        xys: [0, 0, 1],
        config: { mass: 5, tension: 350, friction: 40 },
    }))

    const trans = (x, y, s) =>
        `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`

    const calc = (x, y) => {
        if (typeof window !== "undefined") {
            const BUFFER = 50

            const why = -(y - window.innerHeight / 2) / BUFFER
            const ex = (x - window.innerWidth / 2) / BUFFER

            return [-(y / 50), x / 50, 1.1]
        }
    }

    return (
        <>
            <animated.div
                onMouseMove={(e) => {
                    const { clientX: x, clientY: y } = e

                    return set({
                        xys: calc(x, y),
                    })
                }}
                onMouseLeave={() => set({ xys: [0, 0, 1] })}
                style={{
                    transform: props.xys.interpolate(trans),
                }}
                onClick={onClickHandler}
            >
                <Image
                    src={presentation.thumbnail.contentUrl}
                    height={250}
                    width={250}
                    style={{
                        position: "absolute",
                    }}
                />
                <div
                    style={{
                        height: 250,
                        width: 250,
                    }}
                    className="presentation-card pointer center-column"
                >
                    <h3>{presentation.title}</h3>
                    <h3>{presentation.subtitle}</h3>
                </div>
            </animated.div>
        </>
    )
}

export default Presentation
