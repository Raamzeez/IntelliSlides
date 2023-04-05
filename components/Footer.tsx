import React, { FC, useState } from "react"
import { Col, Row } from "react-bootstrap"
import Image from "next/image"
import fetchVersion from "../lib/frontend/util/fetchVersion"
import isMobile from "../lib/frontend/util/isMobile"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"

interface iProps {
    isLoading: boolean
    onClickHandler: () => void
}

const Footer: FC<iProps> = ({ isLoading, onClickHandler }) => {
    const { height, width } = useWindowDimensions()

    const [hoverText, setHoverText] = useState(false)

    return (
        <Row
            style={{
                position:
                    isMobile(height, width) && !isLoading
                        ? "relative"
                        : "absolute",
                bottom: 0,
                width: "100vw",
            }}
            className="footerBackground"
        >
            <Col
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    alt="OpenAI Logo"
                    src={require("../public/images/OpenAILogo.png")}
                    height={30}
                    width={120}
                />
            </Col>
            <Col
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <p
                    style={{
                        fontSize: 15,
                        fontWeight: 200,
                        marginTop: 22,
                        textDecoration: hoverText ? "underline" : "",
                        opacity: hoverText ? 1 : 0.75,
                    }}
                    onMouseOver={() => setHoverText(true)}
                    onMouseLeave={() => setHoverText(false)}
                    onClick={onClickHandler}
                    className="pointer"
                >
                    {fetchVersion()}
                </p>
            </Col>
            <Col
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    alt="Google Slides Logo"
                    src={require("../public/images/GoogleSlidesLogo.png")}
                    height={75}
                    width={200}
                />
            </Col>
        </Row>
    )
}

export default Footer
