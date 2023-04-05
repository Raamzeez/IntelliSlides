import React, { FC, useState } from "react"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRocket } from "@fortawesome/free-solid-svg-icons"

const LaunchButton: FC = () => {
    const { width } = useWindowDimensions()

    const threshold = 431

    const [hover, setHover] = useState(false)

    return (
        <div
            style={
                width > 380
                    ? {
                          // height: hover ? 55 : 50,
                          // width: hover ? 165 : 150,
                          display: "flex",
                          alignItems: "center",
                          transition: "all 0.3s ease",
                      }
                    : {
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          height: 40,
                          width: 40,
                          borderRadius: 15,
                      }
            }
            className={`pointer secondary ${hover && "shadow"}`}
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            // onClick={() => navigate("/app")}
        >
            {width > 380 ? (
                <p
                    style={{
                        fontSize: 16,
                        marginTop: 15,
                        margin: 10,
                    }}
                >
                    {width > threshold ? "Launch App" : "Launch"}
                </p>
            ) : (
                <></>
            )}
            {(width > threshold || width < 380) && (
                <FontAwesomeIcon
                    icon={faRocket}
                    style={{
                        // position: "absolute",
                        right: 15,
                        fontSize: 17,
                        marginRight: 10,
                        marginLeft: 10,
                    }}
                />
            )}
        </div>
    )
}

export default LaunchButton
