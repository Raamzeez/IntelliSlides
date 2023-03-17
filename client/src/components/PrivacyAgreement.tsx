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
                    backgroundColor: "rgb(70, 70, 90)",
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
                            given a valid user id
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
                </div>
            </div>
            <Button
                type="primary"
                value="Agree"
                style={{ marginTop: 15 }}
                onClickHandler={onAgreeHandler}
            />
        </>
    )
}

export default PrivacyAgreement
