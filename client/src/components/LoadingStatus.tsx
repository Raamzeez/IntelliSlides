import React, { CSSProperties, FC } from "react"
import { Col, Row } from "react-bootstrap"
import ContentLoader from "react-content-loader"
import { ClipLoader } from "react-spinners"
import loadingStatuses from "../data/loadingStatuses"
import iError from "../models/error"
import Category from "../types/category"
import IconStatus from "../types/iconStatus"
import LoadingType from "../types/loading"
import useWindowDimensions from "../util/useWindowDimensions"

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
                            <i
                                style={{
                                    fontSize: 16,
                                    color: "#00d173",
                                }}
                                className="fa-solid fa-circle-check animate__animated animate__fadeIn"
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
                        <i
                            style={{
                                fontSize: 16,
                                color: "grey",
                            }}
                            className="fa-solid fa-circle-minus"
                        />
                    </>
                )}
                {status === "error" && (
                    <>
                        <i
                            style={{
                                fontSize: 16,
                                color: "red",
                                position: "relative",
                                right: "5vw",
                                top: -2.5,
                            }}
                            className="fa-solid fa-circle-xmark"
                        />
                    </>
                )}
            </Col>
        </Row>
    )
}

const getStatus = (
    status: LoadingType,
    loadingStatus: LoadingType,
    error: iError | null
) => {
    if (error && loadingStatus === status) {
        return "error"
    }
    if (loadingStatus === status) {
        return "loading"
    }
    let loadingStatusIndex = 0
    let statusIndex = 0
    loadingStatuses.forEach((obj, index) => {
        if (obj.type === loadingStatus) {
            loadingStatusIndex = index
        }
        if (obj.type === status) {
            statusIndex = index
        }
    })
    if (loadingStatusIndex > statusIndex) {
        return "success"
    }
    return "hold"
}

const LoadingStatus: FC<iProps> = ({
    loadingStatus,
    error,
    category,
    auto,
    style,
}) => {
    console.log("loadingStatus", loadingStatus)
    console.log("error", error)

    const { height, width } = useWindowDimensions()

    return (
        <div
            style={{
                borderRadius: 20,
                position: width < 850 || height < 600 ? "relative" : "absolute",
                right: width < 850 || height < 600 ? 0 : 50,
                border: "none",
                // backgroundColor: "red",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: width < 850 || height < 600 ? "row" : "column",
                ...style,
            }}
            className="animate__animated animate__fadeInRight animate__fast"
        >
            {width > 500 ? (
                loadingStatuses.map((status) => {
                    return (
                        <StatusElement
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
                })
            ) : (
                <></>
            )}
        </div>
    )
}

export default LoadingStatus
