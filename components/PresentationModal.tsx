import { faEye, faTrash, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useState } from "react"
import {
    Col,
    Image,
    Modal,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap"
import iPresentation from "../lib/frontend/models/presentation"
import Button from "./Button"
import iError from "../lib/frontend/models/error"

interface iProps {
    presentation: iPresentation
    onCloseHandler: () => void
}

interface iState {
    showDelete: boolean
    loading: boolean
    error: null | iError
}

const PresentationModal: React.FC<iProps> = ({
    presentation,
    onCloseHandler,
}) => {
    const [state, setState] = useState<iState>({
        showDelete: false,
        loading: false,
        error: null,
    })

    return (
        <Modal show={true}>
            <div className="presentation-modal">
                <FontAwesomeIcon
                    icon={faX}
                    className="pointer x-icon"
                    onClick={onCloseHandler}
                />
                {!state.showDelete ? (
                    <>
                        <Row>
                            <Col lg={6}>
                                <Image
                                    src={presentation.thumbnail.contentUrl}
                                    style={{ height: 300, width: "100%" }}
                                ></Image>
                            </Col>
                            <Col lg={6} className="center-container column">
                                <div className="dynamic-color">
                                    <p
                                        style={{
                                            position: "absolute",
                                            top: 15,
                                        }}
                                    >
                                        Overview
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
                                                    Delete From List
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
                                                onClick={() =>
                                                    setState({
                                                        ...state,
                                                        showDelete: true,
                                                    })
                                                }
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
                                                onClick={() =>
                                                    window.open(
                                                        `https://docs.google.com/presentation/d/${presentation.presentationId}/edit#slide=id.p`,
                                                        "_blank"
                                                    )
                                                }
                                            />
                                        </OverlayTrigger>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </>
                ) : (
                    <>
                        <Row
                            className="center-column"
                            style={{ textAlign: "center", marginTop: "10%" }}
                        >
                            <h4>Are You Sure?</h4>
                            <p
                                style={{
                                    fontSize: 13,
                                    width: "80%",
                                }}
                            >
                                Your Google Presentation "{presentation.title}"
                                will will be deleted ONLY FROM OUR DATABASE, and
                                it will not appear under "Presentations"
                                anymore, but it will still exist on Google
                                Slides
                            </p>
                        </Row>
                        <Row style={{ marginTop: "10%" }}>
                            <Col lg={6} className="center-container">
                                <Button
                                    type="danger"
                                    value="Cancel"
                                    onClickHandler={() =>
                                        setState({
                                            ...state,
                                            showDelete: false,
                                        })
                                    }
                                />
                            </Col>
                            <Col lg={6} className="center-container">
                                <Button
                                    type="success"
                                    value="Confirm"
                                    onClickHandler={() => null}
                                />
                            </Col>
                        </Row>
                    </>
                )}
            </div>
        </Modal>
    )
}

export default PresentationModal
