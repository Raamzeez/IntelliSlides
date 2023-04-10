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
            <div
                style={{
                    height: 550,
                    width: "100%",
                    backgroundColor: "#282c34",
                    display: "flex",
                    flexDirection: "column",
                    //   justifyContent: "center",
                    alignItems: "center",
                    // backgroundImage: `url("https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif")`,
                    // backgroundRepeat: "no-repeat",
                    // backgroundSize: "cover",
                }}
            >
                <FontAwesomeIcon
                    icon={faX}
                    className="pointer"
                    style={{
                        color: "white",
                        fontSize: 20,
                        position: "absolute",
                        top: 15,
                        right: 15,
                    }}
                    onClick={onCloseHandler}
                />
                <h4 style={{ marginTop: 20, fontWeight: 400 }}>
                    {`Version ${fetchCurrentVersion()} ${
                        versions.filter(
                            (version) =>
                                version.version === fetchCurrentVersion()
                        )[0].isBeta && "- BETA"
                    }`}
                </h4>
                <Row style={{ width: "100%", margin: 10 }}>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <p
                            style={{
                                fontSize: 12,
                                color: "dodgerblue",
                                fontWeight: "bold",
                            }}
                        >
                            Last Updated: 4/12/23
                        </p>
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <a
                            className="pointer"
                            style={{ fontSize: 12 }}
                            onClick={() => router.push("/versions")}
                        >
                            Show All Versions
                        </a>
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                        <a
                            className="pointer"
                            style={{ fontSize: 12 }}
                            onClick={() => router.push("/privacy")}
                        >
                            Privacy Policy
                        </a>
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
                            className="updates"
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
                            className="updates"
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
