import React, { FC, useState } from "react"
import { Nav } from "react-bootstrap"

const LearnMoreButton: FC = () => {
    const [hover, setHover] = useState(false)

    return (
        <Nav.Link
            style={{
                marginTop: 50,
                height: 40,
                width: 150,
                borderRadius: 20,
                backgroundColor: hover ? "lightgrey" : "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transition: "0.3s ease",
            }}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            className="pointer shadow"
            href="#about"
        >
            <p
                style={{
                    fontSize: 15,
                    color: "black",
                    marginTop: 14,
                }}
                className="poppins"
            >
                Learn More
            </p>
        </Nav.Link>
    )
}

export default LearnMoreButton
