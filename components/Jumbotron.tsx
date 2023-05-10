import React, { FC } from "react"
import { TypeAnimation } from "react-type-animation"
import JumbotronBackground from "../public/images/JumbotronBackground.png"
import { Nav } from "react-bootstrap"

const Jumbotron: FC = () => {
    return (
        <div
            className="jumbotron"
            style={{
                backgroundImage: `url(${JumbotronBackground.src})`,
            }}
        >
            <h2
                className="animate__animated animate__fadeInDown"
                style={{ margin: 20 }}
            >
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
                    15000,
                ]}
                wrapper="div"
                cursor={true}
                repeat={Infinity}
                className="typewriter-text inter"
            />
            <Nav.Link
                className="learn-more-button pointer shadow"
                href="#about"
            >
                <p className="learn-more-text poppins">Learn More</p>
            </Nav.Link>
        </div>
    )
}

export default Jumbotron
