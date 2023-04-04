import React, { FC } from "react"
import Image from "next/image"
import { Container } from "react-bootstrap"
import Button from "../components/Button"
import Line from "../components/Line"

const PrivacyPolicy: FC = () => {
    const onContinueHandler = () => {
        // navigate(-1)
    }

    return (
        <Container fluid className="App">
            <Image
                alt="IntelliSlides Banner Logo"
                src={require("../public/images/IntelliSlidesBannerTransparent.png")}
                style={{
                    height: 75,
                    width: 280,
                }}
                className="animate__animated animate__fadeIn"
            />
            <h5 style={{ color: "grey", marginBottom: 25 }}>Privacy Policy:</h5>
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
                    Last Updated: 4/1/23
                </p>
                <h5 style={{ marginLeft: "10%", marginTop: 3 }}>
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
                            given a valid id. All information is securely stored
                            and private.
                        </span>
                    </p>
                    <ul>
                        <li>Email</li>
                        <li>First Name</li>
                        <li>Last Name</li>
                        <li>Refresh Token</li>
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
                        Presentation Form Data -{" "}
                        <span style={{ textDecoration: "underline" }}>
                            This is information related to the text and number
                            input fields that you fill out to create a
                            presentation. All of these fields with the exception
                            of "Category" are stored securely and privately in
                            our MongoDB backend database when a presentation is
                            created successfully.
                        </span>
                    </p>
                    <ul>
                        <li>Topic - Stored in database</li>
                        <li>Category</li>
                        <li>Title - Stored in database</li>
                        <li>Subtitle - Stored in database</li>
                        <li>Slide Count - Stored in database</li>
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
                    IntelliSlides utilizes a few major third party services to
                    enable it's powerful capabilities.
                </p>
                <ul
                    style={{
                        marginTop: 10,
                        marginLeft: "15%",
                        width: "70%",
                        fontSize: 12,
                    }}
                >
                    <li>
                        <span style={{ fontWeight: "bold" }}>
                            Google Analytics
                        </span>{" "}
                        - We use Google Analytics to collect data that will help
                        us improve the UI/UX of the application, thus making it
                        grow over time. Different data points that we collect
                        with Google Analytics includes but is not limited to:
                        Number of users who visit the site, countries from which
                        users visit the site, the number of views, and the
                        number of sessions involving the site. Monitoring this
                        will allow us to see the impact our changes to the
                        website has to our users, and to see if we need to
                        improve or redact changes.
                    </li>
                    <li style={{ marginTop: 10 }}>
                        <span style={{ fontWeight: "bold" }}>OpenAI API</span> -
                        We use the official API provided by OpenAI to gather
                        data regarding the slides. More specifically, we use the
                        GPT3 language model to gather a certain number of
                        important details given the topic of your presentation,
                        and then get a certain number of even more specific
                        details to put onto each slide.
                    </li>
                    <li style={{ marginTop: 10 }}>
                        <span style={{ fontWeight: "bold" }}>
                            Google Slides API
                        </span>{" "}
                        - We use the official API provided by Google Slides to
                        create the presentation for the user given the
                        information obtained for the slides with the OpenAI API.
                    </li>
                </ul>
                <Line />
                <h5 style={{ marginLeft: "10%", marginTop: 5 }}>
                    Data Sharing:
                </h5>
                <p
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    IntelliSlides utilizes a strict data sharing policy to
                    protect our users. We do not share any other data with third
                    party services with the exception of Google Analytics,
                    OpenAI, and Google Slides. How and what information we share
                    with these services was discussed in the "Third-Party
                    Services section of the privacy policy. We do not utilize
                    any cookies, which means there will be no tracking of
                    browsing activity which can be used for targeted
                    advertisements like other websites do.
                </p>
                <h5 style={{ marginLeft: "10%", marginTop: 5 }}>Security</h5>
                <p
                    style={{
                        marginLeft: "15%",
                        width: "70%",
                        marginTop: 20,
                        fontSize: 12,
                    }}
                >
                    IntelliSlides uses popular security techniques to ensure the
                    protection of our user's data.
                </p>
                <ol
                    style={{
                        marginTop: 15,
                        marginLeft: "15%",
                        width: "70%",
                        fontSize: 12,
                    }}
                >
                    <li>
                        OAuth 2.0 Protocol - An industry standard protocol for
                        authorization that uses JWT (JSON Web Tokens) for user
                        authentication and authorization. This ensures that user
                        data cannot be tampered with, and that authentication is
                        required for actions to be done, such as creating a
                        presentation.{" "}
                    </li>
                    <li style={{ marginTop: 10 }}>
                        Encryption - Encryption is used to store sensitive data
                        in our database, specifically google refresh tokens,
                        which can be used to obtain access to create Google
                        Slides presentations for the user.
                    </li>
                </ol>
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
                    An IntelliSlides user has the right to add, update, and
                    delete their data.
                </p>
                <ul
                    style={{
                        marginTop: 10,
                        marginLeft: "15%",
                        width: "70%",
                        fontSize: 12,
                    }}
                >
                    <li style={{ fontSize: 17 }}>Add</li>
                    <p>
                        When a user logs into the application for the first
                        time, the relevant data (explained more thoroughly in
                        the "Types of Data Collected" section) is stored in our
                        MongoDB database.
                    </p>
                    <li style={{ fontSize: 17 }}>Update</li>
                    <p>
                        If a user changes their personal information via their
                        Google Account, such as their first name, IntelliSlides
                        will get the updated information from Google on the next
                        login by the user, thus updating the data in our
                        database.
                    </p>
                    <li style={{ fontSize: 17 }}>Delete</li>
                    <p>
                        If a user is logged into the app, they can click the
                        "Delete" button on their profile card. and their google
                        id token is removed from the browser, and their
                        corresponding data is entirely deleted from the MongoDB
                        backend. This is not a reversible process.
                    </p>
                </ul>
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
            <Button
                type="secondary"
                value="Back"
                style={{ margin: 25 }}
                onClickHandler={onContinueHandler}
            />
        </Container>
    )
}

export default PrivacyPolicy
