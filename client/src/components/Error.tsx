import React, { FC } from "react";
import iError from "../models/error";
import Category from "../types/category";
import LoadingType from "../types/loading";
import Button from "./Button";
import LoadingStatus from "./LoadingStatus";

interface iProps {
  loadingStatus: LoadingType;
  error: iError | null;
  category: Category;
  auto: boolean;
  onClickHandler: () => void;
}

const Error: FC<iProps> = ({
  loadingStatus,
  error,
  category,
  auto,
  onClickHandler,
}) => {
  return (
    <div style={{ marginTop: 100 }}>
      <i
        style={{ fontSize: 130, color: "#eb2149" }}
        className="animate__animated animate__fadeInDown fa-solid fa-circle-xmark"
      />
      <h1 style={{ marginTop: 15 }}>Error</h1>
      <h5 style={{ marginTop: 30 }}>{error?.message}</h5>
      {/* <Card
            style={{
              height: 250,
              width: 300,
              marginTop: 50,
              marginLeft: 32.5,
              backgroundColor: "rgb(50, 50, 50)",
            }}
            className="shadow"
          ></Card> */}
      <div
        className="animate__animated animate__fadeIn"
        style={{ marginLeft: 175, marginTop: 100 }}
      >
        <Button type="primary" value="Home" onClickHandler={onClickHandler} />
      </div>
      <LoadingStatus
        loadingStatus={loadingStatus}
        error={error}
        category={category}
        auto={auto}
        style={{ top: 0, right: 0 }}
      />
    </div>
  );
};

export default Error;
