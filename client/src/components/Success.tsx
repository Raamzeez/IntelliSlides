import React, { FC } from "react";
import Button from "./Button";

interface iProps {
  title: string;
  onClickHandler: () => void;
}

const Success: FC<iProps> = ({ title, onClickHandler }) => {
  return (
    <>
      <i
        style={{ fontSize: 130, color: "#00d173" }}
        className="animate__animated animate__fadeInDown fa-solid fa-circle-check"
      />
      <h1 style={{ marginTop: 15 }}>Success</h1>
      <h5 style={{ marginTop: 0 }}>Your Presentation "{title}" Was Created!</h5>
      <Button
        type="primary"
        value="Home"
        onClickHandler={onClickHandler}
        className="animate__animated animate__fadeIn"
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default Success;
