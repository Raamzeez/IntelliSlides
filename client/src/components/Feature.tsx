import React, { FC } from "react"
import { Col, Image, Row } from "react-bootstrap"

const Feature: FC = () => {
    return (
        <Row style={{ height: 300, width: "100vw" }}>
            <Col lg={4} style={{ backgroundColor: "grey" }}>
                <Image
                    src={require("../images/IntelliSlidesLogo.png")}
                    style={{ height: 30, width: 30 }}
                />
            </Col>
            <Col lg={8} style={{ backgroundColor: "blue" }}>
                <h1>Test</h1>
            </Col>
        </Row>
    )
}

export default Feature
