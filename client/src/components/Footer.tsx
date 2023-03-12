import React, { FC, useState } from "react"
import { Col, Image, Row } from "react-bootstrap"
import fetchVersion from "../util/fetchVersion"
import isMobile from "../util/isMobile"
import useWindowDimensions from "../util/useWindowDimensions"

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
                width: "100%",
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
                    src={require("../images/OpenAILogo.png")}
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
                    src={require("../images/GoogleSlidesLogo.png")}
                    height={75}
                    width={200}
                />
            </Col>
        </Row>
    )
}

export default Footer
