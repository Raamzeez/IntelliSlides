import React, { FC } from "react";
import Button from "./Button";

interface iProps {
  title: string;
  onClickHandler: () => void;
}

const Success: FC<iProps> = ({ title, onClickHandler }) => {
  return (
    <>
      <div style={{ marginTop: 100 }}>
        <i
          style={{ fontSize: 130, color: "#00d173" }}
          className="animate__animated animate__fadeInDown fa-solid fa-circle-check"
        />
        <h1 style={{ marginTop: 15 }}>Success</h1>
        <h5 style={{ marginTop: 30 }}>
          Your Presentation "{title}" Was Created!
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
        <Button
          type="primary"
          value="Home"
          onClickHandler={onClickHandler}
          className="animate__animated animate__fadeIn"
          style={{ position: "relative", left: 95 }}
        />
      </div>
    </>
  );
};

export default Success;
