import React, { FC } from "react"
import { Container, Nav, Navbar } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import LaunchButton from "./LaunchButton"

const Header: FC = () => {
    const navigate = useNavigate()

    return (
        <Navbar
            variant="dark"
            style={{ width: "100vw" }}
            className="logoBackground"
        >
            <Container>
                <Navbar.Brand href="/home">
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
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>{" "}
                <Nav className="me-auto">
                    <Nav.Link href="/privacy">Privacy</Nav.Link>
                </Nav>
                <Nav className="mr-auto">
                    <LaunchButton />
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Header
