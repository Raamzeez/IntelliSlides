import React, { FC } from "react"
// import { ProgressBar } from "react-bootstrap";
import { GridLoader, PacmanLoader, PropagateLoader } from "react-spinners"
import iError from "../models/error"
import Category from "../types/category"
import LoadingType from "../types/loading"
import LoadingStatus from "./LoadingStatus"
// import Button from "./Button";

interface iProps {
    loadingStatus: LoadingType
    error: iError | null
    topic: string
    title: string
    category: Category
    auto: boolean
    onClickHandler: () => void
}

const Loading: FC<iProps> = ({
    loadingStatus,
    error,
    topic,
    title,
    category,
    auto,
    onClickHandler,
}) => {
    return (
        <>
            <GridLoader
                color={"aqua"}
                loading={true}
                size={52}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            <h4 style={{ position: "relative", top: 100 }}>
                Researching {topic} And Creating "{title}"
            </h4>
            <p
                style={{
                    color: "grey",
                    fontSize: 20,
                    fontStyle: "italic",
                    position: "relative",
                    top: 100,
                }}
            >
                This may several minutes...
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
