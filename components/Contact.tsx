import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"

const Contact: FC = () => {
    return (
        <Row id="contact" className="contact skyhue">
            <Col className="center-column">
                <h2>Contact</h2>
                <p style={{ fontSize: 15, marginTop: 20 }}>
                    Email:{" "}
                    <a
                        href={
                            "https://mail.google.com/mail/?view=cm&fs=1&to=intellislides.contact@gmail.com"
                        }
                        target={"_blank"}
                    >
                        intellislides.contact@gmail.com
                    </a>
                </p>
            </Col>
        </Row>
    )
}

export default Contact
