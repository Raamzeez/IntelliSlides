import { faFile, faGear, faHome, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC } from "react"
import iMenuOption from "../lib/frontend/models/menuOption"
import { Col, Modal, Row } from "react-bootstrap"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import { useRouter } from "next/router"

interface iProps {
    onCloseHandler: () => void
}

const MobileMenu: FC<iProps> = ({ onCloseHandler }) => {
    const menuData: iMenuOption[] = [
        {
            icon: faHome,
            text: "Home",
            url: "/",
        },
        { icon: faFile, text: "View Presentations", url: "/presentations" },
        { icon: faGear, text: "Settings", url: "/settings" },
    ]

    const { height } = useWindowDimensions()

    const router = useRouter()

    return (
        <>
            <Modal show={true}>
                <FontAwesomeIcon
                    icon={faX}
                    className="pointer x-icon"
                    onClick={onCloseHandler}
                />
                <div
                    className="center-column footerBackground"
                    style={{
                        backgroundColor: "lightblue",
                        borderRadius: 14,
                        height: height / 1.25,
                    }}
                >
                    <div
                        className="center-column"
                        style={{
                            height: "50%",
                            width: "100%",
                        }}
                    >
                        {menuData.map(({ icon, text, url }, index) => {
                            return (
                                <Row
                                    style={{
                                        height: "33%",
                                        width: "75%",
                                        margin: 20,
                                    }}
                                    className="shadowHover"
                                    key={index}
                                    onClick={() => router.push(url)}
                                >
                                    <Col
                                        className="center-container no-margin"
                                        sm={6}
                                    >
                                        <FontAwesomeIcon
                                            icon={icon}
                                            size="lg"
                                        />
                                    </Col>
                                    <Col
                                        className="center-container no-margin"
                                        sm={6}
                                    >
                                        <p style={{ marginTop: 15 }}>{text}</p>
                                    </Col>
                                </Row>
                            )
                        })}
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default MobileMenu
