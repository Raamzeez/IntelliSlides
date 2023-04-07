import React, { FC, useState } from "react"
import { Carousel, Col, Modal, Row } from "react-bootstrap"
import fetchVersion from "../lib/frontend/util/fetchVersion"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faBugSlash, faMobile, faX } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import iUpdate from "../lib/frontend/models/update"

interface iProps {
    onCloseHandler: () => void
}

const VersionModal: FC<iProps> = ({ onCloseHandler }) => {
    const [index, setIndex] = useState(0)
    const [hover, setHover] = useState(false)

    const updates: iUpdate[] = [
        {
            title: "Favicon",
            description:
                "Fixed an issue where the favicon would not render for the site.",
        },
        {
            title: "Bug Fixed",
            description:
                "Fixed a bug where users would not be able to create presentations due to an error of 504 status code.",
        },
        {
            title: "Mobile UI",
            description:
                "Fixed some portions of the site so that it is more responsive, specifically when creating a presentation.",
        },
    ]

    const router = useRouter()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

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
                    {fetchVersion()}
                </h4>
                <Row style={{ width: "100%" }}>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <p
                            style={{
                                fontSize: 12,
                                color: "dodgerblue",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            Last Updated: 4/12/23
                        </p>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <p
                            className="pointer"
                            style={{ textDecoration: hover ? "underline" : "" }}
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
                    <Carousel.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Image
                                alt="IntelliSlides Logo"
                                src={require("../public/images/IntelliSlidesLogo.png")}
                                style={{
                                    height: 100,
                                    width: 100,
                                    borderRadius: 50,
                                    marginTop: "10%",
                                }}
                            />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faBugSlash}
                                style={{ marginTop: "16.5%" }}
                                size="3x"
                            />
                        </div>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <FontAwesomeIcon
                                icon={faMobile}
                                style={{ marginTop: "16.5%" }}
                                size="3x"
                            />
                        </div>
                    </Carousel.Item>
                </Carousel>
                <Row>
                    <Col>
                        <h5
                            style={{
                                marginTop: 30,
                            }}
                            className="updates"
                        >
                            {updates[index].title}
                        </h5>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <p
                            style={{
                                marginTop: 50,
                                width: "90%",
                                marginLeft: "5%",
                            }}
                            className="updates"
                        >
                            {updates[index].description}
                        </p>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default VersionModal
