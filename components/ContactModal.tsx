import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Image from "next/image"
import React from "react"
import { Col, Modal, Row } from "react-bootstrap"

interface iProps {
    onCloseHandler: () => void
}

const ContactModal: React.FC<iProps> = ({ onCloseHandler }) => {
    return (
        <Modal show={true}>
            <FontAwesomeIcon
                icon={faX}
                className="pointer x-icon"
                onClick={onCloseHandler}
            />
            <div className="justify-container contact-modal column">
                <Row>
                    <Col lg={12} className="center-container">
                        <h4 style={{ marginBottom: 30 }}>Contact</h4>
                    </Col>
                </Row>
                <Row>
                    <Col lg={4} className="center-container">
                        <div
                            className="contact-email-item center-container pointer shadowHover"
                            onClick={() =>
                                window.open(
                                    "https://mail.google.com/mail/?view=cm&fs=1&to=intellislides.contact@gmail.com",
                                    "_blank"
                                )
                            }
                        >
                            <Image
                                src={require("../public/images/Gmail_Icon.png")}
                                height={40}
                                width={50}
                                alt="Gmail Icon"
                            />
                        </div>
                    </Col>
                    <Col lg={4} className="center-container">
                        <div className="contact-email-item center-container pointer shadowHover">
                            <Image
                                src={require("../public/images/Outlook_Icon.png")}
                                height={45}
                                width={50}
                                alt="Outlook Icon"
                            />
                        </div>
                    </Col>
                    <Col lg={4} className="center-container">
                        <div className="contact-email-item center-container pointer shadowHover">
                            <Image
                                src={require("../public/images/System_Mail_Icon.png")}
                                height={70}
                                width={200}
                                alt="System Mail Icon"
                            />
                        </div>
                    </Col>
                </Row>
                <Row>
                    {["Gmail", "Outlook", "System Mail App"].map(
                        (mail, index) => {
                            return (
                                <Col
                                    key={index}
                                    lg={4}
                                    className="center-container"
                                >
                                    <p className="contact-email-label manrope">
                                        {mail}
                                    </p>
                                </Col>
                            )
                        }
                    )}
                </Row>
                <Row>
                    <Col lg={12} className="center-container">
                        <p
                            style={{ marginTop: 20 }}
                            className="contact-email-label ibm"
                        >
                            Email: intellislides.contact@gmail.com
                        </p>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default ContactModal
