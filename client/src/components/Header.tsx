import React, { FC } from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import LaunchButton from "./LaunchButton"

const Header: FC = () => {
    const navigate = useNavigate()

    return (
        <Navbar
            variant="dark"
            style={{ width: "100vw" }}
            className="logoBackground"
            expand="md"
        >
            <Container>
                <Navbar.Brand href="/">
                    {/* <img
                        src={require("../images/IntelliSlidesLogo.png")}
                        height={50}
                        width={50}
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    /> */}
                    <img
                        src={require("../images/IntelliSlidesBannerTransparent.png")}
                        height={50}
                        width={187.5}
                        style={{ marginTop: 5 }}
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
                    <LaunchButton />
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
