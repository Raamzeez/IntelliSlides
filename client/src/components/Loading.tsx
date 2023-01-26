import React, { FC } from "react";
import { ProgressBar } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
import Button from "./Button";

interface iProps {
  onClickHandler: () => void;
}

const Loading: FC<iProps> = ({ onClickHandler }) => {
  return (
    <div style={{ marginTop: 100 }}>
      <PacmanLoader
        color={"yellow"}
        loading={true}
        size={52}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <h4 style={{ marginTop: "50%" }}>Authenticating User...</h4>
      <ProgressBar now={45} style={{ width: 230, marginTop: 35 }} />
      <div style={{ marginLeft: 52, marginTop: 100 }}>
        <Button
          type="danger"
          value={"Cancel"}
          onClickHandler={onClickHandler}
        />
      </div>
    </div>
  );
};

export default Loading;
