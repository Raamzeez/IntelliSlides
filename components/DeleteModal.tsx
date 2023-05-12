import React, { FC } from "react"
import { Modal } from "react-bootstrap"
import Button from "./Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX, faCircleExclamation } from "@fortawesome/free-solid-svg-icons"

interface iProps {
    onCloseHandler: () => void
    onConfirmHandler: () => void
}

const DeleteModal: FC<iProps> = ({ onCloseHandler, onConfirmHandler }) => {
    return (
        <Modal show={true} onHide={onCloseHandler}>
            <div className="warning-modal">
                {" "}
                <FontAwesomeIcon
                    icon={faX}
                    className="pointer x-icon"
                    onClick={onCloseHandler}
                />
                <FontAwesomeIcon
                    icon={faCircleExclamation}
                    style={{ fontSize: 75, color: "orange", marginTop: 20 }}
                />
                <h5 style={{ marginTop: 20 }} className="dynamic-color">
                    Are You Sure You Want To Continue?
                </h5>
                <p
                    style={{
                        marginTop: 20,
                        color: "grey",
                        width: "80%",
                        marginLeft: "10%",
                    }}
                >
                    This action is irreversible, and all data will be removed,
                    such as presentations created.
                </p>
                <div style={{ position: "absolute", bottom: 20 }}>
                    <Button
                        type="primary"
                        value="Continue"
                        onClickHandler={onConfirmHandler}
                    />
                </div>
            </div>
        </Modal>
    )
}

export default DeleteModal
