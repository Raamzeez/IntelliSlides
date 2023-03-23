import React, { FC } from "react"
import { Col, Image, Row } from "react-bootstrap"
import iFeature from "../models/feature"

interface iProps {
    feature: iFeature
    layout: "left" | "right"
}

interface iTextContainerProps {
    heading: string
    body: string
}

interface iImageContainerProps {
    image: string
}

const TextContainer: FC<iTextContainerProps> = ({ heading, body }) => {
    return (
        <Col
            lg={8}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                backgroundColor: "#3a83f7",
            }}
        >
            <h3 className="updates">{heading}</h3>
            <p style={{ fontSize: 17 }}>{body}</p>
        </Col>
    )
}

const ImageContainer: FC<iImageContainerProps> = ({ image }) => {
    return (
        <Col
            lg={4}
            style={{
                backgroundColor: "#3a83f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Image
                src={require("../images/IntelliSlidesLogo.png")}
                style={{ height: 200, width: 200, borderRadius: 10 }}
            />
        </Col>
    )
}

const Feature: FC<iProps> = ({ feature, layout }) => {
    return (
        <Row style={{ height: 350, width: "100vw" }}>
            {layout === "left" ? (
                <>
                    <TextContainer
                        heading={feature.heading}
                        body={feature.body}
                    />
                    <ImageContainer image="" />
                </>
            ) : (
                <>
                    <ImageContainer image="" />
                    <TextContainer
                        heading={feature.heading}
                        body={feature.body}
                    />
                </>
            )}
        </Row>
    )
}

export default Feature
