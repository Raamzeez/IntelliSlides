import React, { FC } from "react"
import { Carousel, Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faLeftLong } from "@fortawesome/free-solid-svg-icons"
import { useRouter } from "next/router"
import VersionSelector from "../components/VersionSelector"

const Versions: FC = () => {
    const router = useRouter()

    return (
        <Container fluid className="Home">
            <Row>
                <Col>
                    <div
                        style={{
                            height: 50,
                            width: 50,
                            backgroundColor: "dodgerblue",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            borderRadius: 25,
                            position: "absolute",
                            left: 30,
                            top: 23,
                        }}
                        className="shadow pointer"
                        onClick={() => router.back()}
                    >
                        <FontAwesomeIcon icon={faLeftLong} />
                    </div>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 style={{ marginTop: 30 }}>Versions</h1>
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col lg={4}>
                    <VersionSelector />
                </Col>
                <Col lg={8}>
                    <Carousel
                        style={{
                            height: "80vh",
                            width: "100%",
                            borderRadius: 10,
                        }}
                        // activeIndex={index}
                        // onSelect={handleSelect}
                        className="shadow updatesBackground"
                    >
                        <Carousel.Item>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            ></div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            ></div>
                        </Carousel.Item>
                        <Carousel.Item>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            ></div>
                        </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
        </Container>
    )
}

export default Versions
