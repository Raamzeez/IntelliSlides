import React, { FC } from "react"
import { TypeAnimation } from "react-type-animation"
import LearnMoreButton from "./LearnMoreButton"
import JumbotronBackground from "../images/JumbotronBackground.png"

const Jumbotron: FC = () => {
    return (
        <div
            style={{
                height: "88.5vh",
                backgroundColor: "white",
                width: "100vw",
                backgroundImage: `url(${JumbotronBackground})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
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
                style={{
                    fontSize: 16,
                    color: "white",
                    margin: 20,
                }}
                className="inter"
            />
            <LearnMoreButton />
        </div>
    )
}

export default Jumbotron
