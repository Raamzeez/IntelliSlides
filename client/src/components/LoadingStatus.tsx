import React, { CSSProperties, FC } from "react";
import { Col, Row } from "react-bootstrap";
import { ClipLoader } from "react-spinners";
import loadingStatuses from "../data/loadingStatuses";
import iError from "../models/error";
import IconStatus from "../types/iconStatus";
import LoadingType from "../types/loading";

interface iProps {
  loadingStatus: LoadingType;
  error: iError | null;
  style?: CSSProperties;
}

interface StatusElementProps {
  text: string;
  status: IconStatus;
}

const StatusElement: FC<StatusElementProps> = ({ text, status }) => {
  return (
    <Row style={{ width: "100%", marginTop: 20 }}>
      <Col style={{}} lg={10}>
        <p style={{ fontSize: 16, fontWeight: 600, marginTop: 8 }}>{text}</p>
      </Col>
      <Col style={{}} lg={2}>
        {status === "loading" && (
          <>
            <div style={{ position: "relative", right: "5vw", top: 2 }}>
              <ClipLoader size={20} color="dodgerblue" />
            </div>
          </>
        )}
        {status === "success" && (
          <>
            <i
              style={{
                fontSize: 16,
                color: "#00d173",
                position: "relative",
                right: "5vw",
                top: -2.5,
              }}
              className="fa-solid fa-circle-check"
            />
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

const LoadingStatus: FC<iProps> = ({ loadingStatus, error, style }) => {
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
            status={getStatus(status.type, loadingStatus, error)}
          />
        );
      })}
    </div>
  );
};

export default LoadingStatus;
