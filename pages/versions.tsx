import React, { FC, useState } from "react"
import { Carousel, Col, Container, Nav, Row } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import iVersion from "../lib/frontend/models/version"
import iUpdate from "../lib/frontend/models/update"
import versions from "../lib/frontend/data/versions"
import VersionOption from "../components/VersionOption"
import BackArrow from "../components/BackArrow"

const Versions: FC = () => {
    const { height, width } = useWindowDimensions()

    const [activeVersion, setActiveVersion] = useState<iVersion | null>(null)
    const [index, setIndex] = useState(0)

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex)
    }

    const onClickHandler = (version) => {
        setActiveVersion(version)
        setIndex(0)
    }

    const useSmallStyling = () => {
        if (width > 992) {
            if (height < 700) {
                return true
            }
        } else {
            if (height < 700) {
                return true
            }
        }
        return false
    }

    const marginTopStyle = () => {
        if (useSmallStyling()) {
            const marginTop = -135 + height / 2
            return { marginTop }
        }
        return {}
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
                            <h2 style={{ margin: 20 }}>
                                Select A Version On The{" "}
                                {width > 991 ? "Left" : "Top"} To See Features
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
                                                <Carousel.Item
                                                    key={index}
                                                    className="version-carousel-item"
                                                >
                                                    <div
                                                        className={`fill-parent ${
                                                            !useSmallStyling()
                                                                ? "center-column"
                                                                : "justify-container"
                                                        }`}
                                                        style={marginTopStyle()}
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={update.icon}
                                                            size="4x"
                                                        />
                                                        <Carousel.Caption className="manrope">
                                                            <h4>
                                                                {update.title}
                                                            </h4>
                                                            <p
                                                                style={{
                                                                    fontSize:
                                                                        width >
                                                                        600
                                                                            ? 15
                                                                            : width /
                                                                              50,
                                                                }}
                                                            >
                                                                {
                                                                    update.description
                                                                }
                                                            </p>
                                                        </Carousel.Caption>
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
