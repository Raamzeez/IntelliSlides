import React, { FC } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { TypeAnimation } from "react-type-animation"
import Feature from "../components/Feature"
import Header from "../components/Header"
import Jumbotron from "../components/Jumbotron"

const Home: FC = () => {
    const navigate = useNavigate()

    return (
        <Container fluid className="Home">
            <Header />
            <Jumbotron />
            {/* <Feature /> */}
        </Container>
    )
}

export default Home
