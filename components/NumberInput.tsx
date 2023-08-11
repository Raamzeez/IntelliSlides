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
            <p className="text-input-label dynamic-color">
                Slide Count{" "}
                <span className="text-input-caption">
                    (excluding title slide)
                </span>
            </p>
            <input
                type="number"
                className={`number-input shadow ${clicked ? "input" : ""}`}
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
