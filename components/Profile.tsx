import React, { FC } from "react"
import Image from "next/image"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import ProfileButton from "./ProfileButton"

interface iProps {
    imageURL: string
    email: string
    name: string
    showLogout: boolean
    onLogoutHandler: () => void
    onDeleteHandler: () => void
}

const Profile: FC<iProps> = ({
    imageURL,
    email,
    name,
    showLogout,
    onLogoutHandler,
    onDeleteHandler,
}) => {
    const { width } = useWindowDimensions()

    //https://lh3.googleusercontent.com/a/AGNmyxYqPF3P3hCjsq0lcWTgXmal2fHj-vfSyKHnEHbX9w=s96-c

    https: return (
        <div
            className={showLogout ? (width > 992 ? "profile" : "") : ""}
            style={{
                height: showLogout ? (width > 992 ? 197.5 : 170) : 100,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                // ...rightPosition
            }}
        >
            <Image
                alt="Google Profile Picture"
                src={imageURL}
                height={50}
                width={50}
                style={{ borderRadius: 25, marginTop: 10 }}
                className="shadow"
            />
            {width > 992 && <p style={{ fontSize: 10, margin: 10 }}>{email}</p>}
            {showLogout && (
                <>
                    <ProfileButton
                        backgroundColor="orange"
                        hoverBackgroundColor="darkorange"
                        label="Logout"
                        onClickHandler={onLogoutHandler}
                    />
                    <ProfileButton
                        label="Delete"
                        backgroundColor="#d60032"
                        hoverBackgroundColor="darkred"
                        onClickHandler={onDeleteHandler}
                    />
                </>
            )}
        </div>
    )
}

export default Profile
