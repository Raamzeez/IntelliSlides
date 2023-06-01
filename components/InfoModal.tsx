import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC } from "react"
import { Modal } from "react-bootstrap"

interface iProps {
    title: string
    message: string
    onCloseHandler: () => void
}

const InfoModal: FC<iProps> = ({ title, message, onCloseHandler }) => {
    return (
        <Modal show={true} onHide={onCloseHandler}>
            <div className="center-column info-modal">
                <FontAwesomeIcon
                    icon={faX}
                    className="pointer x-icon"
                    onClick={onCloseHandler}
                />
                <h4 style={{ marginTop: 20 }} className="dynamic-color">
                    {title}
                </h4>
                <div className="line" />
                <p
                    style={{ fontSize: 13, marginTop: 30, width: "80%" }}
                    className="dynamic-color"
                >
                    {message}
                </p>
            </div>
        </Modal>
    )
}

export default InfoModal
