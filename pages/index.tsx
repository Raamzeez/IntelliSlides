import React, { FC } from "react"
import { Container } from "react-bootstrap"
import Contact from "../components/Contact"
import Feature from "../components/Feature"
import Header from "../components/Header"
import HomeFooter from "../components/HomeFooter"
import Jumbotron from "../components/Jumbotron"
import features from "../lib/frontend/data/features"

const Home: FC = () => {
    return (
        <Container fluid className="Home">
            <Header />
            <Jumbotron />
            <div id="about">
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
            <HomeFooter />
        </Container>
    )
}

export default Home
