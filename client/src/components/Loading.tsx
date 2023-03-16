import React, { FC } from "react"
// import { ProgressBar } from "react-bootstrap";
import { GridLoader, PacmanLoader, PropagateLoader } from "react-spinners"
import iError from "../models/error"
import Category from "../types/category"
import LoadingType from "../types/loading"
import estimatedTime from "../util/estimatedTime"
import useWindowDimensions from "../util/useWindowDimensions"
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
    const { height, width } = useWindowDimensions()

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
            <h4 style={{ marginTop: "8vh" }}>
                Researching {topic} And Creating "{title}"
            </h4>
            <p
                style={{
                    color: "grey",
                    fontSize: 20,
                    fontStyle: "italic",
                    marginTop: 0,
                }}
            >
                Estimated time: {estimatedTime(slideCount)}
            </p>
            <LoadingStatus
                loadingStatus={loadingStatus}
                error={error}
                category={category}
                auto={auto}
            />
            {/* <ProgressBar now={45} style={{ width: 230, marginTop: 35 }} /> */}
            {/* <div style={{ marginLeft: 52, marginTop: 100 }}>
        <Button
          type="danger"
          value={"Cancel"}
          onClickHandler={onClickHandler}
        />
      </div> */}
        </>
    )
}

export default Loading
