import React, { useState } from "react"
import Button from "../components/Button"
import { Container, Dropdown, DropdownButton, Form } from "react-bootstrap"
import { ToastContainer, toast } from "react-toastify"
import ContactType from "../lib/frontend/types/contactType"
import { useTheme } from "next-themes"
import { ClipLoader } from "react-spinners"
import MenuWrapper from "../components/MenuWrapper"
import api from "../lib/frontend/axios"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircle, faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"

const Contact: React.FC = () => {
    interface iState {
        submit: boolean
        loading: boolean
        error: boolean
        email: string
        message: string
        type: ContactType
    }

    const [state, setState] = useState<iState>({
        submit: false,
        loading: false,
        error: false,
        email: "",
        message: "",
        type: "Technical Issue",
    })

    const { resolvedTheme } = useTheme()

    const submitEmail = async () => {
        setState({...state, submit: true, loading: true})
        const response = await api.post("/contact/sendEmail", {email: state.email, message: state.message, type: state.type})
        if (response.status >= 300 || response.status < 200) {
            console.log("Error sending email")
            toast.error(response.data)
            setState({...state, submit: true, loading: false, error: true})
        } else {
            toast.success("Your email was successfully sent!")
            setState({ ...state, submit: true, loading: false, error: false })
        }
        setTimeout(() => {
            setState({ ...state, submit: false, loading: false, error: false})
        }, 2000)
    }

    return (
        <Container fluid className="Home">
             <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                style={{ fontSize: 13 }}
            />
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
                    type="email"
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
            {!state.submit ? (
                <Button
                    style={{ margin: 30 }}
                    type="success"
                    value="Submit"
                    onClickHandler={submitEmail}
                />
            ) : (
                    state.loading ? (
                        <div style={{margin: 30}}>
                            <ClipLoader
                                color={"dodgerblue"}
                                loading={true}
                                size={35}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            />
                        </div>
                    ) :
                    (
                            state.error ? (
                                <>
                                    <FontAwesomeIcon
                                        icon={faCircleXmark}
                                        size="3x"
                                        color="red"
                                        style={{margin: 30}}
                                    />
                                </> 
                            ): (
                                <>
                                    <FontAwesomeIcon
                                            icon={faCircleCheck}
                                            fontSize={35}
                                            color="#00d173"
                                            style={{margin: 30}}
                                    />
                                </> 
                            )
                    )
            )
        }
            
        </Container>
    )
}

export default Contact
