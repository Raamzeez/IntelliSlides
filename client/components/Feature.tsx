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
    layout: "left" | "right"
}

interface iImageContainerProps {
    image: string
    layout: "left" | "right"
}

const TextContainer: FC<iTextContainerProps> = ({ heading, body, layout }) => {
    return (
        <Col
            className={`animate__animated ${
                layout === "left"
                    ? "animate__fadeInLeft"
                    : "animate__fadeInRight"
            }`}
            lg={8}
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                // backgroundColor: "#3a83f7",
                border: "none",
                margin: 0,
                padding: 0,
            }}
        >
            <h3 className="updates" style={{ margin: 25 }}>
                {heading}
            </h3>
            <p style={{ fontSize: 17, margin: 25 }}>{body}</p>
        </Col>
    )
}

const ImageContainer: FC<iImageContainerProps> = ({ image, layout }) => {
    return (
        <Col
            className={`animate__animated ${
                layout === "right"
                    ? "animate__fadeInLeft"
                    : "animate__fadeInRight"
            }`}
            lg={4}
            style={{
                // backgroundColor: "#3a83f7",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                border: "none",
                margin: 0,
                padding: 0,
            }}
        >
            <Image
                src={image}
                style={{
                    height: 260,
                    width: 260,
                    borderRadius: 10,
                    margin: 25,
                }}
                className="shadow"
            />
        </Col>
    )
}

const Feature: FC<iProps> = ({ feature, layout }) => {
    return (
        <Row
            style={{
                minHeight: 350,
                width: "100vw",
            }}
        >
            {layout === "left" ? (
                <>
                    <TextContainer
                        heading={feature.heading}
                        body={feature.body}
                        layout={layout}
                    />
                    <ImageContainer image={feature.image} layout={layout} />
                </>
            ) : (
                <>
                    <ImageContainer image={feature.image} layout={layout} />
                    <TextContainer
                        heading={feature.heading}
                        body={feature.body}
                        layout={layout}
                    />
                </>
            )}
        </Row>
    )
}

export default Feature
