import React, { FC, useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"

const LearnMoreButton: FC = () => {
    const navigate = useNavigate()

    const [hover, setHover] = useState(false)

    return (
        <Link
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
            to={"#about"}
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
        </Link>
    )
}

export default LearnMoreButton
