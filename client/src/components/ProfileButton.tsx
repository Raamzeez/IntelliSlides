import React, { FC, CSSProperties, useState } from "react"

interface iProps {
    label: string
    backgroundColor: string
    hoverBackgroundColor: string
    onClickHandler: () => void
    style?: CSSProperties
}

const ProfileButton: FC<iProps> = ({
    label,
    backgroundColor,
    hoverBackgroundColor,
    onClickHandler,
    style,
}) => {
    const [hover, setHover] = useState(false)

    return (
        <div
            style={{
                height: 30,
                width: 100,
                borderRadius: 7,
                backgroundColor: hover ? hoverBackgroundColor : backgroundColor,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: 10,
                ...style,
            }}
            className="pointer"
            onMouseOver={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            onClick={onClickHandler}
        >
            <p style={{ fontSize: 12, marginTop: 18 }}>{label}</p>
        </div>
    )
}

export default ProfileButton
