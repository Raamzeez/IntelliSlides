import React, { FC, useState } from "react"
import {
    Col,
    // Carousel,
    Image,
    Modal,
    Row,
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import fetchVersion from "../util/fetchVersion"
import RotatingStructures from "../images/RotatingStructures.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faX } from "@fortawesome/free-solid-svg-icons"

interface iProps {
    onCloseHandler: () => void
}

const VersionModal: FC<iProps> = ({ onCloseHandler }) => {
    const [hover, setHover] = useState(false)

    const navigate = useNavigate()

    return (
        <Modal show={true} onHide={onCloseHandler}>
            <div
                style={{
                    height: 550,
                    width: "100%",
                    backgroundColor: "#282c34",
                    display: "flex",
                    flexDirection: "column",
                    //   justifyContent: "center",
                    alignItems: "center",
                    // backgroundImage: `url("https://media.giphy.com/media/ITRemFlr5tS39AzQUL/giphy.gif")`,
                    // backgroundRepeat: "no-repeat",
                    // backgroundSize: "cover",
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
                <h4 style={{ marginTop: 20, fontWeight: 400 }}>
                    {fetchVersion()}
                </h4>
                <Row style={{ width: "100%" }}>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <p
                            style={{
                                fontSize: 12,
                                color: "dodgerblue",
                                fontWeight: "bold",
                                marginTop: 5,
                            }}
                        >
                            Last Updated: 4/3/23
                        </p>
                    </Col>
                    <Col
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            fontSize: 12,
                        }}
                        onMouseOver={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                    >
                        <p
                            className="pointer"
                            style={{ textDecoration: hover ? "underline" : "" }}
                            onClick={() => navigate("/privacy")}
                        >
                            Privacy Policy
                        </p>
                    </Col>
                </Row>
                <h1
                    style={{
                        marginTop: 30,
                        position: "absolute",
                        top: "25%",
                        padding: 5,
                        color: "white",
                    }}
                    className="poppins"
                >
                    Welcome!
                </h1>
                <Image
                    src={RotatingStructures}
                    style={{
                        height: "40%",
                        width: "100%",
                        borderRadius: 10,
                    }}
                    className="shadow"
                />
                <p
                    style={{
                        marginTop: "15%",
                        width: "90%",
                        fontSize: 15,
                    }}
                    className="updates"
                >
                    Here, you will find info about our latest release and the
                    new features added with it. We don't currently have any
                    updates for you as this is our first release, but check in
                    again soon when we release the next version!
                </p>
                {/*
        <Pagination style={{ marginTop: 30, position: "absolute", bottom: 10 }}>
          <Pagination.Item>1</Pagination.Item>
          <Pagination.Item>2</Pagination.Item>
          <Pagination.Item>3</Pagination.Item>
          <Pagination.Item>4</Pagination.Item>
          <Pagination.Item>5</Pagination.Item>
        </Pagination> */}
            </div>
        </Modal>
    )
}

export default VersionModal
