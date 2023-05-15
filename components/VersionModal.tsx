import React, { FC, useState } from "react"
import { Carousel, Col, Modal, Row } from "react-bootstrap"
import fetchCurrentVersion from "../lib/frontend/util/fetchCurrentVersion"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
    faBugSlash,
    faInfoCircle,
    faMobile,
    faX,
} from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import iUpdate from "../lib/frontend/models/update"
import versions from "../lib/frontend/data/versions"

interface iProps {
    onCloseHandler: () => void
}

const VersionModal: FC<iProps> = ({ onCloseHandler }) => {
    const [index, setIndex] = useState(0)

    const router = useRouter()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const version = versions.filter(
        (version) => version.version === fetchCurrentVersion()
    )[0]

    return (
        <Modal show={true} onHide={onCloseHandler}>
            <div className="version-modal">
                <FontAwesomeIcon
                    icon={faX}
                    size="sm"
                    className="pointer x-icon"
                    onClick={onCloseHandler}
                />
                <h4
                    style={{ marginTop: 20, fontWeight: 400 }}
                    className="dynamic-color"
                >
                    {`Version ${fetchCurrentVersion()} ${
                        versions.filter(
                            (version) =>
                                version.version === fetchCurrentVersion()
                        )[0].isBeta && "- BETA"
                    }`}
                </h4>
                <Row style={{ width: "100%", margin: 10 }}>
                    <Col className="center-container">
                        <p
                            style={{
                                fontSize: 12,
                                color: "dodgerblue",
                            }}
                        >
                            Last Updated: 5/16/23
                        </p>
                    </Col>
                    <Col className="center-container">
                        <p
                            className="pointer underline version-modal-link dynamic-color"
                            onClick={() => router.push("/versions")}
                        >
                            Show All Versions
                        </p>
                    </Col>
                    <Col className="center-container">
                        <p
                            className="pointer underline version-modal-link dynamic-color"
                            onClick={() => router.push("/privacy")}
                        >
                            Privacy Policy
                        </p>
                    </Col>
                </Row>
                <Carousel
                    style={{
                        height: "40%",
                        width: "100%",
                        borderRadius: 10,
                    }}
                    activeIndex={index}
                    onSelect={handleSelect}
                    className="shadow updatesBackground"
                >
                    {version.data.map((update: iUpdate, index: number) => {
                        return (
                            <Carousel.Item key={index}>
                                <div
                                    style={{
                                        height: "40%",
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        flexDirection: "column",
                                    }}
                                >
                                    <FontAwesomeIcon
                                        icon={update.icon}
                                        size="3x"
                                        style={{ marginTop: "17%" }}
                                    />
                                </div>
                            </Carousel.Item>
                        )
                    })}
                </Carousel>
                <Row>
                    <Col>
                        <h5
                            style={{
                                marginTop: 30,
                                margin: 20,
                            }}
                            className="manrope dynamic-color"
                        >
                            {version.data[index].title}
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p
                            style={{
                                marginTop: 30,
                                margin: 20,
                            }}
                            className="manrope dynamic-color"
                        >
                            {version.data[index].description}
                        </p>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default VersionModal
