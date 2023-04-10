import React, { FC, useState } from "react"
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useRouter } from "next/router"
import iVersion from "../lib/frontend/models/version"
import iUpdate from "../lib/frontend/models/update"
import versions from "../lib/frontend/data/versions"
import VersionOption from "../components/VersionOption"
import BackArrow from "../components/BackArrow"

const Versions: FC = () => {
    const [activeVersion, setActiveVersion] = useState<iVersion | null>(null)
    const [index, setIndex] = useState(0)

    const router = useRouter()

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const onClickHandler = (version) => {
        setActiveVersion(version)
        setIndex(0)
    }

    return (
        <Container fluid className="Home">
            <Row>
                <Col>
                    <Nav>
                        <Nav.Link>
                            <BackArrow />
                        </Nav.Link>
                    </Nav>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1 style={{ marginTop: 30, fontWeight: 300 }}>Versions</h1>
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col lg={4}>
                    <div
                        style={{
                            height: "80vh",
                            width: "100%",
                            backgroundColor: "black",
                            overflowY: "auto",
                            margin: 10,
                        }}
                        className="shadow purpleBlueBackground animate__animated animate__fadeInLeft animate__fast"
                    >
                        {versions.map(({ version, isBeta, date, data }) => {
                            return (
                                <VersionOption
                                    version={version}
                                    isBeta={isBeta}
                                    date={date}
                                    data={data}
                                    clicked={activeVersion?.version === version}
                                    onClickHandler={onClickHandler}
                                />
                            )
                        })}
                    </div>
                </Col>
                <Col lg={8}>
                    <div
                        style={{
                            height: "80vh",
                            width: "100%",
                            borderRadius: 10,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 10,
                        }}
                        className="shadow updatesBackground animate__animated animate__fadeIn"
                    >
                        {!activeVersion ? (
                            <h2>
                                Select A Version On The Left To See Features
                            </h2>
                        ) : (
                            <>
                                <Carousel
                                    style={{ height: "80vh", width: "100%" }}
                                    activeIndex={index}
                                    onSelect={handleSelect}
                                    controls={!(activeVersion.data.length < 2)}
                                >
                                    {activeVersion.data.map(
                                        (update: iUpdate) => {
                                            return (
                                                <Carousel.Item>
                                                    <div
                                                        style={{
                                                            height: "80vh",
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            alignItems:
                                                                "center",
                                                            flexDirection:
                                                                "column",
                                                        }}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={update.icon}
                                                            size="3x"
                                                        />
                                                        <div
                                                            style={{
                                                                position:
                                                                    "absolute",
                                                                bottom: 50,
                                                                margin: 20,
                                                            }}
                                                            className="updates"
                                                        >
                                                            <h3>
                                                                {update.title}
                                                            </h3>
                                                            <p
                                                                style={{
                                                                    fontSize: 17,
                                                                }}
                                                            >
                                                                {
                                                                    update.description
                                                                }
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Carousel.Item>
                                            )
                                        }
                                    )}
                                </Carousel>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Versions
