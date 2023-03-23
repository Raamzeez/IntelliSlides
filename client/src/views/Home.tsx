import React, { FC } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { TypeAnimation } from "react-type-animation"
import Contact from "../components/Contact"
import Feature from "../components/Feature"
import Header from "../components/Header"
import HomeFooter from "../components/HomeFooter"
import Jumbotron from "../components/Jumbotron"
import features from "../data/features"

const Home: FC = () => {
    const navigate = useNavigate()

    return (
        <Container fluid className="Home">
            <Header />
            <Jumbotron />
            {features.map((feature, index) => {
                return (
                    <Feature
                        feature={feature}
                        layout={index % 2 === 0 ? "left" : "right"}
                    />
                )
            })}
            <Contact />
            <HomeFooter />
        </Container>
    )
}

export default Home
