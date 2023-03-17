import React, { FC, useState } from "react"
import { Col, Row } from "react-bootstrap"
import Button from "./Button"
import Checkmark from "./Checkmark"
import Line from "./Line"

interface iProps {
    onAgreeHandler: () => void
}

const PrivacyAgreement: FC<iProps> = ({ onAgreeHandler }) => {
    const [read, setRead] = useState(false)

    return (
        <>
            <h2
                style={{
                    color: "white",
                    fontWeight: 500,
                    transition: "all 0.5s ease",
                    marginTop: 30,
                }}
                className="animate__animated animate__fadeIn animate__slow"
            >
                {/* GPT3 Presentations< */}
                IntelliSlides
            </h2>
            {/* <h1>Welcome!</h1> */}
            <h5 style={{ color: "grey", marginBottom: 25 }}>
                Privacy Agreement:
            </h5>
            <div
                style={{
                    height: "60vh",
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
                        color: "skyblue",
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
                </h5>
                <p
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    IntelliSlides utilizes 3 major third party services to
                    enable it's powerful capabilities. We use Google Analytics
                    to keep track of user behavior, such as page visits and
                    mouse clicks. This is used to improve the UI/UX for the
                    application. We use OpenAI to get the information for the
                    presentation slides, and Google Slides to create the
                    presentation for the user.
                </p>
                <Line />
                <h5 style={{ marginLeft: "10%", marginTop: 5 }}>User Rights</h5>
                <p
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    An IntelliSlides user has the right to delete their data
                    whenever they want to. Clicking the delete button when they
                    are logged in from the app will remove their google id token
                    credentials from the browser, and their record from our
                    database.
                </p>
                <h5 style={{ marginLeft: "10%", marginTop: 5 }}>
                    Legal Compliance
                </h5>
                <p
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    IntelliSlides complies with relevant data privacy
                    regulations, including the General Data Protection
                    Regulation (GDPR) and the California Consumer Privacy Act
                    (CCPA).
                </p>
                <h5 style={{ marginLeft: "10%", marginTop: 5 }}>Updates</h5>
                <p
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    We may update this Privacy Policy from time to time, and any
                    updates will be posted on our website. We'll let you know
                    with a notification that will pop up the next time you visit
                    the website if the privacy policy has changed. Contact us if
                    you have any questions or concerns about this privacy policy
                    or our data practices. You can reach us via email at
                    <span
                        style={{
                            color: "dodgerblue",
                            textDecoration: "underline",
                            marginLeft: 5,
                        }}
                        className="pointer"
                        onClick={() =>
                            window.open(
                                "https://mail.google.com/mail/?view=cm&fs=1&to=intellislides.contact@gmail.com",
                                "_blank"
                            )
                        }
                    >
                        intellislides.contact@gmail.com
                    </span>
                </p>
            </div>
            {localStorage.getItem("showAgreement") !== "false" ? (
                <>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "row",
                            marginTop: 5,
                        }}
                    >
                        <Checkmark
                            value={read}
                            onChangeHandler={(e) => setRead(!read)}
                            style={{ marginTop: 20 }}
                        />
                        <p style={{ fontSize: 10, marginTop: 12 }}>
                            I hereby attest that I have read and understood the
                            privacy policy
                        </p>
                    </div>
                    <Button
                        type="success"
                        value="Agree"
                        style={{ margin: 25 }}
                        onClickHandler={onAgreeHandler}
                        disabled={!read}
                    />
                </>
            ) : (
                <>
                    <Button
                        type="primary"
                        value="Continue"
                        style={{ margin: 25 }}
                        onClickHandler={onAgreeHandler}
                    />
                </>
            )}
        </>
    )
}

export default PrivacyAgreement
