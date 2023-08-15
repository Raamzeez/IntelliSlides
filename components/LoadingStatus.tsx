import {
    faCircleCheck,
    faCircleMinus,
    faCircleXmark,
} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { CSSProperties, FC } from "react"
import { Col, Row } from "react-bootstrap"
import ContentLoader from "react-content-loader"
import { ClipLoader } from "react-spinners"
import loadingStatuses from "../lib/frontend/data/loadingStatuses"
import iError from "../lib/frontend/models/error"
import Category from "../lib/frontend/types/category"
import IconStatus from "../lib/frontend/types/iconStatus"
import LoadingType from "../lib/frontend/types/loading"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import getStatus from "../lib/frontend/util/getStatus"

interface iProps {
    loadingStatus: LoadingType
    error: iError | null
    category: Category
    auto: boolean
    style?: CSSProperties
}

interface StatusElementProps {
    text: string
    loadingStatus: LoadingType
    category: Category
    status: IconStatus
    contentLoader: boolean
}

const StatusElement: FC<StatusElementProps> = ({
    text,
    loadingStatus,
    status,
    category,
    contentLoader,
}) => {
    const { width } = useWindowDimensions()

    return (
        <Row style={{ width: "100%", margin: 20 }}>
            <Col
                style={
                    width < 992
                        ? {
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                          }
                        : {}
                }
                lg={10}
            >
                <p
                    style={{
                        fontSize: width < 850 ? 12 : 16,
                        fontWeight: 600,
                        marginTop: 15,
                    }}
                >
                    {text}
                </p>
            </Col>
            <Col
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
                lg={2}
            >
                {status === "loading" && !contentLoader && (
                    <>
                        <div>
                            <ClipLoader size={20} color="dodgerblue" />
                        </div>
                    </>
                )}
                {status === "loading" && contentLoader && (
                    <>
                        <ContentLoader
                            speed={2}
                            width={97}
                            height={50}
                            viewBox="0 0 500 160"
                            backgroundColor="black"
                            foregroundColor="dodgerblue"
                            style={{ position: "absolute" }}
                        >
                            <rect
                                x="80"
                                y="20"
                                rx="3"
                                ry="3"
                                width="600"
                                height="120"
                            />
                        </ContentLoader>
                    </>
                )}
                {status === "success" &&
                    loadingStatus !== "FetchingCategory" && (
                        <>
                            <FontAwesomeIcon
                                icon={faCircleCheck}
                                style={{
                                    fontSize: 16,
                                    color: "#00d173",
                                }}
                                className="animate__animated animate__fadeIn"
                            />
                        </>
                    )}
                {status === "success" &&
                    loadingStatus === "FetchingCategory" && (
                        <>
                            <p
                                style={{
                                    fontSize: 17,
                                    color: "orange",
                                }}
                            >
                                {category}
                            </p>
                        </>
                    )}
                {status === "hold" && (
                    <>
                        <FontAwesomeIcon
                            icon={faCircleMinus}
                            style={{ fontSize: 16, color: "grey" }}
                        />
                    </>
                )}
                {status === "error" && (
                    <>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            style={{
                                fontSize: 16,
                                color: "red",
                                position: "relative",
                                right: "5vw",
                                top: -2.5,
                            }}
                        />
                    </>
                )}
            </Col>
        </Row>
    )
}

const LoadingStatus: FC<iProps> = ({
    loadingStatus,
    error,
    category,
    auto,
    style,
}) => {
    const { height, width } = useWindowDimensions()

    return (
        <>
            <div
                style={{
                    borderRadius: 20,
                    position:
                        width < 850 || height < 600 ? "relative" : "absolute",
                    right: width < 850 || height < 600 ? 0 : 50,
                    border: "none",
                    flexDirection:
                        width < 850 || height < 600 ? "row" : "column",
                    ...style,
                }}
                className="center-container animate__animated animate__fadeInRight animate__fast loading-status"
            >
                {width > 600 &&
                    height > 500 &&
                    loadingStatuses.map((status, index) => {
                        return (
                            <StatusElement
                                key={index}
                                text={status.message}
                                loadingStatus={status.type}
                                category={category}
                                status={getStatus(
                                    status.type,
                                    loadingStatus,
                                    error
                                )}
                                contentLoader={status.contentLoader}
                            />
                        )
                    })}
            </div>
        </>
    )
}

export default LoadingStatus
