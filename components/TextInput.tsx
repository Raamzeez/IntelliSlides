import React, { ChangeEvent, FC, useState } from "react"
import { Col, Row } from "react-bootstrap"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import InfoIcon from "./InfoIcon"

interface iProps {
    label: string
    value: string
    onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void
    placeholder?: string
    info?: boolean
    onTipClickHandler?: () => void
    disabled?: boolean
    maxLength?: number
    minLength?: number
    pattern?: string
    required?: boolean
}

const TextInput: FC<iProps> = ({
    label,
    value,
    onChangeHandler,
    placeholder,
    info,
    onTipClickHandler,
    disabled,
    maxLength,
    minLength,
    pattern,
    required,
}) => {
    const { width } = useWindowDimensions()

    const [clicked, setClicked] = useState(false)

    return (
        <Row
            style={{
                margin: width > 400 ? 30 : "9.5vw",
                padding: 0,
                flex: 1,
                width: width > 991 ? "40vw" : "80vw",
            }}
        >
            <Col className="center-container" lg={1}>
                {info && (
                    <InfoIcon
                        style={{ position: "absolute" }}
                        onClickHandler={onTipClickHandler}
                    />
                )}
            </Col>
            <Col className="center-container" lg={2}>
                <p className="text-input-label dynamic-color">{label}:</p>
            </Col>
            <Col className="center-container" lg={9}>
                <input
                    type="text"
                    value={value}
                    onChange={onChangeHandler}
                    className={`text-input ${clicked ? "input" : "shadow"}`}
                    placeholder={placeholder}
                    disabled={disabled}
                    maxLength={maxLength}
                    minLength={minLength}
                    pattern={pattern}
                    required={required}
                    onClick={() => setClicked(true)}
                />
            </Col>
        </Row>
    )
}

export default TextInput
