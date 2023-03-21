import React, { ChangeEvent, FC, useState } from "react"
import useWindowDimensions from "../util/useWindowDimensions"

interface iProps {
    value: number
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    disabled?: boolean
    min?: number
    max?: number
    maxLength?: number
    minLength?: number
    pattern?: string
    required?: boolean
}

const NumberInput: FC<iProps> = ({
    value,
    onChangeHandler,
    disabled,
    min,
    max,
    maxLength,
    minLength,
    pattern,
    required,
}) => {
    const [clicked, setClicked] = useState(false)

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <p style={{ fontSize: 15, marginRight: 12, marginTop: 12 }}>
                Slide Count{" "}
                <span style={{ fontSize: 10, color: "lightgrey" }}>
                    (excluding title slide)
                </span>
            </p>
            <input
                type="number"
                className={clicked ? "input" : ""}
                value={value}
                onChange={onChangeHandler}
                style={{
                    height: 30,
                    width: 60,
                    border: "none",
                    backgroundColor: "rgb(64, 65, 78)",
                    color: "white",
                    fontSize: 15,
                    paddingLeft: 10,
                }}
                min={min}
                max={max}
                disabled={disabled}
                maxLength={maxLength}
                minLength={minLength}
                pattern={pattern}
                required={required}
                onClick={() => setClicked(true)}
            />
        </div>
    )
}

export default NumberInput
