import React, { FC } from "react";
import Button from "./Button";

interface iProps {
  onClickHandler: () => void;
}

const Success: FC<iProps> = ({ onClickHandler }) => {
  return (
    <>
      <div style={{ marginTop: 100 }}>
        <i
          style={{ fontSize: 130, color: "#00d173" }}
          className="fa-solid fa-circle-check"
        />
        <h1 style={{ marginTop: 15 }}>Success</h1>
        <h5 style={{ marginTop: 30 }}>
          Your Presentation Titled "" Was Created!
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
        <div style={{ marginLeft: 120, marginTop: 100 }}>
          <Button type="primary" value="Home" onClickHandler={onClickHandler} />
        </div>
      </div>
    </>
  );
};

export default Success;
