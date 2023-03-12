import React, { FC } from "react"
import { Image } from "react-bootstrap"
import useWindowDimensions from "../util/useWindowDimensions"
import LogoutButton from "./LogoutButton"

interface iProps {
    imageURL: string
    email: string
    name: string
    showLogout: boolean
    onLogoutHandler: () => void
}

const Profile: FC<iProps> = ({
    imageURL,
    email,
    name,
    showLogout,
    onLogoutHandler,
}) => {
    const { width } = useWindowDimensions()

    const rightPosition = {
        position: "absolute",
        right: -30,
    }

    return (
        <div
            className={showLogout ? (width > 650 ? "profile" : "") : ""}
            style={{
                height: showLogout ? (width > 750 ? 157.5 : 130) : 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                // ...rightPosition
            }}
        >
            <Image
                src={imageURL}
                height={50}
                width={50}
                style={{ borderRadius: 25, marginTop: 20 }}
                className="shadow"
            />
            {width > 750 && <p style={{ fontSize: 10, margin: 10 }}>{email}</p>}
            {showLogout && <LogoutButton onClickHandler={onLogoutHandler} />}
        </div>
    )
}

export default Profile
