import React, { FC } from "react"

interface iProps {
    label: string
    className: string
    onClickHandler: () => void
}

const ProfileButton: FC<iProps> = ({ label, className, onClickHandler }) => {
    return (
        <div
            className={`pointer center-container profile-button ${className}`}
            onClick={onClickHandler}
        >
            <p className="profile-button-text">{label}</p>
        </div>
    )
}

export default ProfileButton
