import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"
import Image from "next/image"
import fetchCurrentVersion from "../lib/frontend/util/fetchCurrentVersion"
import isMobile from "../lib/frontend/util/isMobile"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import versions from "../lib/frontend/data/versions"
import getVersion from "../lib/frontend/util/getVersion"

interface iProps {
    isLoading: boolean
    onClickHandler: () => void
}

const Footer: FC<iProps> = ({ isLoading, onClickHandler }) => {
    const { height, width } = useWindowDimensions()

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
            <Col className="center-container">
                <p onClick={onClickHandler} className="version-footer pointer">
                    {`Version ${fetchCurrentVersion()} ${
                        getVersion(fetchCurrentVersion()).isBeta && "- BETA"
                    }`}
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
