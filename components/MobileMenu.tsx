import menuData from "../lib/frontend/data/menuData"
import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC } from "react"
import { Col, Modal, Row } from "react-bootstrap"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import { useRouter } from "next/router"

interface iProps {
    onCloseHandler: () => void
}

const MobileMenu: FC<iProps> = ({ onCloseHandler }) => {
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
                <div className="center-column mobile-menu-card" style={{}}>
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
                                    className="touchable-opacity mobile-menu-option"
                                    key={index}
                                    onClick={() => router.push(url)}
                                >
                                    <Col
                                        className="center-container"
                                        // sm={12}
                                    >
                                        <FontAwesomeIcon
                                            icon={icon}
                                            size="lg"
                                        />
                                    </Col>
                                    <Col
                                        className="center-container"
                                        // sm={12}
                                    >
                                        <p className="mobile-menu-text">
                                            {text}
                                        </p>
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
