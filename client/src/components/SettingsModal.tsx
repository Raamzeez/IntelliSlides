import React, { FC } from "react"
import { Col, Dropdown, DropdownButton, Modal, Row } from "react-bootstrap"
import Line from "./Line"

interface iProps {
    onCloseHandler: () => void
}

const SettingsModal: FC<iProps> = ({ onCloseHandler }) => {
    return (
        <Modal show={true} onHide={onCloseHandler}>
            <div
                style={{
                    height: 225,
                    width: "100%",
                    backgroundColor: "#282c34",
                    display: "flex",
                    flexDirection: "column",
                    //   justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <i
                    className="fa-solid fa-x pointer"
                    style={{
                        color: "white",
                        fontSize: 20,
                        position: "absolute",
                        top: 15,
                        right: 15,
                    }}
                    onClick={onCloseHandler}
                />
                <h4 style={{ marginTop: 20 }}>Settings</h4>
                <p
                    style={{
                        fontWeight: 300,
                        fontSize: 12,
                        marginTop: -10,
                        color: "grey",
                    }}
                >
                    Apply To Browser
                </p>
                <Line />
                <Row style={{ marginTop: 20 }}>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <h6 style={{ marginTop: 30, fontWeight: 300 }}>
                            App Theme:{" "}
                        </h6>
                    </Col>
                    <Col>
                        <DropdownButton
                            style={{ marginTop: 15 }}
                            key={"secondary"}
                            title={"System"}
                            id={"1"}
                        >
                            {["Light", "Dark", "System"].map((model, index) => {
                                return (
                                    <Dropdown.Item key={index} eventKey={model}>
                                        {model}
                                    </Dropdown.Item>
                                )
                            })}
                        </DropdownButton>
                    </Col>
                </Row>
            </div>
        </Modal>
    )
}

export default SettingsModal
