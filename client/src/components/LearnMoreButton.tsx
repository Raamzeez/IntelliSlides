import React, { FC, useState } from "react"

const LearnMoreButton: FC = () => {
    const [hover, setHover] = useState(false)

    return (
        <div
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
        >
            <p
                style={{
                    fontSize: 15,
                    color: "black",
                    fontWeight: "bold",
                    marginTop: 14,
                }}
                className="poppins"
            >
                Learn More
            </p>
        </div>
    )
}

export default LearnMoreButton
