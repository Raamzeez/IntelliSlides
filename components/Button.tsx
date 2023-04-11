import React, { CSSProperties, FC, useState } from "react"

interface iProps {
    onClickHandler: () => void
    type: "success" | "danger" | "primary" | "secondary"
    value: string
    disabled?: boolean
    className?: string
    style?: CSSProperties
    textStyle?: CSSProperties
}

const Button: FC<iProps> = ({
    onClickHandler,
    type,
    value,
    disabled,
    className,
    style,
    textStyle,
}) => {
    return (
        <div
            className={`${
                type === "success"
                    ? "submit"
                    : type === "danger"
                    ? "cancel"
                    : type === "primary"
                    ? "primary"
                    : "secondary"
            } ${disabled ? "" : "pointer"} ${className}`}
            style={{
                height: 45,
                width: 120,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                opacity: disabled ? 0.35 : 1,
                ...style,
            }}
            onClick={disabled ? () => null : onClickHandler}
        >
            <p style={{ fontSize: 17, marginTop: 13, ...textStyle }}>{value}</p>
        </div>
    )
}

export default Button
