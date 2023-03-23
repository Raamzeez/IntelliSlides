import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"

const HomeFooter: FC = () => {
    return (
        <Row
            style={{
                height: 100,
                width: "100vw",
                backgroundColor: "black",
            }}
        >
            <Col
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h3>&copy; IntelliSlides | 2023</h3>
            </Col>
        </Row>
    )
}

export default HomeFooter
