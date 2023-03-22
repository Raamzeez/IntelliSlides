import React, { FC, useState } from "react"
import { useNavigate } from "react-router-dom"

const LaunchButton: FC = () => {
    const [hover, setHover] = useState(false)

    const navigate = useNavigate()

    return (
        <div
            style={{
                // height: hover ? 55 : 50,
                // width: hover ? 165 : 150,
                display: "flex",
                alignItems: "center",
                transition: "all 0.3s ease",
            }}
            className="pointer secondary shadow"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={() => navigate("/app")}
        >
            <p
                style={{
                    fontSize: 16,
                    marginTop: 15,
                    marginLeft: 10,
                }}
            >
                Launch App
            </p>
            <i
                className="fa-solid fa-rocket"
                style={{
                    // position: "absolute",
                    right: 15,
                    fontSize: 17,
                    marginRight: 10,
                    marginLeft: 10,
                }}
            />
        </div>
    )
}

export default LaunchButton
