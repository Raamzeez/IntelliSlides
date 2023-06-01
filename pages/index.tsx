import React, { FC } from "react"
import { Col, Container, Row } from "react-bootstrap"
import Contact from "../components/Contact"
import Feature from "../components/Feature"
import Header from "../components/Header"
import Jumbotron from "../components/Jumbotron"
import features from "../lib/frontend/data/features"

const Home: FC = () => {
    return (
        <Container fluid className="Home">
            <Header />
            <Jumbotron />
            <div id="about">
                <div className="center-container">
                    <h2 className="about-text">About</h2>
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
                <Col className="center-container">
                    <p className="home-footer-text">IntelliSlides 2023</p>
                    <div>
                    <a className="logos" href="https://github.com/Raamzeez/IntelliSlides"  target="_blank"><img src={"images/git.png"} height="25" /></a>

                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Home
