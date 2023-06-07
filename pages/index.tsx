import React, { FC } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Contact from "../components/Contact"
import Feature from "../components/Feature"
import Header from "../components/Header"
import Jumbotron from "../components/Jumbotron"
import features from "../lib/frontend/data/features"
import Image from "next/image"

const Home: FC = () => {
    return (
        <Container fluid className="Home">
            <Header />
            <Jumbotron />
            <div id="about">
                <div className="center-container">
                    <h2 className="about-text dynamic-color">About</h2>
                </div>
                {features.map((feature, index) => {
                    return (
                        <Feature
                            key={index}
                            feature={feature}
                            layout={index % 2 === 0 ? "left" : "right"}
                        />
                    )
                })}
            </div>
            <Contact />
            <Row className="home-footer">
                <Col className="center-container" lg={4}>
                    <Image
                        src={require("../public/images/Github_Logo.png")}
                        alt="Github Logo"
                        height={40}
                        width={40}
                        className="shadow pointer"
                        onClick={() =>
                            window.open(
                                "https://github.com/Raamzeez/IntelliSlides",
                                "_blank"
                            )
                        }
                    />
                </Col>
                <Col className="center-container" lg={4}>
                    <p className="home-footer-text">IntelliSlides 2023</p>
                </Col>
                <Col className="center-container" lg={4}>
                    <Image
                        src={require("../public/images/Rcos_Logo.png")}
                        alt="Github Logo"
                        height={40}
                        width={40}
                        className="shadow pointer"
                        onClick={() =>
                            window.open(
                                "https://new.rcos.io/projects/intellislides?semester=202305",
                                "_blank"
                            )
                        }
                    />
                </Col>
            </Row>
        </Container>
    )
}

export default Home
