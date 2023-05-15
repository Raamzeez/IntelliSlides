import { faEye, faTrash, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import {
    Col,
    Image,
    Modal,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap"
import iPresentation from "../lib/frontend/models/presentation"

interface iProps {
    presentation: iPresentation
    onCloseHandler: () => void
}

const PresentationModal: React.FC<iProps> = ({
    presentation,
    onCloseHandler,
}) => {
    return (
        <Modal show={true}>
            <div className="presentation-modal">
                <FontAwesomeIcon
                    icon={faX}
                    className="pointer x-icon"
                    onClick={onCloseHandler}
                />
                <Row>
                    <Col lg={6}>
                        <Image
                            src={presentation.thumbnail.contentUrl}
                            style={{ height: 300, width: "100%" }}
                        ></Image>
                    </Col>
                    <Col lg={6} className="center-container column">
                        <div className="dynamic-color">
                            <p style={{ position: "absolute", top: 15 }}>
                                Metadata
                            </p>
                            <p className="metadata-text manrope">
                                ID: {presentation.presentationId}
                            </p>
                            <p className="metadata-text manrope">
                                Title: {presentation.title}
                            </p>
                            <p className="metadata-text manrope">
                                Subtitle: {presentation.subtitle}
                            </p>
                            <p className="metadata-text manrope">
                                Slides: {presentation.slideCount}
                            </p>
                            {presentation.date && (
                                <p>
                                    Created:{" "}
                                    {
                                        presentation.date
                                            .toLocaleString()
                                            .split(",")[0]
                                    }
                                </p>
                            )}
                        </div>
                        <Row style={{ width: "100%" }}>
                            <Col lg={6} className="center-container">
                                <OverlayTrigger
                                    key={"0"}
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            Delete
                                        </Tooltip>
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faTrash}
                                        size="1x"
                                        color="red"
                                        className="pointer"
                                        style={{
                                            position: "absolute",
                                            bottom: 25,
                                            right: "27%",
                                        }}
                                    />
                                </OverlayTrigger>
                            </Col>
                            <Col lg={6} className="center-container">
                                <OverlayTrigger
                                    key={"0"}
                                    placement="top"
                                    overlay={
                                        <Tooltip id={`tooltip-top`}>
                                            View
                                        </Tooltip>
                                    }
                                >
                                    <FontAwesomeIcon
                                        icon={faEye}
                                        size="1x"
                                        className="pointer dynamic-color"
                                        style={{
                                            position: "absolute",
                                            bottom: 25,
                                            right: "18%",
                                        }}
                                    />
                                </OverlayTrigger>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default PresentationModal
