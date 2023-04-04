import React, { CSSProperties, FC, useState } from "react"

interface iProps {
    value: boolean
    onChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
    style?: CSSProperties
}

const Checkmark: FC<iProps> = ({ value, onChangeHandler, style }) => {
    return (
        <label
            className="container animate__animated animate__fadeIn animate__faster"
            style={style}
        >
            <input type="checkbox" checked={value} onChange={onChangeHandler} />
            <span className="checkmark"></span>
        </label>
    )
}

export default Checkmark
