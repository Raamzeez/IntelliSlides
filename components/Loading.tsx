import React, { FC } from "react"
// import { ProgressBar } from "react-bootstrap";
import { GridLoader } from "react-spinners"
import iError from "../lib/frontend/models/error"
import Category from "../lib/frontend/types/category"
import LoadingType from "../lib/frontend/types/loading"
import estimatedTime from "../lib/frontend/util/estimatedTime"
import useWindowDimensions from "../lib/frontend/util/useWindowDimensions"
import LoadingStatus from "./LoadingStatus"
// import Button from "./Button";

interface iProps {
    loadingStatus: LoadingType
    error: iError | null
    topic: string
    title: string
    category: Category
    auto: boolean
    slideCount: number
    onClickHandler: () => void
}

const Loading: FC<iProps> = ({
    loadingStatus,
    error,
    topic,
    title,
    category,
    auto,
    slideCount,
    onClickHandler,
}) => {
    const { height } = useWindowDimensions()

    const loaderSize = () => {
        const adjustedSize = height * 0.05
        if (adjustedSize < 52) {
            return adjustedSize
        }
        return 52
    }

    return (
        <>
            <GridLoader
                color={"aqua"}
                loading={true}
                size={loaderSize()}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <h4 className = "working-on-it"
            style={{ marginTop: "8vh" }}>
                We're Working On It...
            </h4>
            <p className="estimated-time-text">
                Estimated time: {estimatedTime(slideCount)}
            </p>
            <LoadingStatus
                loadingStatus={loadingStatus}
                error={error}
                category={category}
                auto={auto}
            />
        </>
    )
}

export default Loading
