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
            className={
                showLogout
                    ? width > 992
                        ? "profile center-column"
                        : "center-column"
                    : "center-column"
            }
            style={{
                height: showLogout ? (width > 992 ? 197.5 : 170) : 100,
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
                        label="Logout"
                        className="logout"
                        onClickHandler={onLogoutHandler}
                    />
                    <ProfileButton
                        label="Delete"
                        className="delete"
                        onClickHandler={onDeleteHandler}
                    />
                </>
            )}
        </div>
    )
}

export default Profile
