import React, { FC } from "react";
import Button from "./Button";

interface iProps {
  onClickHandler: () => void;
}

const Error: FC<iProps> = ({ onClickHandler }) => {
  return (
    <div style={{ marginTop: 100 }}>
      <i
        style={{ fontSize: 130, color: "#eb2149" }}
        className="animate__animated animate__fadeInDown fa-solid fa-circle-xmark"
      />
      <h1 style={{ marginTop: 15 }}>Error</h1>
      <h5 style={{ marginTop: 30 }}>
        Oops! Looks like there was an issue with our servers!
      </h5>
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
    </div>
  );
};

export default Error;
