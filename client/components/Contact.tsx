import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

const Contact: FC = () => {
    return (
        <Row
            style={{
                height: "40vh",
                width: "100vw",
                backgroundColor: "grey",
            }}
            id="contact"
            className="skyhue"
        >
            <Col
                style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2>Contact</h2>
                <p style={{ fontSize: 15, marginTop: 20 }}>
                    Email:{" "}
                    <Link
                        to={
                            "https://mail.google.com/mail/?view=cm&fs=1&to=intellislides.contact@gmail.com"
                        }
                        target={"_blank"}
                    >
                        intellislides.contact@gmail.com
                    </Link>
                </p>
            </Col>
        </Row>
    )
}

export default Contact
