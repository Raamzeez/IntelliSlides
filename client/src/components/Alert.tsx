import React, { FC } from "react";

interface iProps {
  onCloseHandler: () => void;
}

const Alert: FC<iProps> = ({ onCloseHandler }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        height: "7vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(231deg, rgba(255,100,138,1) 0%, rgba(255,110,141,1) 100%)",
      }}
      className="shadow"
    >
      <p style={{ fontSize: 16, marginTop: 10, width: "80%" }}>
        This is a Public Beta Release - Please be aware that there may be bugs
        and issues! We are actively working on improvements.
      </p>
      <i
        className="fa-solid fa-x pointer"
        style={{
          color: "white",
          fontSize: 20,
          position: "absolute",
          top: 15,
          right: 30,
        }}
        onClick={onCloseHandler}
      />
    </div>
  );
};

export default Alert;
