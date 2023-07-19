import React, { useState } from "react"
import Button from "../components/Button"
import { Container, Dropdown, DropdownButton, Form } from "react-bootstrap"
import ContactType from "../lib/frontend/types/contactType"
import { useTheme } from "next-themes"
import MenuWrapper from "../components/MenuWrapper"

const Contact: React.FC = () => {
    interface iState {
        email: string
        message: string
        type: ContactType
    }

    const [state, setState] = useState<iState>({
        email: "",
        message: "",
        type: "Technical Issue",
    })

    const { resolvedTheme } = useTheme()

    return (
        <Container fluid className="Home">
            <MenuWrapper />
            <h1 className="dynamic-color" style={{ marginTop: 25 }}>
                Contact
            </h1>
            <p className="dynamic-color" style={{ marginTop: 25 }}>
                Email: intellislides.contact@gmail.com
            </p>
            <div
                style={{ height: "60vh", width: "60vw", marginTop: 25 }}
                className="shadow center-column"
            >
                <p className="text-input-label dynamic-color">Email</p>
                <input
                    style={{ height: 50, width: "40vw" }}
                    type="text"
                    value={state.email}
                    onChange={(e) =>
                        setState({ ...state, email: e.target.value })
                    }
                    className={`text-input input`}
                    placeholder={"Enter your email here"}
                    // disabled={disabled}
                    // maxLength={maxLength}
                    // minLength={minLength}
                    // pattern={pattern}
                    // required={required}
                    // onClick={() => setClicked(true)}
                />
                <DropdownButton
                    key={"primary"}
                    title={state.type}
                    onSelect={(value) =>
                        setState({
                            ...state,
                            type: value as ContactType,
                        })
                    }
                    style={{ margin: 30 }}
                >
                    {["Technical Issue", "Feature Request", "Other"].map(
                        (issue, index) => {
                            return (
                                <Dropdown.Item
                                    key={index}
                                    eventKey={issue}
                                    onClick={(e) =>
                                        setState({
                                            ...state,
                                            type: (
                                                e.target as HTMLButtonElement
                                            ).innerHTML as ContactType,
                                        })
                                    }
                                    style={{
                                        color:
                                            resolvedTheme === "light"
                                                ? "black"
                                                : "white",
                                    }}
                                >
                                    {issue}
                                </Dropdown.Item>
                            )
                        }
                    )}
                </DropdownButton>
                <p className="text-input-label dynamic-color">Message</p>
                <textarea
                    style={{
                        border: "none",
                        height: "30vh",
                        width: "50vw",
                        marginBottom: 50,
                    }}
                    value={state.message}
                    onChange={(e) =>
                        setState({ ...state, message: e.target.value })
                    }
                    className="shadow"
                    rows={7}
                    cols={50}
                ></textarea>
            </div>
            <Button
                style={{ margin: 30 }}
                type="success"
                value="Submit"
                onClickHandler={() => null}
            />
        </Container>
    )
}

export default Contact
