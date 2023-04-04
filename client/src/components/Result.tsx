import { faCircleCheck, faCircleXmark } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { FC } from "react"
import { Row } from "react-bootstrap"
import Button from "./Button"

interface iProps {
    title: string
    message: string
    presentationId?: string
    onClickHandler: () => void
}

const Result: FC<iProps> = ({
    title,
    message,
    presentationId,
    onClickHandler,
}) => {
    return (
        <>
            <FontAwesomeIcon
                icon={presentationId ? faCircleCheck : faCircleXmark}
                style={{
                    fontSize: 130,
                    color: presentationId ? "#00d173" : "#eb2149",
                }}
                className="animate__animated animate__fadeInDown"
            />
            <h1 style={{ marginTop: 15 }}>{title}</h1>
            <h5 style={{ marginTop: 25, fontWeight: 500 }}>{message}</h5>
            {presentationId && (
                <p
                    style={{
                        fontSize: 13,
                        color: "grey",
                        fontWeight: 400,
                    }}
                >
                    ID: {presentationId}
                </p>
            )}
            <Row>
                <Button
                    type="primary"
                    value="Home"
                    onClickHandler={onClickHandler}
                    className="animate__animated animate__fadeIn"
                    style={{
                        marginTop: 30,
                        marginRight: presentationId ? 50 : 0,
                    }}
                />
                {presentationId && (
                    <Button
                        type="secondary"
                        value="View"
                        onClickHandler={() =>
                            window.open(
                                `https://docs.google.com/presentation/d/${presentationId}/edit#slide=id.p`,
                                "_blank"
                            )
                        }
                        className="animate__animated animate__fadeIn"
                        style={{ marginTop: 30 }}
                    />
                )}
            </Row>
        </>
    )
}

export default Result
