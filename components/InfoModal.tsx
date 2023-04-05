import { faX } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC } from "react"
import { Modal } from "react-bootstrap"
import Line from "./Line"

interface iProps {
    title: string
    message: string
    onCloseHandler: () => void
}

const InfoModal: FC<iProps> = ({ title, message, onCloseHandler }) => {
    return (
        <Modal show={true} onHide={onCloseHandler}>
            <div
                style={{
                    width: "100%",
                    backgroundColor: "#282c34",
                    display: "flex",
                    flexDirection: "column",
                    //   justifyContent: "center",
                    alignItems: "center",
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
                <h4 style={{ marginTop: 20 }}>{title}</h4>
                <Line />
                <p style={{ fontSize: 13, marginTop: 30, width: "80%" }}>
                    {message}
                </p>
            </div>
        </Modal>
    )
}

export default InfoModal