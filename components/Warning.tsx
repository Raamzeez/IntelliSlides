import { faCircleExclamation, faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC } from "react"
import { Modal } from "react-bootstrap"
import Button from "./Button"

interface iProps {
    onCloseHandler: () => void
    onClickHandler: () => void
    message: string
}

const Warning: FC<iProps> = ({ onCloseHandler, onClickHandler, message }) => {
    return (
        <Modal show={true} onHide={onCloseHandler}>
            <div className="warning-modal">
                <FontAwesomeIcon
                    icon={faX}
                    className="pointer x-icon"
                    onClick={onCloseHandler}
                />
                <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ fontSize: 75, color: "orange", marginTop: 20 }}
                />
                <h5 style={{ marginTop: 20, color: "white" }}>
                    Are You Sure You Want To Continue?
                </h5>
                <p style={{ marginTop: 20, color: "grey" }}>{message}</p>
                <div style={{ position: "absolute", bottom: 20 }}>
                    <Button
                        type="primary"
                        value="Continue"
                        onClickHandler={onClickHandler}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default Warning
