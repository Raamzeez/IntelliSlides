import React, { useEffect, useState } from "react"
import {
    Col,
    Container,
    Dropdown,
    DropdownButton,
    OverlayTrigger,
    Row,
    Tooltip,
} from "react-bootstrap"
import BackArrow from "../components/BackArrow"
import { useTheme } from "next-themes"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons"

const Settings: React.FC = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => setMounted(true), [])

    return (
        <Container fluid className="Home">
            <BackArrow />
            <Row>
                <Col>
                    <h1
                        style={{ marginTop: 30, fontWeight: 300 }}
                        className="dynamic-color"
                    >
                        Settings
                    </h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="settings-container shadow">
                        <Row>
                            <Col lg={4} className="center-container">
                                {mounted && (
                                    <div
                                        className={`sidebar-option ${
                                            theme === "light"
                                                ? "lightPurpleBackground"
                                                : "blueBackground"
                                        } center-container`}
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                theme === "light"
                                                    ? faSun
                                                    : faMoon
                                            }
                                            size="lg"
                                        />
                                    </div>
                                )}
                            </Col>
                            <Col lg={2} className="center-container">
                                <p
                                    className="dynamic-color"
                                    style={{ marginTop: 15 }}
                                >
                                    Theme:
                                </p>
                            </Col>
                            <Col lg={6} className="center-container">
                                <DropdownButton
                                    key={"primary"}
                                    title={
                                        (theme as string)
                                            .charAt(0)
                                            .toUpperCase() +
                                        (theme as string).slice(1)
                                    }
                                    onSelect={(value) =>
                                        setTheme(value as string)
                                    }
                                >
                                    {["light", "dark", "system"].map(
                                        (themeKey) => {
                                            return (
                                                <Dropdown.Item
                                                    key={0}
                                                    eventKey={themeKey}
                                                    onClick={() =>
                                                        setTheme(themeKey)
                                                    }
                                                >
                                                    {themeKey
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        themeKey.slice(1)}
                                                </Dropdown.Item>
                                            )
                                        }
                                    )}
                                </DropdownButton>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Settings
