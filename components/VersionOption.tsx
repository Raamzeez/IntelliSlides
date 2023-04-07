import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"
import iVersion from "../lib/frontend/models/version"

const VersionOption: FC<iVersion> = ({ version, isBeta, date }) => {
    return (
        <Row
            style={{
                height: 70,
                borderBottom: "2px solid dodgerblue",
            }}
            className="pointer"
        >
            <Col
                lg={8}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h6 style={{ marginTop: 15 }}>{`Version ${version} ${
                    isBeta && "- BETA"
                }`}</h6>
            </Col>
            <Col
                lg={4}
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h6 style={{ marginTop: 15 }}>{date}</h6>
            </Col>
        </Row>
    )
}

export default VersionOption
