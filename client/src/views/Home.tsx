import React, { FC } from "react"
import { Col, Container, Image, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { TypeAnimation } from "react-type-animation"
import Header from "../components/Header"

const Home: FC = () => {
    const navigate = useNavigate()

    return (
        <Container fluid className="Home">
            <Header />
            <div
                style={{
                    height: "40vh",
                    backgroundColor: "white",
                    width: "100vw",
                    backgroundImage: `url("https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2 className="animate__animated animate__fadeInDown">
                    AI Generated Google Slides Presentations
                </h2>
                <TypeAnimation
                    sequence={[
                        "Your Presentation on WW2", // Types 'One'
                        800, // Waits 1s
                        "Your Presentation on Space X", // Deletes 'One' and types 'Two'
                        800, // Waits 2s
                        "Your Presentation on the iPhone", // Deletes 'One' and types 'Two'
                        800, // Waits 2s
                        "Your Presentation on the Burj Khalifa", // Deletes 'One' and types 'Two'
                        800, // Waits 2s
                        "Your Presentation on Anything in Matters of Seconds", // Types 'Three' without deleting 'Two'
                    ]}
                    wrapper="div"
                    cursor={true}
                    repeat={0}
                    style={{
                        fontSize: 16,
                        color: "white",
                        marginTop: 20,
                    }}
                    className="inter"
                />
            </div>
        </Container>
    )
}

export default Home
