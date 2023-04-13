import React, { ChangeEvent, FC, useState } from "react"

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
        <div className="center-row">
            <p style={{ fontSize: 15, marginRight: 12, marginTop: 12 }}>
                Slide Count{" "}
                <span style={{ fontSize: 10, color: "lightgrey" }}>
                    (excluding title slide)
                </span>
            </p>
            <input
                type="number"
                className={`number-input ${clicked ? "input" : ""}`}
                value={value}
                onChange={onChangeHandler}
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
