import React, { FC } from "react"
import { Col, Row } from "react-bootstrap"
import Image from "next/image"
import iFeature from "../lib/frontend/models/feature"

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
    alt: string
    layout: "left" | "right"
}

const TextContainer: FC<iTextContainerProps> = ({ heading, body, layout }) => {
    return (
        <Col
            className={`animate__animated ${
                layout === "left"
                    ? "animate__fadeInLeft"
                    : "animate__fadeInRight"
            } feature-column`}
            lg={8}
        >
            <h3 className="manrope" style={{ margin: 25 }}>
                {heading}
            </h3>
            <p style={{ fontSize: 17, margin: 25 }}>{body}</p>
        </Col>
    )
}

const ImageContainer: FC<iImageContainerProps> = ({ image, alt, layout }) => {
    return (
        <Col
            className={`animate__animated ${
                layout === "right"
                    ? "animate__fadeInLeft"
                    : "animate__fadeInRight"
            } feature-column align-column-center`}
            lg={4}
        >
            <Image alt="" src={image} className="feature-image shadow" />
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
                    <ImageContainer
                        image={feature.image}
                        alt={feature.alt}
                        layout={layout}
                    />
                </>
            ) : (
                <>
                    <ImageContainer
                        image={feature.image}
                        alt={feature.alt}
                        layout={layout}
                    />
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
