import React, { FC } from "react"
import { Modal } from "react-bootstrap"
import { MoonLoader } from "react-spinners"

const AuthenticatingModal: FC = () => {
    return (
        <Modal
            style={{
                height: 225,
                width: "100%",
                backgroundColor: "#282c34",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <MoonLoader size={50} color={"dodgerblue"} />
        </Modal>
    )
}

export default AuthenticatingModal
