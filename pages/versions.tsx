import React, { FC, useState } from "react"
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import iVersion from "../lib/frontend/models/version"
import iUpdate from "../lib/frontend/models/update"
import versions from "../lib/frontend/data/versions"
import VersionOption from "../components/VersionOption"
import BackArrow from "../components/BackArrow"

const Versions: FC = () => {
    const [activeVersion, setActiveVersion] = useState<iVersion | null>(null)
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const onClickHandler = (version) => {
        setActiveVersion(version)
        setIndex(0)
    }

    return (
        <Container fluid className="Home">
            <BackArrow />
            <Row>
                <Col>
                    <h1 style={{ marginTop: 30, fontWeight: 300 }}>Versions</h1>
                </Col>
            </Row>
            <Row style={{ width: "100%" }}>
                <Col lg={4}>
                    <div className="version-selector purpleBlueBackground animate__animated animate__fadeInLeft animate__fast shadow">
                        {versions.map(
                            (
                                { version, isBeta, date, data },
                                index: number
                            ) => {
                                return (
                                    <VersionOption
                                        key={index}
                                        version={version}
                                        isBeta={isBeta}
                                        date={date}
                                        data={data}
                                        clicked={
                                            activeVersion?.version === version
                                        }
                                        onClickHandler={onClickHandler}
                                    />
                                )
                            }
                        )}
                    </div>
                </Col>
                <Col lg={8}>
                    <div className="version-carousel-container center-container shadow updatesBackground animate__animated animate__fadeIn">
                        {!activeVersion ? (
                            <h2>
                                Select A Version On The Left To See Features
                            </h2>
                        ) : (
                            <>
                                <Carousel
                                    className="version-carousel"
                                    activeIndex={index}
                                    onSelect={handleSelect}
                                    controls={!(activeVersion.data.length < 2)}
                                >
                                    {activeVersion.data.map(
                                        (update: iUpdate, index: number) => {
                                            return (
                                                <Carousel.Item key={index}>
                                                    <div className="version-carousel-item center-column">
                                                        <FontAwesomeIcon
                                                            icon={update.icon}
                                                            size="4x"
                                                        />
                                                        <div className="version-text-container manrope">
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
