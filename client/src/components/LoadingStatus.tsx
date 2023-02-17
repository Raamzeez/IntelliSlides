import React, { CSSProperties, FC } from "react";
import { Col, Row } from "react-bootstrap";
import ContentLoader from "react-content-loader";
import { ClipLoader } from "react-spinners";
import loadingStatuses from "../data/loadingStatuses";
import iError from "../models/error";
import Category from "../types/category";
import IconStatus from "../types/iconStatus";
import LoadingType from "../types/loading";

interface iProps {
  loadingStatus: LoadingType;
  error: iError | null;
  category: Category;
  auto: boolean;
  style?: CSSProperties;
}

interface StatusElementProps {
  text: string;
  loadingStatus: LoadingType;
  category: Category;
  status: IconStatus;
  contentLoader: boolean;
}

const StatusElement: FC<StatusElementProps> = ({
  text,
  loadingStatus,
  status,
  category,
  contentLoader,
}) => {
  return (
    <Row style={{ width: "100%", marginTop: 20 }}>
      <Col style={{}} lg={10}>
        <p style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>{text}</p>
      </Col>
      <Col style={{}} lg={2}>
        {status === "loading" && !contentLoader && (
          <>
            <div style={{ position: "relative", right: "5vw", top: 2 }}>
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
              style={{
                // backgroundColor: "blue",
                position: "relative",
                right: 80,
              }}
            >
              <rect x="80" y="0" rx="3" ry="3" width="800" height="140" />
            </ContentLoader>
          </>
        )}
        {status === "success" && loadingStatus !== "FetchingCategory" && (
          <>
            <i
              style={{
                fontSize: 16,
                color: "#00d173",
                position: "relative",
                right: "5vw",
                top: -2.5,
              }}
              className="fa-solid fa-circle-check animate__animated animate__fadeIn"
            />
          </>
        )}
        {status === "success" && loadingStatus === "FetchingCategory" && (
          <>
            <p
              style={{
                position: "relative",
                right: 62,
                top: 9,
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
                position: "relative",
                right: "5vw",
                top: -2.5,
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
  );
};

const getStatus = (
  status: LoadingType,
  loadingStatus: LoadingType,
  error: iError | null
) => {
  if (error && loadingStatus === status) {
    return "error";
  }
  if (loadingStatus === status) {
    return "loading";
  }
  let loadingStatusIndex = 0;
  let statusIndex = 0;
  loadingStatuses.forEach((obj, index) => {
    if (obj.type === loadingStatus) {
      loadingStatusIndex = index;
    }
    if (obj.type === status) {
      statusIndex = index;
    }
  });
  if (loadingStatusIndex > statusIndex) {
    return "success";
  }
  return "hold";
};

const LoadingStatus: FC<iProps> = ({
  loadingStatus,
  error,
  category,
  auto,
  style,
}) => {
  console.log("loadingStatus", loadingStatus);
  console.log("error", error);

  return (
    <div
      style={{
        height: "100vh",
        width: "25vw",
        borderRadius: 20,
        position: "absolute",
        right: 50,
        border: "none",
        // backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        ...style,
      }}
      className="animate__animated animate__fadeInRight animate__fast"
    >
      {loadingStatuses.map((status) => {
        return (
          <StatusElement
            text={status.message}
            loadingStatus={status.type}
            category={category}
            status={getStatus(status.type, loadingStatus, error)}
            contentLoader={status.contentLoader}
          />
        );
      })}
    </div>
  );
};

export default LoadingStatus;
