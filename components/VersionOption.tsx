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
                <p className="no-margin">{`Version ${version} ${
                    isBeta && "- BETA"
                }`}</p>
            </Col>
            <Col lg={4} className="center-container">
                <p className="no-margin">
                    {date.toLocaleString().split(",")[0]}
                </p>
            </Col>
        </Row>
    )
}

export default VersionOption
