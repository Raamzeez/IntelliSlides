import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"

const HomeFooter: FC = () => {
    return (
        <Row
            style={{
                height: 100,
                width: "100vw",
                backgroundColor: "rgb(40, 40, 40)",
            }}
        >
            <Col></Col>
            <Col
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <p style={{ fontWeight: 300, fontSize: 17, marginTop: 10 }}>
                    IntelliSlides 2023
                </p>
            </Col>
            <Col></Col>
        </Row>
    )
}

export default HomeFooter
