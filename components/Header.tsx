import React, { FC } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import Image from "next/image"
import LaunchButton from "./LaunchButton"

const Header: FC = () => {
    return (
        <Navbar
            variant="dark"
            style={{ width: "100vw" }}
            className="logoBackground"
            expand="md"
        >
            <Container>
                <Navbar.Brand href="/">
                    <Image
                        src={require("../public/images/IntelliSlidesBannerTransparent.png")}
                        priority={true}
                        style={{ height: 50, width: 187.5, marginTop: 5 }}
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>{" "}
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto questrial">
                        <Nav.Link href="/privacy">Privacy</Nav.Link>
                        <Nav.Link href="#about">About</Nav.Link>
                        <Nav.Link href="#contact">Contact</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
                <Nav className="mr-auto">
                    <Nav.Link href="/app">
                        <LaunchButton />
                    </Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
