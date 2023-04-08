import React, { FC, useState } from "react"
import { Col, Row } from "react-bootstrap"
import iVersion from "../lib/frontend/models/version"
import iUpdate from "../lib/frontend/models/update"

interface iProps {
    version: string
    isBeta: boolean
    date: string
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
    const [hover, setHover] = useState(false)

    const hoverStyle =
        hover || clicked
            ? {
                  backgroundColor: "#0462bf",
              }
            : {}

    return (
        <Row
            style={{
                height: 70,
                borderBottom: "2px solid #0462bf",
                transition: "all 0.3s ease",
                ...hoverStyle,
            }}
            className={`pointer`}
            onClick={() => onClickHandler({ version, isBeta, date, data })}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
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
