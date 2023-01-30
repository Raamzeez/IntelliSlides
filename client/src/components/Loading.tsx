import React, { FC } from "react";
// import { ProgressBar } from "react-bootstrap";
import { PacmanLoader } from "react-spinners";
// import Button from "./Button";

interface iProps {
  topic: string;
  title: string;
  onClickHandler: () => void;
}

const Loading: FC<iProps> = ({ topic, title, onClickHandler }) => {
  return (
    <>
      <PacmanLoader
        color={"yellow"}
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
      {/* <ProgressBar now={45} style={{ width: 230, marginTop: 35 }} /> */}
      {/* <div style={{ marginLeft: 52, marginTop: 100 }}>
        <Button
          type="danger"
          value={"Cancel"}
          onClickHandler={onClickHandler}
        />
      </div> */}
    </>
  );
};

export default Loading;
