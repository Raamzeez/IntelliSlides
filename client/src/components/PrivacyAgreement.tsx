import React, { FC, useState } from "react"
import Button from "./Button"
import Line from "./Line"

interface iProps {
    onAgreeHandler: () => void
}

const PrivacyAgreement: FC<iProps> = ({ onAgreeHandler }) => {
    return (
        <>
            <h1>Welcome!</h1>
            <h5 style={{ color: "grey", marginBottom: 25 }}>
                Privacy Agreement:
            </h5>
            <div
                style={{
                    height: "70vh",
                    width: "80vw",
                    backgroundColor: "#414152",
                    overflowY: "auto",
                    display: "flex",
                    justifyContent: "left",
                    flexDirection: "column",
                }}
                className="shadow"
            >
                <p
                    style={{
                        marginLeft: "10%",
                        marginTop: "5%",
                        color: "orange",
                        fontSize: 13,
                    }}
                >
                    Last Updated: 3/16/23
                </p>
                <h5 style={{ marginLeft: "10%", marginTop: 5 }}>
                    Introduction:{" "}
                </h5>
                <p
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    Intellislides is committed to protecting the privacy of our
                    users. This privacy policy describes what, how, and where we
                    we collect, use, and protect the personal information of our
                    users when they use our app.
                </p>
                <Line />
                <h5 style={{ marginLeft: "10%", marginTop: 20 }}>
                    Types of Data Collected:
                </h5>
                <div
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    <p style={{ fontSize: 15 }}>
                        User ID -{" "}
                        <span style={{ textDecoration: "underline" }}>
                            This is information that is stored on our backend
                            MongoDB database, and can be associated with a user
                            given a valid id. All information is private and is
                            not visible to the public.
                        </span>
                    </p>
                    <ul>
                        <li>Email</li>
                        <li>First Name</li>
                        <li>Last Name</li>
                        <li>Presentations</li>
                        <ol>
                            <li>Title</li>
                            <li>Subtitle</li>
                            <li>Thumbnail</li>
                            <ol>
                                <li>Image URL</li>
                                <li>Height</li>
                                <li>Width</li>
                            </ol>
                        </ol>
                        <li>Date and Number of Slides</li>
                    </ul>
                    <p style={{ fontSize: 15 }}>
                        App Form Data -{" "}
                        <span style={{ textDecoration: "underline" }}>
                            This is information related to the text and number
                            input fields. It is stored either in the browser
                            with local and session storage, or on our MongoDB
                            backend server.
                        </span>
                    </p>
                    <ul>
                        <li>Topic</li>
                        <li>Category</li>
                        <li>Auto</li>
                        <li>Title</li>
                        <li>Subtitle</li>
                        <li>Slide Count</li>
                    </ul>
                </div>
                <Line />
                <h5 style={{ marginLeft: "10%", marginTop: 5 }}>
                    Third-Party Services:
                    <p
                        style={{
                            marginLeft: "5%",
                            width: "70%",
                            marginTop: 20,
                            fontSize: 12,
                        }}
                    >
                        IntelliSlides utilizes 3 major third party services to
                        enable it's powerful capabilities. We use Google
                        Analytics to keep track of user behavior, such as page
                        visits and mouse clicks. This is used to improve the
                        UI/UX for the application. We use OpenAI to get the
                        information for the presentation slides, and Google
                        Slides to create the presentation for the user.
                    </p>
                </h5>
            </div>
            <Button
                type="success"
                value="Agree"
                style={{ marginTop: 15 }}
                onClickHandler={onAgreeHandler}
            />
        </>
    )
}

export default PrivacyAgreement
