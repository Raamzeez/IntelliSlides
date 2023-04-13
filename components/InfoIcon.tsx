import React, { CSSProperties, FC } from "react"

interface iProps {
    onClickHandler: any
    style?: CSSProperties
}

const InfoIcon: FC<iProps> = ({ onClickHandler, style }) => {
    return (
        <div
            style={{ ...style }}
            className="pointer center-container info-icon"
            onClick={onClickHandler}
        >
            <p style={{ marginTop: 17, fontSize: 17 }}>i</p>
        </div>
    )
}

export default InfoIcon
