import React, { FC, useState } from "react"
import { Col, Row } from "react-bootstrap"
import iVersion from "../lib/frontend/models/version"
import iUpdate from "../lib/frontend/models/update"

interface iProps {
    version: string
    isBeta: boolean
    date: Date
    data: iUpdate[]
    clicked: boolean
    onClickHandler: (version: iVersion) => void
}

const VersionOption: FC<iProps> = ({
    version,
    isBeta,
    date,
    data,
    clicked,
    onClickHandler,
}) => {
    return (
        <Row
            className={`pointer version-option ${
                clicked && "version-option-active"
            }`}
            onClick={() => onClickHandler({ version, isBeta, date, data })}
        >
            <Col lg={8} className="center-container">
                <h6 style={{ marginTop: 15 }}>{`Version ${version} ${
                    isBeta && "- BETA"
                }`}</h6>
            </Col>
            <Col lg={4} className="center-container">
                <h6 style={{ marginTop: 15 }}>
                    {date.toLocaleString().split(",")[0]}
                </h6>
            </Col>
        </Row>
    )
}

export default VersionOption
